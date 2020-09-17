<template>
  <div class="register">
    <form class="register__form" id="register-form" @submit.prevent="submitRegister">
      <div v-for="field in fieldList" :key="field.name">
        <template v-if="field.isShow">
          <div class="register__form__field" :class="[field.class]">
            <span class="register__form__field__star" v-if="field.isRequired">*</span>
            <input
              v-if="field.name != 'Add_BankId1'"
              class="register__form__field__input"
              :id="idMapper.register.input[field.name]"
              :type="field.type"
              :placeholder="$t(`register.${field.name}.placeholder`)"
              :required="field.isRequired"
              :minlength="field.minlength"
              :maxlength="field.maxlength"
              :min="field.min"
              :max="field.max"
              :pattern="field.regex"
              :disabled="!field.isModifiable"
              v-model="field.value"
              @input="inputField(field)"
              @change="changeField(field)"
            />

            <img
              v-if="field.name == 'CaptchaValue' && captchaImage.ImgBase64 != ''"
              class="register__form__field__image--code"
              :id="idMapper.register.image.captcha"
              :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
              alt="MvcCaptcha"
              title="Refrash Captcha"
              :width="captchaImage.Width"
              :height="captchaImage.Height"
              border="0"
              @click="changeCaptcha"
            />

            <select
              v-if="field.name == 'Add_BankId1'"
              class="register__form__field__select"
              :class="{ 'register__form__field__select--default': field.value == '' }"
              :id="idMapper.register.input[field.name]"
              v-model="field.value"
            >
              <!-- <option value="" selected>{{ $t(`register.${field.name}.placeholder`) }}</option> -->
              <option :value="bank.Value" v-for="bank in bankList" :key="bank.Value">{{ bank.Text }}</option>
            </select>
          </div>
          <div class="register__form__field__hint">{{ $t(`register.${field.name}.hint`) }}</div>
          <div class="theme-errorMsg" v-if="field.error">
            <span class="theme-txt-errorMsg">{{ field.error }}</span>
          </div>
        </template>
      </div>
      <div class="theme-errorMsg" v-if="error">
        <span class="theme-txt-errorMsg">{{ error }}</span>
      </div>
    </form>

    <div class="register__button-div">
      <button
        type="submit"
        class="register__button-div__send ui-btn"
        :id="idMapper.register.button.submit"
        form="register-form"
        :disabled="!validateForm()"
      >
        {{ $t('ui.button.submit') }}
      </button>
      <button
        type="reset"
        class="register__button-div__reset ui-btn"
        :id="idMapper.register.button.reset"
        @click.prevent="resetForm"
      >
        {{ $t('ui.button.reset') }}
      </button>
    </div>
    <div class="register__notice">
      <ol class="register__notice__ol">
        <li
          class="register__notice__ol__li"
          v-for="(notice, index) in noticeList"
          :key="index"
          v-html="$t(notice)"
        ></li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCaptcha } from '@/api/captcha';
import { getRegisterFieldList, checkRegisterFieldExist } from '@/api/register';
import { registerFieldList, validateField } from '@/utils/register';
import idMapper from '@/idMapper';

