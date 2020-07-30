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
            />
          </div>
          <div class="register__form__field__hint">
            {{ $t(field.hint) }}
          </div>
          <div class="theme-errorMsg" v-if="field.error">
            <span class="theme-txt-errorMsg">{{ field.error }}</span>
          </div>
        </template>
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
export default {
  name: 'Register',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      fieldList: [
        {
          name: 'recommend',
          class: 'register__form__field--recommend',
          type: 'text',
          placeholder: 'register.placeholder.recommend',
          hint: 'register.hint.recommend',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 20,
          value: '',
          isShow: true,
        },
        {
          name: 'account',
          class: 'register__form__field--account',
          type: 'text',
          placeholder: 'register.placeholder.account',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 3,
          maxlength: 20,
          regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$', //* 英文字母開頭、英數字、長度: 3~15
          value: '',
          isShow: true,
        },
        {
          name: 'password',
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
          name: 'passwordCheck',
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
          name: 'mobile',
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
          name: 'email',
          class: 'register__form__field--name',
          type: 'text',
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
          name: 'line',
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
          name: 'firstName',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.firstName',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 20,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: true,
        },
        {
          name: 'lastName',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.lastName',
          hint: 'register.hint.name',
          error: '',
          isRequired: true,
          minlength: 1,
          maxlength: 20,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: true,
        },
        {
          name: 'nickname',
          class: 'register__form__field--name',
          type: 'text',
          placeholder: 'register.placeholder.nickname',
          hint: '',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 20,
          value: '',
          isShow: true,
        },
        {
          name: 'captcha',
          class: 'register__form__field--code',
          type: 'text',
          placeholder: 'register.placeholder.captcha',
          hint: '',
          error: '',
          isRequired: true,
          minlength: 4,
          maxlength: 4,
          value: '',
          isShow: true,
        },
      ],
      noticeList: ['register.notice.required', 'register.notice.recommend', 'register.notice.contact'],
    };
  },
  methods: {
    register() {
      const requestData = {};

      for (const field of this.fieldList) {
        requestData[field.name] = field.value;
      }

      console.log('[register]', requestData);
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
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
  margin: 8px 0 9px;
  padding-left: 80px;
  /* padding: 0 3px; */
  border: none;
  outline: none;
  font-size: 2.5em;
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
