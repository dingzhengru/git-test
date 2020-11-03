<template>
  <div class="login">
    <div class="login__error-message theme-errorMsg" v-if="error">
      <span class="theme-txt-errorMsg">{{ error }}</span>
    </div>
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
            :id="idMapper.login.input.username"
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
            :id="idMapper.login.input.password"
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
            :id="idMapper.login.input.captcha"
            type="tel"
            :placeholder="$t('login.placeholder.captcha')"
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
        </ValidationProvider>
        <div class="login__form__field login__form__field--remember-me" v-if="siteIsOpenRememberMe">
          <input class="login__form__field__checkbox" id="RememberMe" type="checkbox" v-model="user.RememberMe" />
          <label class="login__form__field__label" id="lbRememberMe" for="RememberMe">
            {{ $t('login.rememberMe') }}
          </label>
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
          :disabled="invalid"
        >
          {{ $t('login.button.login') }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import loginMixin from '@/mixins/login';
import { mapGetters } from 'vuex';
import { getRememberInfo } from '@/api/user';

export default {
  mixins: [loginMixin],
  computed: {
    ...mapGetters([
      'siteID',
      'siteFullCss',
      'token',
      'publicKey',
      'pwaInstallStatus',
      'pwaPrompt',
      'siteIsOpenRememberMe',
    ]),
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

        //* 取得公鑰 & token
        if (!this.token || !this.publicKey) {
          await this.$store.dispatch('user/getTokenAndPublicKey');
        }

        //* 取得記憶帳密(先判斷此 Site 是否開放此功能)
        if (this.siteIsOpenRememberMe) {
          const result = await getRememberInfo();
          console.log('[RememberInfo]', result);

          if (result.Code == 200) {
            this.user = result.RetObj.LoginUser;
          }
        }

        this.changeCaptcha();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding-bottom: 119px;

  &__error-message {
    text-align: center;
  }

  &__title {
    color: #fff;
    font-size: 3.584em;
    font-weight: normal;
    text-align: center;
  }

  &__form {
    width: 563px;
    margin: 0 auto;
    text-align: center;

    &__field {
      height: 81px;
      background-repeat: no-repeat;
      margin-bottom: 30px;
      padding-left: 80px;

      &--code {
        position: relative;
      }

      &__image--code {
        position: absolute;
        top: 11px;
        right: 15px;
      }
      &__input {
        width: 465px;
        height: 64px;
        background-color: transparent;
        margin: 8px 0 9px;
        padding: 0 3px;
        border: none;
        outline: none;
        font-size: 2.5em;

        &--code {
          width: 315px;
          padding-right: 153px;
        }
      }
      &--remember-me {
        height: 70px;
        padding: 0;
        outline: none;
      }
      &__checkbox {
        width: 35px;
        height: 27px;
      }
      &__label {
        font-size: 2.5em;
      }
    }
    &__link-div {
      margin-top: 35px;
      font-size: 2.46em;

      a {
        min-width: 129px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: top center;
        padding-top: 134px;
      }
    }
    &__submit {
      display: block;
      margin: 20px auto;
    }
  }
}

.en-us {
  .login__form__link {
    width: 170px;
  }
  .login__form__link--forget {
    width: 200px;
  }
}

.zh-cn {
  .login__form__link {
    width: 170px;
  }
}

.th-th {
  .login__form__link {
    width: 180px;
  }
}
</style>

<style scoped>
/* .login {
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
} */
</style>
