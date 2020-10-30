<template>
  <div class="register">
    <ValidationObserver v-slot="{ invalid, handleSubmit, reset }" tag="div">
      <form class="register__form" @submit.prevent="handleSubmit(submitRegister(invalid))" @reset.prevent="reset()">
        <ValidationProvider
          v-slot="{ errors, invalid }"
          tag="div"
          class="register__form__field"
          :class="[field.class]"
          :name="field.name"
          :rules="field.rules"
          v-for="field in fieldList"
          :key="field.name"
          v-show="field.isShow"
        >
          <input
            class="register__form__field__input"
            :type="field.type"
            :placeholder="$t(`register.${field.name}.placeholder`)"
            :disabled="!field.isModifiable"
            :min="field.min"
            :max="field.max"
            v-model="field.value"
            @change="changeField(field, invalid)"
            v-if="field.type != 'select'"
          />

          <select
            class="register__form__field__select"
            :class="{ 'register__form__field__select--default': field.value == '' }"
            :id="idMapper.register.input[field.name]"
            v-model="field.value"
            :required="field.rules['register-required']"
            v-else
          >
            <option :value="bank.Value" v-for="bank in bankList" :key="bank.Value">{{ bank.Text }}</option>
          </select>

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

          <div class="register__form__field__hint" v-if="$te(`register.${field.name}.hint`)">
            <template v-if="field.name == 'Add_RelatedAccount' && !field.isModifiable">
              {{ $t(`register.${field.name}.hintHasValue`, { proxyCode: field.value }) }}
              <br />
            </template>

            {{ $t(`register.${field.name}.hint`) }}
          </div>

          <div class="theme-errorMsg" v-if="errors.length > 0 && errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <div class="register__button-div">
          <button class="register__button-div__send ui-btn" type="submit" :disabled="invalid">
            {{ $t('ui.button.submit') }}
          </button>
          <button class="register__button-div__reset ui-btn" type="reset" @click="resetForm">
            {{ $t('ui.button.reset') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
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
import { registerFieldList } from '@/utils/register';
import idMapper from '@/idMapper';

import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '@/utils/vee-validate.js';
export default {
  name: 'Register',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
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
      fieldList: [...registerFieldList],
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
    async submitRegister(invalid) {
      if (invalid) {
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
    async changeField(field, invalid) {
      //* 即時驗證欄位資料是否通過
      if (invalid) {
        return;
      }
      if (field.name == 'Add_RelatedAccount' && field.value) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          alert(this.$t('register.Add_RelatedAccount.error.invalid'));
        }
      } else if (field.name == 'Add_FirstName' || field.name == 'Add_LastName') {
        const firstNameField = this.fieldList.find(item => item.name == 'Add_FirstName');
        const lastNameField = this.fieldList.find(item => item.name == 'Add_LastName');
        //* 姓跟名都有填的時候才檢查
        if (!(firstNameField.value && lastNameField.value)) {
          return;
        }
        const requestData = { field: 'Add_RealName', strValue: this.fullName };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          alert(this.$t('register.Add_RealName.error.invalid'));
        }
      } else if (field.isOnly == true && field.value) {
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
              field.value = registerField.Lst_Value;
              field.isShow = registerField.Lst_Phase == 1;
              field.isOnly = registerField.Lst_isOnly;

              field.rules['register-required'] = registerField.Lst_isRequired;
              //* Add_RealName 是不可修改
              //* 推薦人若已有值，就也不能修改
              if (field.name == 'Add_RealName') {
                field.isModifiable = false;
              } else if (field.name == 'Add_RelatedAccount' && field.value) {
                field.isModifiable = false;
              } else {
                field.isModifiable = true;
              }
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
    // width: 563px;
    // margin: 0 auto;

    &__field {
      width: 563px;
      margin: 0 auto;
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
