<template>
  <ValidationObserver class="login" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="login-form" @submit.prevent="handleSubmit(submitLogin)">
      <ValidationProvider
        class="login__field ui-field"
        tag="div"
        :rules="{ required: true, min: 3, max: 15, regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$' }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label" :for="$idMapper.login.input.username">
            {{ $t('login.placeholder.username') }}
          </label>
          <input
            class="ui-field__group__input"
            :id="$idMapper.login.input.username"
            type="text"
            :placeholder="$t('login.placeholder.username')"
            v-model="user.UserName"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="login__field ui-field"
        :rules="{ required: true, min: 6, max: 30, regex: '^[a-zA-Z0-9]*$' }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label" :for="$idMapper.login.input.password">
            {{ $t('login.placeholder.password') }}
          </label>
          <input
            class="ui-field__group__input"
            :id="$idMapper.login.input.password"
            type="password"
            :placeholder="$t('login.placeholder.password')"
            v-model="user.Password"
          />
        </div>
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="login__field ui-field"
        :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label" :for="$idMapper.login.input.captcha">
            {{ $t('login.placeholder.captcha') }}
          </label>
          <input
            class="ui-field__group__input"
            :id="$idMapper.login.input.captcha"
            type="code"
            :placeholder="$t('login.placeholder.captcha')"
            v-model="user.CaptchaValue"
            autocomplete="off"
          />
          <img
            class="ui-field__captcha"
            :id="$idMapper.login.image.captcha"
            :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
            :width="captchaImage.Width"
            :height="captchaImage.Height"
            v-if="captchaImage.ImgBase64 != ''"
            @click="changeCaptcha"
          />
        </div>
      </ValidationProvider>
      <div class="login__field login__field--remember ui-field">
        <div class="ui-field__group ui-field__group--checkbox">
          <input id="login-remember" type="checkbox" v-model="user.RememberMe" />
          <label for="login-remember" class="">{{ $t('login.rememberMe') }}</label>
        </div>
      </div>

      <div class="login__btn">
        <button
          class="login__btn--login ui-btn ui-btn--block"
          :id="$idMapper.login.button.submit"
          type="submit"
          :disabled="invalid"
        >
          {{ $t('login.button.login') }}
        </button>
        <button class="login__btn--forget ui-btn ui-btn--block" @click="$router.push({ name: 'ForgetPassword' })">
          {{ $t('login.link.forgetPassword') }}
        </button>

        <button
          class="ui-btn ui-btn--block"
          :class="{
            'login__btn--pwa-install': pwaInstallStatus === 'notInstalled',
            'login__btn--pwa-installing': pwaInstallStatus === 'installing',
            'login__btn--pwa-installed': pwaInstallStatus === 'installed',
          }"
          v-if="pwaIsShowButton"
          @click="clickPwaHandler"
        >
          <template v-if="pwaInstallStatus === 'notInstalled'">
            App
          </template>
          <template v-else-if="pwaInstallStatus === 'installing'">
            Installing
          </template>
          <template v-else-if="pwaInstallStatus === 'installed'">
            Open App
          </template>
        </button>

        <div class="login__text">or</div>
        <button class="login__btn--register ui-btn ui-btn--block" @click="$router.push({ name: 'Register' })">
          {{ $t('ui.button.registerNow') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinLogin from '@/mixins/login';
import mixinPwa from '@/mixins/pwa';
import { mapGetters } from 'vuex';
import { apiGetRememberInfo } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Login',
  mixins: [mixinLogin, mixinPwa],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters([
      'pageTitle',
      'siteFullCss',
      'pwaIsShowButton',
      'userToken',
      'userPublicKey',
      'siteIsOpenRememberMe',
    ]),
  },
  async mounted() {
    import(`@/styles/${this.siteFullCss}/login.scss`);

    this.$store.commit('setPageTitle', 'login.title');

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
