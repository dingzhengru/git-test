<template>
  <div class="user-profile-access">
    <div class="user-profile-access__main theme-content-box">
      <ul class="user-profile-access__main__ul theme-ul-dataView">
        <li class="theme-li-dataView" v-for="item in list" :key="item.title">
          <span class="theme-dataView-header">{{ item.title }}</span>
          <p class="theme-dataView-data">{{ item.content }}</p>
        </li>
        <form class="user-profile-access__main__form" id="formPasswordChange" @submit.prevent="changeWithdrawPassword">
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">取款密码(旧)</span>
            <input
              class="ui-ipt"
              id="Add_Withdrawals_OldPassword"
              type="password"
              name="Add_Withdrawals_OldPassword"
              size="20"
              v-model="user.passwordOld"
            />
            <span id="sp_Add_Withdrawals_OldPassword"><span class="field-validation-valid"></span></span>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">取款密码(新)</span>
            <input
              class="ui-ipt"
              id="Add_Withdrawals_Password"
              type="password"
              name="Add_Withdrawals_Password"
              size="20"
              v-model="user.passwordNew"
            />
            <span id="sp_AddWithdrawalsPasswordHint"><span class="field-validation-valid"></span></span>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">取款密码(确认)</span>
            <input
              class="ui-ipt"
              id="Add_Withdrawals_CheckPassword"
              type="password"
              name="Add_Withdrawals_CheckPassword"
              size="20"
              v-model="user.passwordCheck"
            />
            <span id="sp_AddWithdrawalsCheckPasswordHint"><span class="field-validation-valid"></span></span>
          </li>
        </form>
      </ul>
    </div>
    <div class="user-profile-access__button-div">
      <button type="submit" class="user-profile-access__button--submit ui-btn ui-btn-long" form="formPasswordChange">
        提交
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfileListAccess',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      user: {
        passwordOld: '',
        passwordNew: '',
        passwordCheck: '',
      },
    };
  },
  methods: {
    changeWithdrawPassword() {
      console.log('changeWithdrawPassword()');
    },
  },
};
</script>

<style scoped>
.user-profile-access__main {
  margin: 40px 0;
}

.user-profile-access__main__ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.user-profile-access__button-div {
  margin: 40px 0;
  text-align: center;
}

/* .are-accountChg {
  margin: 40px 0;
}

.blk-accountChg-input {
  margin: 20px 0;
} */
</style>
