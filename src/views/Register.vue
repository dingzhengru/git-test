<template>
  <div class="register">
    <form class="register__form" id="register-form" @submit.prevent="register">
      <div class="register__form__field" v-for="field in fieldList" :key="field.name">
        <template v-if="field.isShow">
          <div class="register__form__field__input-div" :class="[field.class]">
            <span class="register__form__field__star" v-if="field.isRequired">*</span>
            <input
              class="register__form__field__input"
              :type="field.type"
              :placeholder="$t(field.placeholder)"
              :required="field.isRequired"
              :minlength="field.minlength"
              :maxlength="field.maxlength"
              :pattern="field.regex"
              v-model="field.value"
              v-if="field.type != 'select'"
            />

            <img
              class="register__form__field__image--code"
              :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
              alt="MvcCaptcha"
              title="Refrash Captcha"
              :width="captchaImage.Width"
              :height="captchaImage.Height"
              border="0"
              v-if="field.name == 'CaptchaValue'"
              @click="changeCaptcha"
            />

            <select
              class="register__form__field__select"
              :class="{
                'register__form__field__select--default': field.value == '',
              }"
              v-if="field.type == 'select'"
              v-model="field.value"
            >
              <option value="" selected>{{ $t(field.placeholder) }}</option>
              <option :value="bank.value" v-for="bank in bankList" :key="bank.value">{{ bank.name }}</option>
            </select>
          </div>
          <div class="register__form__field__hint">{{ $t(field.hint) }}</div>
          <div class="theme-errorMsg" v-if="field.error">
            <span class="theme-txt-errorMsg">{{ field.error }}</span>
          </div>
        </template>
      </div>
      <div class="theme-errorMsg" v-if="error">
        <span class="theme-txt-errorMsg">{{ error }}</span>
      </div>
    </form>

    <div class="register__form__button-div">
      <button type="submit" class="register__form__send ui-btn" form="register-form">
        {{ $t('ui.button.submit') }}
      </button>
      <button type="reset" class="register__form__reset ui-btn" @click.prevent="resetForm">
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
export default {
  name: 'Register',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang']),
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
      fieldList: [
        {
          name: 'Add_RelatedAccount',
          class: 'register__form__field--recommend',
          type: 'text',
          placeholder: 'register.placeholder.recommend',
          hint: 'register.hint.recommend',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Account',
          class: 'register__form__field--account',
          type: 'text',
          placeholder: 'register.placeholder.account',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 3,
          maxlength: 15,
          regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$', //* 英文字母開頭、英數字、長度: 3~15
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Password',
          class: 'register__form__field--password',
          type: 'password',
          placeholder: 'register.placeholder.password',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 6,
          maxlength: 20,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: true,
        },
        {
          name: 'Add_PasswordCheck',
          class: 'register__form__field--password',
          type: 'password',
          placeholder: 'register.placeholder.passwordCheck',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 6,
          maxlength: 20,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Mobile',
          class: 'register__form__field--callphone',
          type: 'tel',
          placeholder: 'register.placeholder.mobile',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 5,
          maxlength: 20,
          regex: '^[0-9]*$', //* 英數字、長度: 5~20
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Email',
          class: 'register__form__field--name',
          type: 'email',
          placeholder: 'register.placeholder.email',
          hint: 'register.hint.email',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 50,
          regex: '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', //* email regex，需有 @ 與後面要有 .
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Line',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.line',
          hint: 'register.hint.line',
          error: '',
          isRequired: false,
          minlength: 0,
          maxlength: 50,
          value: '',
          isShow: true,
        },
        {
          name: 'Add_FirstName',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.firstName',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 30,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: true,
        },
        {
          name: 'Add_LastName',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.lastName',
          hint: 'register.hint.name',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 30,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: true,
        },
        {
          name: 'Add_NickName',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.nickname',
          hint: '',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          value: '',
          isShow: true,
        },
        {
          name: 'Add_BankId1',
          class: 'register__form__field--name',
          type: 'select',
          placeholder: 'register.placeholder.bank',
          hint: '',
          error: '',
          isRequired: true,
          value: '',
          isShow: true,
        },
        {
          name: 'Add_BankBranchName1',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.bankBranch',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
          value: '',
          isShow: true,
        },
        {
          name: 'Add_BankAccount1',
          class: 'register__form__field--account',
          type: 'text',
          placeholder: 'register.placeholder.bankAccount',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 30,
          regex: '^[0-9]+[0-9]*$',
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Withdrawals_Password',
          class: 'register__form__field--password',
          type: 'password',
          placeholder: 'register.placeholder.passwordWithdrawal',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 6,
          maxlength: 20,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: true,
        },
        {
          name: 'Add_Withdrawals_CheckPassword',
          class: 'register__form__field--password',
          type: 'password',
          placeholder: 'register.placeholder.passwordCheckWithdrawal',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 6,
          maxlength: 20,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: true,
        },
        {
          name: 'CaptchaValue',
          class: 'register__form__field--code',
          type: 'tel',
          placeholder: 'register.placeholder.captcha',
          hint: '',
          error: '',
          isRequired: true,
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
  },
  methods: {
    async register() {
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value) {
          requestData[field.name] = field.value;
        }
      }
      requestData['Add_RealName'] = this.fullName;

      this.error = await this.$store.dispatch('user/register', requestData);
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
    },
    changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberRegister' };
      getCaptcha(requestDataCaptcha).then(result => {
        console.log('[Captcha]', result.RetObj);
        if (result.Code == 200) {
          this.captchaImage = result.RetObj;
        }
      });
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
</style>
