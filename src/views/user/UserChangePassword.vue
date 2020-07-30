<template>
  <div class="user-change-password">
    <form
      class="theme-content-box user-change-password__form"
      id="user-change-passowrd-form"
      @submit.prevent="changePassword"
    >
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">旧密码</span>
        <input
          class="ui-ipt"
          id="Add_OldPassword"
          type="password"
          size="30"
          title="请输入旧密码"
          v-model="user.passwordOld"
        />
        <div class="theme-errorMsg" v-if="errorPasswordOld">
          <span class="theme-txt-errorMsg">{{ errorPasswordOld }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">新密码</span>
        <input
          class="ui-ipt"
          type="password"
          id="Add_NewPassword"
          size="30"
          title="请输入新密码"
          v-model="user.passwordNew"
        />
        <div class="theme-errorMsg" v-if="errorPasswordNew">
          <span class="theme-txt-errorMsg">{{ errorPasswordNew }}</span>
        </div>
      </div>
      <div class="user-change-password__input-div theme-input-box">
        <span class="theme-input-header">确认密码</span>
        <input
          class="ui-ipt"
          id="Add_PasswordCheck"
          type="password"
          size="30"
          title="请再次输入新密码"
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
        提交
      </button>
    </div>
    <ol class="ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice">
        {{ notice }}
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
        '为保障您的账号安全，请定期更换您的密码。',
        '设定新密码必须超过6个字符。',
        '如果您需要任何协助，请随时联系我们的客服人员，您的个人资料将被保密。',
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
