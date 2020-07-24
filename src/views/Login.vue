<template>
  <div class="login">
    <h1 class="ui-h1-pageTitle login__title">Member Login</h1>
    <form class="login__form" id="LoginForm" @submit.prevent="login">
      <div class="login__form__field login__form__field--account">
        <input
          class="login__form__field__input"
          id="UserName"
          type="text"
          tabindex="1"
          placeholder="Account"
          v-model="user.username"
        />
      </div>
      <div class="login__form__field login__form__field--password">
        <input
          class="login__form__field__input"
          id="Password"
          type="password"
          tabindex="2"
          placeholder="Password"
          v-model="user.password"
        />
      </div>
      <div class="login__form__field login__form__field--code">
        <input
          class="login__form__field__input login__form__field__input--code"
          id="CaptchaValue"
          type="tel"
          tabindex="3"
          placeholder="Captcha"
          maxlength="4"
          autocomplete="off"
          v-model="user.captcha"
        />
        <img
          class="login__form__field__image--code"
          :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
          alt="MvcCaptcha"
          title="Refrash Captcha"
          :width="captchaImage.Width"
          :height="captchaImage.Height"
          border="0"
        />
      </div>
      <div class="login__form__field login__form__field--remember-me">
        <input class="login__form__field__checkbox" id="RememberMe" tabindex="4" type="checkbox" />
        <label class="login__form__field__label" id="lbRememberMe" for="RememberMe">Remember Me</label>
      </div>
      <router-link class="login__form__link login__form__link--regist" id="register" :to="{ name: 'Register' }">
        Register
      </router-link>
      <router-link class="login__form__link login__form__link--forget" id="forgetPwd" :to="{ name: 'ForgetPassword' }">
        GetPassword
      </router-link>
      <button class="ui-btn01 ui-btn-long login__form__submit" id="loginbtn" type="submit" form="LoginForm">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCaptcha } from '@/api/captcha';
export default {
  name: 'Login',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        captcha: '',
      },
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
    };
  },
  methods: {
    async login() {
      const token = await this.$store.dispatch('user/login', this.user);
      console.log(`[token]`, token);
    },
  },
  mounted() {
    const requestDataCaptcha = { pageCode: 'MemberLogin' };
    getCaptcha(requestDataCaptcha).then(result => {
      console.log('[Captcha]', result.RetObj);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
      }
    });
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/login.scss`);
      },
    },
  },
};
</script>

<style scoped>
.login {
  padding-bottom: 119px;
}

.login__form {
  width: 563px;
  margin: 0 auto;
  text-align: center;
}

.login__form__field {
  height: 81px;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  padding-left: 80px;
}
.login__form__field--code {
  position: relative;
}

.login__form__field__image--code {
  position: absolute;
  top: 11px;
  right: 15px;
}

.login__form__field__input {
  width: 465px;
  height: 64px;
  background-color: transparent;
  margin: 8px 0 9px;
  padding: 0 3px;
  border: none;
  outline: none;
  font-size: 2.5em;
}
.login__form__field__input--code {
  width: 315px;
  padding-right: 153px;
}

.login__form__field--remember-me {
  height: 70px;
  padding: 0;
  outline: none;
}
.login__form__field__checkbox {
  width: 35px;
  height: 27px;
}

.login__form__field__label {
  font-size: 2.5em;
}

.login__form__link {
  /* width: 150px; */
  display: inline-block;
  background-repeat: no-repeat;
  background-position: top center;
  padding: 134px 15px 0;
  margin-top: 35px;
  font-size: 2.46em;
}

.login__form__link--regist {
  width: 175px;
}

.login__form__link--forget {
  width: 200px;
}

.login__form__submit {
  display: block;
  margin: 20px auto;
}
</style>