export default {
  name: 'Register',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang', 'token', 'publicKey']),
    fullName() {
      let fullName = '';
      const firstName = this.fieldList.find(item => item.name == 'Add_FirstName').value;
      const lastName = this.fieldList.find(item => item.name == 'Add_LastName').value;

      if (this.lang == 'zh-cn') {
        fullName = `${lastName}${firstName}`;
      } else {
        fullName = `${firstName} ${lastName}`;
      }
      return fullName;
    },
  },
  data() {
    return {
      idMapper: idMapper,
      fieldList: [
        ...registerFieldList,
        {
          name: 'CaptchaValue',
          class: 'register__form__field--code',
          type: 'tel',
          error: '',
          isRequired: false,
          minlength: 4,
          maxlength: 4,
          regex: '^[0-9]*$',
          value: '',
          isShow: true,
        },
      ],
      noticeList: ['register.notice.required', 'register.notice.recommend', 'register.notice.contact'],
      bankList: [],
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
      error: '',
    };
  },
  methods: {
    async changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberRegister' };
      const result = await getCaptcha(requestDataCaptcha);
      console.log('[Captcha]', result.RetObj);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        const captcha = this.fieldList.find(item => item.name == 'CaptchaValue');
        captcha.value = '';
      }
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
    },
    async submitRegister() {
      if (!this.validateForm()) {
        return;
      }
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      console.log('[Register]', requestData);

      const result = await this.$store.dispatch('user/register', requestData);

      if (result.Code == 500) {
        this.error = result.ErrMsg;
      } else if (result.Code == 502 || result.Code == 615) {
        //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
        //* 615: JsonError，推測是公鑰與私鑰沒對上，已於攔截器上換新的公鑰
        //* 重新送出請求
        this.submitRegister();
      }
    },
    validateForm() {
      console.log('[ValidateForm]');
      let invalidFieldList = [];
      for (const field of this.fieldList) {
        //* 檢查欄位自己的屬性(required, minlength, maxlength, min, max)
        const validateReulst = this.validateField(field);
        if (validateReulst != '') {
          invalidFieldList.push(field);
        }
      }

      return invalidFieldList.length == 0;
    },
    validateField(field) {
      return this.$t(validateField(field, this.fieldList));
    },
    inputField(field) {
      field.error = this.validateField(field);
    },
    async changeField(field) {
      //* 即時驗證欄位資料是否通過

      if (this.validateField(field, this.fieldList) != '') {
        return;
      }
      if (field.name == 'Add_RelatedAccount') {
        const requestData = { field: 'Add_RelatedAccount', strValue: field.value };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          alert(this.$t('register.Add_RelatedAccount.error.invalid'));
        }
      } else if (field.name == 'Add_FirstName' || field.name == 'Add_LastName') {
        const requestData = { field: 'Add_Realname', strValue: this.fullName };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          alert(this.$t('register.Add_RealName.error.invalid'));
        }
      } else if (field.isOnly == true) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          alert(this.$t(`register.${field.name}.error.invalid`));
        }
      }
    },
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/register.scss`);

        //* 取得公鑰 & token
        if (!this.token || !this.publicKey) {
          await this.$store.dispatch('user/getTokenAndPublicKey');
        }

        getRegisterFieldList().then(result => {
          console.log('[Register]', result.RetObj);

          this.bankList = result.RetObj.Add_BankList;

          for (const registerField of result.RetObj.Register) {
            const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

            if (field) {
              field.isShow = registerField.Lst_Phase == 1;
              field.isRequired = registerField.Lst_isRequired;
              field.isOnly = registerField.Lst_isOnly;
              //* 只有 Add_RealName 是不可修改
              if (field.name == 'Add_RealName') {
                field.isModifiable = false;
              } else {
                field.isModifiable = true;
              }

              console.log(field.name, field.isOnly);
            }
          }
        });

        this.changeCaptcha();
      },
    },
    fullName() {
      const realName = this.fieldList.find(item => item.name == 'Add_RealName');
      realName.value = this.fullName;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding-bottom: 160px;
  padding-top: 60px;

  &__form {
    width: 563px;
    margin: 0 auto;

    &__field {
      position: relative;
      background-repeat: no-repeat;
      margin-top: 30px;
      &__star {
        font-size: 2.5em;
        position: absolute;
        top: 20px;
        left: -25px;
        color: #cfa972;
      }
      &__input {
        width: 465px;
        height: 64px;
        background-color: transparent;
        margin: 8px 0 9px 80px;
        border: none;
        outline: none;
        font-size: 2.5em;
      }
      &__select {
        width: 465px;
        height: 64px;
        font-size: 2.5em;
        font-weight: normal;
        background: transparent;
        margin: 8px 0 9px 80px;
        border: none;
        outline: none;
      }
      &__select option {
        color: black;
        background-color: #979797;
      }
      &__image--code {
        position: absolute;
        top: 11px;
        right: 15px;
      }
      // &__input:invalid {
      //   color: red;
      // }
      // &__input:valid {
      //   color: green;
      // }
      &__input:disabled {
        color: gray;
        pointer-events: none;
      }
      &__input:disabled::placeholder {
        color: gray;
      }
      &__input::-webkit-calendar-picker-indicator {
        filter: invert(1); /* 反轉圖像顏色 */
      }
      &__input::before {
        color: #959595;
        content: attr(placeholder);
      }
      &__hint {
        display: block;
        margin: 5px 0;
        font-size: 2em;
      }
    }
  }
  &__button-div {
    text-align: center;
    margin-top: 50px;

    button {
      margin: 0 10px;
    }
  }
  &__notice {
    margin: 0 20px;
    &__ol {
      margin: 50px 10px 0;
      font-size: 2.153em;
    }
  }
}
</style>

<style scoped>
/*.register {
  padding-bottom: 160px;
  padding-top: 60px;
}

.register__form {
  width: 563px;
  margin: 0 auto;
}

.register__form__field__input-div {
  position: relative;
  background-repeat: no-repeat;
  margin-top: 30px;
}

.register__form__field__hint {
  display: block;
  margin: 5px 0;
  font-size: 2em;
}
.register__form__field__star {
  font-size: 2.5em;
  position: absolute;
  top: 20px;
  left: -25px;
  color: #cfa972;
}
.register__form__field__input {
  width: 465px;
  height: 64px;
  background-color: transparent;
  margin: 8px 0 9px 80px;
  border: none;
  outline: none;
  font-size: 2.5em;
}

.register__form__field__select {
  width: 465px;
  height: 64px;
  font-size: 2.5em;
  font-weight: normal;
  background: transparent;
  margin: 8px 0 9px 80px;
  border: none;
  outline: none;
}

.register__form__field__select option {
  color: black;
  background-color: #979797;
}

.register__form__field__image--code {
  position: absolute;
  top: 11px;
  right: 15px;
} 

.register__form__field__input:invalid {
  color: red;
}

.register__form__field__input:valid {
  color: green;
} 

 .register__form__field__input:disabled {
  color: gray;
  pointer-events: none;
}

.register__form__field__input:disabled::placeholder {
  color: gray;
}

.register__notice__ol {
  margin: 50px 10px 0;
  font-size: 2.153em;
}

.register__button-div {
  text-align: center;
  margin-top: 50px;
}

.register__button-div button {
  margin: 0 10px;
}

.register__notice {
  margin: 0 20px;
}

.register__form__field__input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.register__form__field__input::before {
  color: #959595;
  content: attr(placeholder);
}*/
</style>
