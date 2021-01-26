<template>
  <div class="login">
    <!-- <div class="login__error-message theme-errorMsg" v-if="error">
      <span class="theme-txt-errorMsg">{{ error }}</span>
    </div> -->
    <h1 class="login__title">{{ $t('login.title') }}</h1>
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form class="login__form" id="LoginForm" @submit.prevent="handleSubmit(submitLogin)">
        <ValidationProvider
          tag="div"
          class="login__form__field login__form__field--account"
          :rules="{ required: true, min: 3, max: 15, regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$' }"
        >
          <input
            class="login__form__field__input"
            :id="$idMapper.login.input.username"
            type="text"
            :placeholder="$t('login.placeholder.username')"
            v-model="user.UserName"
          />
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="login__form__field login__form__field--password"
          :rules="{ required: true, min: 6, max: 30, regex: '^[a-zA-Z0-9]*$' }"
        >
          <input
            class="login__form__field__input"
            :id="$idMapper.login.input.password"
            type="password"
            :placeholder="$t('login.placeholder.password')"
            v-model="user.Password"
          />
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="login__form__field login__form__field--code"
          :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
        >
          <input
            class="login__form__field__input login__form__field__input--code"
            :id="$idMapper.login.input.captcha"
            type="tel"
            :placeholder="$t('login.placeholder.captcha')"
            autocomplete="off"
            v-model="user.CaptchaValue"
          />
          <img
            class="login__form__field__image--code"
            :id="$idMapper.login.image.captcha"
            :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
            :width="captchaImage.Width"
            :height="captchaImage.Height"
            v-if="captchaImage.ImgBase64 != ''"
            @click="changeCaptcha"
          />
        </ValidationProvider>
        <div class="login__form__field login__form__field--remember" v-if="siteIsOpenRememberMe">
          <input class="login__form__field__checkbox" id="RememberMe" type="checkbox" v-model="user.RememberMe" />
          <label class="login__form__field__label" id="lbRememberMe" for="RememberMe">
            {{ $t('login.rememberMe') }}
          </label>
        </div>
        <div class="login__form__link-div">
          <router-link
            class="login__form__link login__form__link--register"
            :id="$idMapper.login.link.register"
            :to="{ name: 'Register' }"
          >
            {{ $t('login.link.register') }}
          </router-link>
          <router-link
            class="login__form__link login__form__link--forget"
            :id="$idMapper.login.link.forgetPassword"
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
          class="ui-btn ui-btn--long login__form__submit"
          :id="$idMapper.login.button.submit"
          type="submit"
          :disabled="invalid"
        >
          {{ $t('login.button.login') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import mixinLogin from '@/mixins/login';
import { mapGetters } from 'vuex';
import { apiGetRememberInfo } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'SignIn',
  mixins: [mixinLogin],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters([
      'siteFullCss',
      'pwaInstallStatus',
      'pwaPrompt',
      'userToken',
      'userPublicKey',
      'siteIsOpenRememberMe',
    ]),
  },
  async mounted() {
    import(`@/styles/${this.siteFullCss}/login.scss`);

    //* 取得公鑰 & token
    if (!this.userToken || !this.userPublicKey) {
      await this.$store.dispatch('user/getTokenAndPublicKey');
    }

    //* 取得記憶帳密(先判斷此 Site 是否開放此功能)
    if (this.siteIsOpenRememberMe) {
      const result = await apiGetRememberInfo();

      if (result.Code == 200) {
        this.user = result.RetObj.LoginUser;
      }
    }

    this.changeCaptcha();
  },
};
</script>
