<template>
  <div class="user-change-password">
    <form
      class="theme-content-box user-change-password__form"
      id="user-change-passowrd-form"
      @submit.prevent="changePassword"
    >
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordOld') }}</span>
        <input
          class="ui-ipt"
          type="password"
          required
          minlength="6"
          pattern="^[a-zA-Z0-9]$"
          v-model="user.passwordOld"
        />
        <div class="theme-errorMsg" v-if="errorPasswordOld">
          <span class="theme-txt-errorMsg">{{ errorPasswordOld }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.passwordNew') }}</span>
        <input
          class="ui-ipt"
          type="password"
          required
          minlength="6"
          pattern="^[a-zA-Z0-9]$"
          v-model="user.passwordNew"
        />
        <div class="theme-errorMsg" v-if="errorPasswordNew">
          <span class="theme-txt-errorMsg">{{ errorPasswordNew }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">{{ $t('user.changePassword.PasswordCheck') }}</span>
        <input
          class="ui-ipt"
          type="password"
          required
          minlength="6"
          pattern="^[a-zA-Z0-9]$"
          v-model="user.passwordCheck"
        />
        <div class="theme-errorMsg" v-if="errorPasswordCheck">
          <span class="theme-txt-errorMsg">{{ errorPasswordCheck }}</span>
        </div>
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
      <li v-for="notice in noticeList" :key="notice.name">
        {{ $t(notice.content) }}
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserChangePassword',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      errorPasswordOld: '',
      errorPasswordNew: '',
      errorPasswordCheck: '',
      user: {
        passwordOld: '',
        passwordNew: '',
        passwordCheck: '',
      },
      noticeList: [
        {
          name: 'suggest',
          content: 'user.changePassword.notice.suggest',
        },
        {
          name: 'rule',
          content: 'user.changePassword.notice.rule',
        },
        {
          name: 'contact',
          content: 'user.changePassword.notice.contact',
        },
      ],
    };
  },
  methods: {
    changePassword() {
      console.log('changePassword()');
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
      },
    },
  },
};
</script>

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
