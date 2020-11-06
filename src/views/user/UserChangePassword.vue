<template>
  <div class="user-change-password">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form
        class="theme-content-box user-change-password__form"
        id="user-change-passowrd-form"
        @submit.prevent="handleSubmit(submitChangePassword)"
      >
        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
          :rules="{
            'change-password-required': true,
            'change-password-min': 6,
            'change-password-max': 30,
            'change-password-regex': '^[a-zA-Z0-9]*$',
          }"
          name="Add_OldPassword"
          v-slot="{ errors }"
        >
          <span class="theme-input-header">{{ $t('user.changePassword.passwordOld') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordOld" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
          :rules="{
            'change-password-required': true,
            'change-password-min': 6,
            'change-password-max': 30,
            'change-password-regex': '^[a-zA-Z0-9]*$',
          }"
          name="Add_NewPassword"
          v-slot="{ errors }"
        >
          <span class="theme-input-header">{{ $t('user.changePassword.passwordNew') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordNew" autocomplete="off" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
          :rules="{
            'change-password-required': true,
            'change-password-confirmed': 'Add_NewPassword',
            'change-password-min': 6,
            'change-password-max': 30,
            'change-password-regex': '^[a-zA-Z0-9]*$',
          }"
          name="Add_PasswordCheck"
          v-slot="{ errors }"
        >
          <span class="theme-input-header">{{ $t('user.changePassword.passwordCheck') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordCheck" autocomplete="off" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="user-change-password__form__field theme-input-box">
          <span class="theme-input-header">{{ $t('user.changePassword.passwordRemember') }}</span>
          <toggle-button
            v-model="isRememberPassword"
            :width="640"
            :height="80"
            :sync="true"
            :margin="0"
            :color="{ checked: 'purple', unchecked: 'gray' }"
            :labels="{
              checked: $t('user.changePassword.switch.on'),
              unchecked: $t('user.changePassword.switch.off'),
            }"
            :font-size="40"
            @change="changeRemember"
          />
        </div>
      </form>
      <div class="user-change-password__button-div">
        <button
          class="user-change-password__button--submit ui-btn ui-btn-long"
          type="submit"
          form="user-change-passowrd-form"
          :disabled="invalid"
        >
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </ValidationObserver>
    <ol class="ui-ol-memberNotice">
      <li v-for="(notice, index) in noticeList" :key="index">
        {{ $t(`user.changePassword.notice.${notice}`) }}
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';
import { apiChangePassword, apiChangeRemember } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '@/utils/vee-validate.js';

export default {
  name: 'UserChangePassword',
  components: {
    ToggleButton,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsEnableRememberOption']),
  },
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      isRememberPassword: false,
      noticeList: ['suggest', 'rule', 'contact'],
    };
  },
  methods: {
    async submitChangePassword() {
      this.$store.commit('setIsLoading', true);

      const requestData = {
        Add_OldPassword: this.passwordOld,
        Add_NewPassword: this.passwordNew,
        Add_PasswordCheck: this.passwordCheck,
      };

      const result = await apiChangePassword(requestData);
      console.log('[ChangePassword]', result);

      if (result.Code == 200) {
        window.alert(this.$t('alert.changeProfileSuccess'));
        this.resetForm();
      }
      this.$store.commit('setIsLoading', false);
    },
    async changeRemember() {
      const requestData = { ReMember: this.isRememberPassword };
      const result = await apiChangeRemember(requestData);

      console.log('[ChangeRemember]', result);
      if (result.Code == 200) {
        this.$store.commit('user/setIsEnableRememberOption', this.isRememberPassword);
        window.alert(this.$t('alert.changeProfileSuccess'));
      }
    },
    resetForm() {
      this.passwordOld = '';
      this.passwordNew = '';
      this.passwordCheck = '';
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/user/change-password.scss`);

    //* 關掉 loading
    this.$store.commit('setIsLoading', false);

    //* 設置記憶密碼
    this.isRememberPassword = this.userIsEnableRememberOption;
  },
};
</script>

<style>
/*
 * Switch 開關，width: 640px, height: 100px
*/

.user-change-password__form__field .v-switch-core {
  border-radius: 0 !important;
}

/*
 * 按鈕
*/

.user-change-password .vue-js-switch .v-switch-core .v-switch-button {
  width: 320px !important;
  border-radius: 0 !important;
}

/*
 * 按鈕在右邊時
 * 位置: (開關寬度/2) + (開關寬度/2 - 按鈕寬度) => (640/2) + (640/2 - 320)
*/
.user-change-password .vue-js-switch.toggled .v-switch-core .v-switch-button {
  transform: translate3d(320px, 0px, 0px) !important;
}
/*
 * 左邊標籤(文字)
 * 位置: (按鈕大小 - 標籤大小) / 2 => (320-80) / 2
 * 但不同語言的標籤大小會不同
*/
.zh-cn .user-change-password .vue-js-switch .v-switch-label.v-left {
  left: 120px !important;
}

.en-us .user-change-password .vue-js-switch .v-switch-label.v-left {
  left: 82px !important;
}

.th-th .user-change-password .vue-js-switch .v-switch-label.v-left {
  left: 100px !important;
}

/*
 * 右邊標籤(文字)
 * 位置: 同上
*/
.zh-cn .user-change-password .vue-js-switch .v-switch-label.v-right {
  right: 120px !important;
}
.en-us .user-change-password .vue-js-switch .v-switch-label.v-right {
  right: 76px !important;
}
.th-th .user-change-password .vue-js-switch .v-switch-label.v-right {
  right: 95px !important;
}
</style>

<style lang="scss" scoped>
.user-change-password {
  &__form {
    margin: 40px 0;
    &__field {
      margin: 20px 0;
    }
  }
  &__button-div {
    margin: 40px 0;
    text-align: center;
  }
}
</style>

<style scoped>
/* .user-change-password__form {
  margin: 40px 0;
} */

/* .user-change-password__form__field {
  margin: 20px 0;
} */

/* .user-change-password__button-div {
  margin: 40px 0;
  text-align: center;
} */
</style>
