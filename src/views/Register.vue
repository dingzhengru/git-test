<template>
  <div class="register">
    <form class="register__form" id="register-form" @submit.prevent="register">
      <div class="register__form__field" v-for="field in fieldList" :key="field.name">
        <template v-if="field.isShow">
          <div class="register__form__field__input-div" :class="[field.class]">
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
              v-model="field.value"
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
              <option :value="bank.Value" v-for="bank in bankList" :key="bank.value">{{ bank.Text }}</option>
            </select>
          </div>
          <div class="register__form__field__hint">{{ $t(`register.${field.name}.hint`) }}</div>
          <div class="theme-errorMsg" v-if="field.error && isShowFieldError">
            <span class="theme-txt-errorMsg">{{ field.error }}</span>
          </div>
        </template>
      </div>
      <div class="theme-errorMsg" v-if="error">
        <span class="theme-txt-errorMsg">{{ error }}</span>
      </div>
    </form>

    <div class="register__form__button-div">
      <button
        type="submit"
        class="register__form__send ui-btn"
        :id="idMapper.register.button.submit"
        form="register-form"
      >
        {{ $t('ui.button.submit') }}
      </button>
      <button
        type="reset"
        class="register__form__reset ui-btn"
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
import { getRegisterFieldList } from '@/api/register';
import { getTokenAndPublicKey } from '@/api/user';
import dayjs from 'dayjs';
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
        {
          name: 'Add_RelatedAccount',
          class: 'register__form__field--recommend',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 30,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Account',
          class: 'register__form__field--account',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 3,
          maxlength: 15,
          regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$', //* 英文字母開頭、英數字、長度: 3~15
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Password',
          class: 'register__form__field--password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: false,
        },
        {
          name: 'Add_PasswordCheck',
          class: 'register__form__field--password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Mobile',
          class: 'register__form__field--callphone',
          type: 'tel',
          error: '',
          isRequired: false,
          minlength: 5,
          maxlength: 20,
          regex: '^[0-9]*$', //* 英數字、長度: 5~20
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Email',
          class: 'register__form__field--name',
          type: 'email',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 50,
          regex: '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', //* email regex，需有 @ 與後面要有 .
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Line',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 50,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Skype',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 12,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_QQ',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 20,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_FirstName',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_LastName',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_RealName',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_NickName',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 30,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Birthday',
          class: 'register__form__field--name',
          type: 'date',
          error: '',
          isRequired: false,
          min: '1900-01-01',
          max: dayjs()
            .subtract(18, 'year')
            .format('YYYY-MM-DD'),
          regex: '^[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_BankId1',
          class: 'register__form__field--name',
          type: 'select',
          error: '',
          isRequired: false,
          value: '',
          isShow: false,
        },
        {
          name: 'Add_BankBranchName1',
          class: 'register__form__field--name',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_BankAccount1',
          class: 'register__form__field--account',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          regex: '^[0-9]+[0-9]*$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Withdrawals_Password',
          class: 'register__form__field--password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: false,
        },
        {
          name: 'Add_Withdrawals_CheckPassword',
          class: 'register__form__field--password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: false,
        },
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
      bankList: [
        {
          name: 'KBANK',
          value: '210',
        },
        {
          name: 'SCB',
          value: '211',
        },
        {
          name: 'KTB',
          value: '212',
        },
        {
          name: 'TMB',
          value: '213',
        },
        {
          name: 'BangkokBank',
          value: '214',
        },
        {
          name: 'BAAC ธ.ก.ส.',
          value: '275',
        },
      ],
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
      error: '',
    };
  },
  mounted() {
    this.changeCaptcha();

    getRegisterFieldList().then(result => {
      //* 關掉 loading
      this.$store.commit('setIsLoading', false);

      this.bankList = result.RetObj.Add_BankList;

      console.log('[Register]', result.RetObj);
      for (const registerField of result.RetObj.Register) {
        const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          field.isShow = registerField.Lst_Phase == 1;
          field.isRequired = registerField.Lst_isRequired;
        }
      }
    });

    //* 取得公鑰 & token (登入後才於這取得，登入前放置 Login、Register 頁面)
    if (!this.token || !this.publicKey) {
      getTokenAndPublicKey().then(result => {
        this.$store.commit('user/setToken', result.RetObj.token);
        this.$store.commit('user/setPublicKey', result.RetObj.publickey);
      });
    }
  },
  methods: {
    changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberRegister' };
      getCaptcha(requestDataCaptcha).then(result => {
        console.log('[Captcha]', result.RetObj);
        if (result.Code == 200) {
          this.captchaImage = result.RetObj;
          const captcha = this.fieldList.find(item => item.name == 'CaptchaValue');
          captcha.value = '';
        }
      });
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
    },
    async register() {
      const requestData = {};

      if (!this.validateForm()) {
        return;
      }

      for (const field of this.fieldList) {
        if (field.value) {
          requestData[field.name] = field.value;
        }
      }
      //* Add_RealName 此欄位有兩種情況
      //* 1. FirstName 與 LastName 組成
      //* 2. 直接讓使用者填寫 Add_RealName 這個欄位
      if (!Object.hasOwnProperty.call(requestData, 'Add_RealName')) {
        requestData['Add_RealName'] = this.fullName;
      }

      console.log('[Register]', requestData);
      this.$store.commit('setIsLoading', true);
      this.error = await this.$store.dispatch('user/register', requestData);
      this.$store.commit('setIsLoading', false);
    },
    validateForm() {
      console.log('[ValidateForm]');
      let passwordField, passwordCheckField;
      let withdrawalsPasswordField, withdrawalsPasswordCheckField;

      let invalidFieldList = [];
      for (const field of this.fieldList) {
        //* 檢查欄位自己的屬性(required, minlength, maxlength, min, max)
        const validateReulst = this.validateField(field);
        if (validateReulst != null) {
          invalidFieldList.push(validateReulst);
        }

        //* 檢查密碼與確認密碼是否相同，passwordCheck 一定會在 password 後面
        if (field.name == 'Add_Password') {
          passwordField = field;
        } else if (field.name == 'Add_PasswordCheck') {
          passwordCheckField = field;

          if (passwordField.value != passwordCheckField.value) {
            passwordCheckField.error = '密碼確認錯誤';
            invalidFieldList.push(passwordCheckField);
          }
        } else if (field.name == 'Add_Withdrawals_Password') {
          withdrawalsPasswordField = field;
        } else if (field.name == 'Add_Withdrawals_CheckPassword') {
          withdrawalsPasswordCheckField = field;

          if (withdrawalsPasswordField.value != withdrawalsPasswordCheckField.value) {
            withdrawalsPasswordCheckField.error = '密碼確認錯誤';
            invalidFieldList.push(withdrawalsPasswordCheckField);
          }
        }
      }

      return invalidFieldList.length == 0;
    },
    validateField(field) {
      if (!field.isRequired && !field.value) {
        //* 非必填 && 空值
        return null;
      } else if (field.isRequired && !field.value) {
        //* 必填 && 空值
        // field.error = '此欄位為必填';
        field.error = this.$t(`register.${field.name}.error.required`);
      } else if (!!field.minlength && field.value.length < field.minlength) {
        //* 是否有最小長度 && 低於最小長度
        // field.error = `此欄位最少需要輸入字數: ${field.minlength}`;
        field.error = this.$t(`register.${field.name}.error.length`);
      } else if (!!field.maxlength && field.value.length > field.maxlength) {
        //* 是否有最大長度 && 高於最大長度
        // field.error = `此欄位最多只能輸入字數: ${field.maxlength}`;
        field.error = this.$t(`register.${field.name}.error.length`);
      } else if (field.regex && !RegExp(field.regex).test(field.value)) {
        //* 是否有正規表示式 && 不符合正規表示式
        // field.error = `格式錯誤`;
        field.error = this.$t(`register.${field.name}.error.regex`);
      } else if (field.name == 'Add_Birthday' && dayjs(field.value).isAfter(field.max)) {
        //* 是否為生日欄位 && 是否超過指定最大日期(18歲限制)
        // field.error = `年齡必須超過 18 歲`;
        field.error = this.$t(`register.${field.name}.error.invalid`);
      } else {
        field.error = '';
      }

      if (field.error) {
        return field;
      }
      return null;
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/register.scss`);
      },
    },
  },
};
</script>

<style scoped>
.register {
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
  /* background-color: #2e2e2e; */
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

.register__notice__ol {
  margin: 50px 10px 0;
  font-size: 2.153em;
}

.register__form__button-div {
  text-align: center;
  margin-top: 50px;
}

.register__form__button-div button {
  margin: 0 10px;
}

.register__notice {
  margin: 0 20px;
}

.register__form__field__input::-webkit-calendar-picker-indicator {
  filter: invert(1); /* 反轉圖像顏色 */
}

.register__form__field__input::before {
  color: #959595;
  content: attr(placeholder);
}
</style>
