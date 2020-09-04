<template>
  <div class="user-change-password">
    <form
      class="theme-content-box user-change-password__form"
      id="user-change-passowrd-form"
      @submit.prevent="submitChangePassword"
    >
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordOld') }}</span>
        <input class="ui-ipt" type="password" required minlength="6" pattern="^[a-zA-Z0-9]*$" v-model="passwordOld" />
        <div class="theme-errorMsg" v-if="errorPasswordOld">
          <span class="theme-txt-errorMsg">{{ errorPasswordOld }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordNew') }}</span>
        <input class="ui-ipt" type="password" required minlength="6" pattern="^[a-zA-Z0-9]*$" v-model="passwordNew" />
        <div class="theme-errorMsg" v-if="errorPasswordNew">
          <span class="theme-txt-errorMsg">{{ errorPasswordNew }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordCheck') }}</span>
        <input class="ui-ipt" type="password" required minlength="6" pattern="^[a-zA-Z0-9]*$" v-model="passwordCheck" />
        <div class="theme-errorMsg" v-if="errorPasswordCheck">
          <span class="theme-txt-errorMsg">{{ errorPasswordCheck }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordRemember') }}</span>
        <toggle-button
          v-model="isRememberPassword"
          :width="640"
          :height="80"
          :sync="true"
          :margin="0"
          :color="{ checked: 'purple', unchecked: 'gray' }"
          :labels="{ checked: $t('user.changePassword.switch.on'), unchecked: $t('user.changePassword.switch.off') }"
          :font-size="40"
        />
      </div>
    </form>
    <div class="user-change-password__button-div">
      <button
        class="user-change-password__button--submit ui-btn ui-btn-long"
        type="submit"
        form="user-change-passowrd-form"
      >
        {{ $t('ui.button.submit') }}
      </button>
    </div>
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
import { changePassword } from '@/api/user';
export default {
  name: 'UserChangePassword',
  components: {
    ToggleButton,
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      errorPasswordOld: '',
      errorPasswordNew: '',
      errorPasswordCheck: '',
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      isRememberPassword: false,
      noticeList: ['suggest', 'rule', 'contact'],
    };
  },
  methods: {
    async submitChangePassword() {
      if (!this.validateForm()) {
        return;
      }
      console.log('[SubmitChangePassword]');

      const requestData = {
        Add_OldPassword: this.passwordOld,
        Add_NewPassword: this.passwordNew,
        Add_PasswordCheck: this.passwordCheck,
      };

      const result = await changePassword(requestData);
      console.log('[ChangePassword]', result);

      // if (result.Code == 200) {
      // }
    },
    validateForm() {
      if (this.passwordOld == '') {
        return false;
      } else if (this.passwordNew == '') {
        return false;
      } else if (this.passwordCheck == '') {
        return false;
      } else if (this.passwordCheck != this.passwordNew) {
        this.errorPasswordCheck = '確認密碼錯誤';
        return false;
      }
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
        import(`@/styles/${this.siteFullCss}/user/change-password.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    isRememberPassword() {
      console.log('[isRememberPassword]', this.isRememberPassword);
    },
  },
};
</script>

<style>
/*
 * Switch 開關，width: 640px, height: 100px
*/

.user-change-password__input-div .v-switch-core {
  border-radius: 0 !important;
}

/*
 * 按鈕
*/

.user-change-password__input-div .vue-js-switch .v-switch-core .v-switch-button {
  width: 320px !important;
  border-radius: 0 !important;
}

/*
 * 按鈕在右邊時
 * 位置: (開關寬度/2) + (開關寬度/2 - 按鈕寬度) => (640/2) + (640/2 - 320)
*/
.user-change-password__input-div .vue-js-switch.toggled .v-switch-core .v-switch-button {
  transform: translate3d(320px, 0px, 0px) !important;
}
/*
 * 左邊標籤(文字)
 * 位置: (按鈕大小 - 標籤大小) / 2 => (320-80) / 2
*/
.user-change-password__input-div .vue-js-switch .v-switch-label.v-left {
  left: 120px !important;
}

/*
 * 右邊標籤(文字)
 * 位置: 同上
*/
.user-change-password__input-div .vue-js-switch .v-switch-label.v-right {
  right: 120px !important;
}
</style>

<style scoped>
.user-change-password__form {
  margin: 40px 0;
}

.user-change-password__input-div {
  margin: 20px 0;
}

.user-change-password__button-div {
  margin: 40px 0;
  text-align: center;
}
</style>
