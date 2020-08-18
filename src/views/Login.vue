<template>
  <div class="login">
    <div class="theme-errorMsg" v-if="error">
      <span class="theme-txt-errorMsg">{{ error }}</span>
    </div>
    <h1 class="login__title">{{ $t('login.title') }}</h1>
    <form class="login__form" id="LoginForm" @submit.prevent="login">
      <div class="login__form__field login__form__field--account">
        <input
          class="login__form__field__input"
          :id="idMapper.login.input.username"
          type="text"
          tabindex="1"
          required
          minlength="3"
          maxlength="15"
          :placeholder="$t('login.placeholder.username')"
          v-model="user.UserName"
        />
      </div>
      <div class="login__form__field login__form__field--password">
        <input
          class="login__form__field__input"
          :id="idMapper.login.input.password"
          type="password"
          tabindex="2"
          required
          minlength="6"
          maxlength="30"
          :placeholder="$t('login.placeholder.password')"
          v-model="user.Password"
        />
      </div>
      <div class="login__form__field login__form__field--code">
        <input
          class="login__form__field__input login__form__field__input--code"
          :id="idMapper.login.input.captcha"
          type="tel"
          tabindex="3"
          required
          minlength="4"
          maxlength="4"
          pattern="^[0-9]*$"
          autocomplete="off"
          :placeholder="$t('login.placeholder.captcha')"
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
        <input
          class="login__form__field__checkbox"
          id="RememberMe"
          tabindex="4"
          type="checkbox"
          v-model="user.RememberMe"
        />
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
  mounted() {
    this.changeCaptcha();

    //* 取得公鑰 & token (登入後才於這取得，登入前放置 Login、Register 頁面)
    if (!this.token || !this.publicKey) {
      getTokenAndPublicKey().then(result => {
        this.$store.commit('user/setToken', result.RetObj.token);
        this.$store.commit('user/setPublicKey', result.RetObj.publickey);
      });
    }
  },
  beforeDestroy() {},
  methods: {
    async login() {
      console.log('[login]', this.user);
      this.error = await this.$store.dispatch('user/login', this.user);
    },
    changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberLogin' };
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
