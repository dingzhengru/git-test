<template>
  <div class="sign-in">
    <div class="sign-in__error-message theme-errorMsg" v-if="error">
      <span class="theme-txt-errorMsg">{{ error }} </span>
    </div>
    <div class="sign-in__wrapper">
      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="sign-in__wrapper__form" @submit.prevent="handleSubmit(submitLogin)">
          <ValidationProvider
            tag="div"
            class="sign-in__wrapper__form__field"
            :rules="{ required: true, min: 3, max: 15, regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$' }"
          >
            <input type="text" :placeholder="$t('login.placeholder.username')" v-model="user.UserName" />
          </ValidationProvider>

          <ValidationProvider
            tag="div"
            class="sign-in__wrapper__form__field"
            :rules="{ required: true, min: 6, max: 30, regex: '^[a-zA-Z0-9]*$' }"
          >
            <input type="password" :placeholder="$t('login.placeholder.password')" v-model="user.Password" />
          </ValidationProvider>

          <ValidationProvider
            tag="div"
            class="sign-in__wrapper__form__field"
            :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
          >
            <input
              class="sign-in__wrapper__form__field__input--captcha"
              type="tel"
              :placeholder="$t('login.placeholder.captcha')"
              autocomplete="off"
              v-model="user.CaptchaValue"
            />

            <img
              class="login__form__field__image--code"
              :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
              :width="156"
              :height="56"
              v-if="captchaImage.ImgBase64 != ''"
              @click="changeCaptcha"
            />
          </ValidationProvider>
          <div class="sign-in__wrapper__form__field">
            <button type="submit" :disabled="invalid">{{ $t('login.button.login') }}</button>
          </div>
        </form>
      </ValidationObserver>
      <div class="sign-in__wrapper__bottom">
        <p>Copyright © 2012 All Rights Reserved</p>

        <div
          class="sign-in__wrapper__bottom__lang-flag"
          :class="lang.Lst_Locales_Code"
          v-for="lang in langList"
          :key="lang.Lst_Locales_Code"
          @click="changeLang(lang.Lst_Locales_Code)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import loginMixin from '@/mixins/login';
import { mapGetters } from 'vuex';
import langMixin from '@/mixins/lang';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'SignIn',
  mixins: [loginMixin, langMixin],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['langList', 'siteFullCss', 'siteIsSpare', 'siteEnableSpareDomain']),
  },
  async mounted() {
    //* 根據版型引入 css
    // import(`@/styles/${this.siteFullCss}/sign-in.scss`);

    if (this.siteIsSpare === false || this.siteEnableSpareDomain === false || this.isLoggedIn === true) {
      this.$router.replace({ name: 'Home' });
      return;
    }

    //* 取得公鑰 & token
    if (!this.token || !this.publicKey) {
      await this.$store.dispatch('user/getTokenAndPublicKey');
    }

    this.changeCaptcha();
  },
};
</script>

<style lang="scss" scoped>
.sign-in {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__error-message {
    min-width: 640px;
    text-align: center;
    word-wrap: break-word;
  }

  &__wrapper {
    width: 640px;
    min-height: 612px;
    // height: 90%;
    background-image: url(~@/assets/common/sign-in/cm_login_3.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &__form {
      margin-top: 190px;
      margin-left: 40px;

      &__field {
        margin-bottom: 15px;
        position: relative;

        input {
          width: 324px;
          height: 64px;
          min-height: 60px;
          border: 0px;
          border-radius: 5px;
          color: #666;
          padding-left: 15px;
          font-size: 2rem;
          box-sizing: border-box;
        }

        img {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -30px;
        }

        button {
          width: 146px;
          height: 64px;
          color: #fff;
          font-size: 30px;
          background-color: #811634;
          border: 0px;
          border-radius: 5px;

          &:disabled {
            opacity: 0.3;
          }
        }

        &__input--captcha {
          width: 184px !important;
        }
      }
    }

    &__bottom {
      position: absolute;
      bottom: -150px;
      font-size: 2em;
      color: #4e4941;
      text-align: center;

      &__lang-flag {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin-right: 15px;

        &.en-us {
          background-image: url(~@/assets/common/lang/lang_en-us_s.png);
        }

        &.th-th {
          background-image: url(~@/assets/common/lang/lang_th-th_s.png);
        }

        &.zh-cn {
          background-image: url(~@/assets/common/lang/lang_zh-cn_s.png);
        }

        &.zh-tw {
          background-image: url(~@/assets/common/lang/lang_zh-tw_s.png);
        }

        &.my-mm {
          background-image: url(~@/assets/common/lang/lang_my-mm_s.png);
        }
      }
    }
  }
}
</style>
