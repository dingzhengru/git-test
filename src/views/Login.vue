<template>
  <div class="login">
    <div class="theme-errorMsg" v-if="error">
      <span class="theme-txt-errorMsg">{{ error }}</span>
    </div>
    <h1 class="login__title">{{ $t('login.title') }}</h1>
    <form class="login__form" id="LoginForm" @submit.prevent="submitLogin">
      <div class="login__form__field login__form__field--account">
        <input
          class="login__form__field__input"
          :id="idMapper.login.input.username"
          type="text"
          :placeholder="$t('login.placeholder.username')"
          required
          minlength="3"
          maxlength="15"
          pattern="^[a-zA-Z]{1}[a-zA-Z0-9]*$"
          v-model="user.UserName"
        />
      </div>
      <div class="login__form__field login__form__field--password">
        <input
          class="login__form__field__input"
          :id="idMapper.login.input.password"
          type="password"
          :placeholder="$t('login.placeholder.password')"
          required
          minlength="6"
          maxlength="30"
          pattern="^[a-zA-Z0-9]*$"
          v-model="user.Password"
        />
      </div>
      <div class="login__form__field login__form__field--code">
        <input
          class="login__form__field__input login__form__field__input--code"
          :id="idMapper.login.input.captcha"
          type="tel"
          :placeholder="$t('login.placeholder.captcha')"
          required
          minlength="4"
          maxlength="4"
          pattern="^[0-9]*$"
          autocomplete="off"
          v-model="user.CaptchaValue"
        />
        <img
          class="login__form__field__image--code"
          :id="idMapper.login.image.captcha"
          :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
          :width="captchaImage.Width"
          :height="captchaImage.Height"
          v-if="captchaImage.ImgBase64 != ''"
          @click="changeCaptcha"
        />
      </div>
      <div class="login__form__field login__form__field--remember-me">
        <input class="login__form__field__checkbox" id="RememberMe" type="checkbox" v-model="user.RememberMe" />
        <label class="login__form__field__label" id="lbRememberMe" for="RememberMe">{{ $t('login.rememberMe') }}</label>
      </div>
      <div class="login__form__link-div">
        <router-link
          class="login__form__link login__form__link--regist"
          :id="idMapper.login.link.register"
          :to="{ name: 'Register' }"
        >
          {{ $t('login.link.register') }}
        </router-link>
        <router-link
          class="login__form__link login__form__link--forget"
          :id="idMapper.login.link.forgetPassword"
          :to="{ name: 'ForgetPassword' }"
        >
          {{ $t('login.link.forgetPassword') }}
        </router-link>

        <a class="login__form__link" href="javascript:;" v-if="pwaInstallStatus == null"></a>

        <a
          class="login__form__link login__form__link--download"
          id="pwaDownload"
          href="javascript:;"
          v-if="pwaInstallStatus == 'notInstalled'"
          @click="pwaPrompt.prompt()"
        >
          App
        </a>
        <a
          class="login__form__link login__form__link--download"
          id="pwaDownload"
          href="javascript:;"
          v-if="pwaInstallStatus == 'installing'"
        >
          Installing
        </a>
        <a
          class="login__form__link login__form__link--open"
          id="pwaOpen"
          href="/"
          target="_blank"
          v-if="pwaInstallStatus == 'installed'"
        >
          Open
        </a>
      </div>

      <button
        class="ui-btn ui-btn-long login__form__submit"
        :id="idMapper.login.button.submit"
        type="submit"
        form="LoginForm"
        :disabled="!validateForm()"
      >
        {{ $t('login.button.login') }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getCaptcha } from '@/api/captcha';
import { getTokenAndPublicKey } from '@/api/user';
import idMapper from '@/idMapper';

export default {
  name: 'Login',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'token', 'publicKey', 'pwaInstallStatus', 'pwaPrompt']),
  },
  data() {
    return {
      idMapper: idMapper,
      error: '',
      user: {
        UserName: 'ding',
        Password: 'asdf1234',
        CaptchaValue: '',
        RememberMe: false,
      },
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
    };
  },
  methods: {
    async submitLogin() {
      if (!this.validateForm()) {
        return;
      }
      console.log('[login]', this.user);
      this.$store.commit('setIsLoading', true);
      const result = await this.$store.dispatch('user/login', this.user);

      if (result.Code == 201) {
        //* 帳密錯誤
        this.error = result.ErrMsg;
      } else if (result.Code == 203 || result.Code == 599) {
        //* 驗證碼錯誤
        this.error = result.ErrMsg;
        this.changeCaptcha();
      } else if (result.Code == 502 || result.Code == 615) {
        //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
        //* 615: JsonError，推測是公鑰與私鑰沒對上，已於攔截器上換新的公鑰
        //* 重新送出登入請求
        this.submitLogin();
      }
      this.$store.commit('setIsLoading', false);
    },
    async changeCaptcha() {
      this.$store.commit('setIsLoading', true);
      const requestDataCaptcha = { pageCode: 'MemberLogin' };
      const result = await getCaptcha(requestDataCaptcha);
      console.log('[Captcha]', result.RetObj);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        this.user.CaptchaValue = '';
      }
      this.$store.commit('setIsLoading', false);
    },
    validateForm() {
      console.log('[ValidateForm]', this.user);
      if (this.user.UserName == '' || this.user.UserName.length < 3 || this.user.UserName.length > 15) {
        return false;
      } else if (this.user.Password == '' || this.user.Password.length < 6) {
        return false;
      } else if (this.user.CaptchaValue == '' || this.user.CaptchaValue.length != 4) {
        return false;
      } else {
        return true;
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
        //* 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/login.scss`);

        this.changeCaptcha();

        //* 取得公鑰 & token
        if (!this.token || !this.publicKey) {
          const result = await getTokenAndPublicKey();
          console.log('[TokenAndPublicKey]', result);

          this.$store.commit('user/setToken', result.RetObj.token);
          this.$store.commit('user/setPublicKey', result.RetObj.publickey);
        }

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.login {
  padding-bottom: 119px;
}

.login__title {
  color: #fff;
  font-size: 3.584em;
  font-weight: normal;
  text-align: center;
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

.login__form__link-div {
  margin-top: 35px;
  font-size: 2.46em;
}

.login__form__link {
  /* width: 150px; */
  min-width: 129px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: top center;
  padding-top: 134px;
}

.en-us .login__form__link {
  width: 170px;
}

.en-us .login__form__link--forget {
  width: 200px;
}

.zh-cn .login__form__link {
  width: 170px;
}

.th-th .login__form__link {
  width: 180px;
}

.login__form__submit {
  display: block;
  margin: 20px auto;
}
</style>
