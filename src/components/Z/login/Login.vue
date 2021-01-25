<template>
  <ValidationObserver class="login" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="login-form" @submit.prevent="handleSubmit(submitLogin)">
      <ValidationProvider
        class="login__field ui-field"
        tag="div"
        :rules="{ required: true, min: 3, max: 15, regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$' }"
      >
        <label class="ui-field__label" :for="$idMapper.login.input.username">
          {{ $t('login.placeholder.username') }}
        </label>
        <input
          class="ui-field__input"
          :id="$idMapper.login.input.username"
          type="text"
          :placeholder="$t('login.placeholder.username')"
          v-model="user.UserName"
        />
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="login__field ui-field"
        :rules="{ required: true, min: 6, max: 30, regex: '^[a-zA-Z0-9]*$' }"
      >
        <label class="ui-field__label" :for="$idMapper.login.input.password">
          {{ $t('login.placeholder.password') }}
        </label>
        <input
          class="ui-field__input"
          :id="$idMapper.login.input.password"
          type="password"
          :placeholder="$t('login.placeholder.password')"
          v-model="user.Password"
        />
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="login__field ui-field"
        :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
      >
        <label class="ui-field__label" :for="$idMapper.login.input.password">
          {{ $t('login.placeholder.captcha') }}
        </label>
        <input
          class="ui-field__input"
          :id="$idMapper.login.input.captcha"
          type="code"
          :placeholder="$t('login.placeholder.captcha')"
          v-model="user.CaptchaValue"
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
      </ValidationProvider>
      <div class="login__field login__field--remember ui-field">
        <input id="login-remember" type="checkbox" v-model="user.RememberMe" />
        <label for="login-remember" class="">記住我</label>
      </div>
      <button
        class="login__button--login ui-btn ui-btn--block-8"
        :id="$idMapper.login.button.submit"
        type="submit"
        :disabled="invalid"
      >
        {{ $t('login.button.login') }}
      </button>
      <button class="login__button--forget ui-btn ui-btn--block-8" @click="$router.push({ name: 'ForgetPassword' })">
        {{ $t('login.link.forgetPassword') }}
      </button>
      <div class="login__text">or</div>
      <button class="login__button--register ui-btn ui-btn--block-8" @click="$router.push({ name: 'Register' })">
        {{ $t('login.link.register') }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinLogin from '@/mixins/login';
import { mapGetters } from 'vuex';
import { apiGetRememberInfo } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Login',
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
    //* 根據版型引入 css
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
