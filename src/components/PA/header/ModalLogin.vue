<template>
  <ValidationObserver class="modal-login" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="modal-login-form" @submit.prevent="handleSubmit(submitLogin)">
      <ValidationProvider
        class="ui-field"
        tag="div"
        :rules="{ required: true, min: 3, max: 15, regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$' }"
      >
        <input
          class="ui-input"
          :id="$idMapper.login.input.username"
          type="text"
          :placeholder="$t('login.placeholder.username')"
          v-model="user.UserName"
        />
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="ui-field"
        :rules="{ required: true, min: 6, max: 30, regex: '^[a-zA-Z0-9]*$' }"
      >
        <input
          class="ui-input"
          :id="$idMapper.login.input.password"
          type="password"
          :placeholder="$t('login.placeholder.password')"
          v-model="user.Password"
        />
      </ValidationProvider>
      <ValidationProvider
        tag="div"
        class="ui-field modal-login__field--captcha"
        :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
      >
        <div class="ui-field__group">
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
            v-if="captchaImage.ImgBase64 != ''"
            @click="changeCaptcha"
          />
        </div>
      </ValidationProvider>

      <div class="modal-login__remember">
        <label for="login-remember">
          <input id="login-remember" type="checkbox" v-model="user.RememberMe" />
          {{ $t('login.rememberMe') }}
        </label>
        <a href="javascript:;" class="modal-login__remember__right" @click="$store.dispatch('openModalContact')">
          {{ $t('login.link.forgetPassword') }}?
        </a>
      </div>

      <div class="modal-login__btn-block">
        <button
          class="ui-btn modal-login__btn--login"
          type="submit"
          :id="$idMapper.login.button.submit"
          :disabled="invalid"
        >
          {{ $t('ui.button.login') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinLogin from '@/mixins/login';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalLogin',
  mixins: [mixinStyleLoader, mixinLogin],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  async mounted() {
    this.importStyleByFilename('login');
  },
};
</script>
