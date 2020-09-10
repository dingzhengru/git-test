<template>
  <div class="user-profile-access">
    <div class="user-profile-access__main theme-content-box">
      <ul class="user-profile-access__main__ul theme-ul-dataView">
        <li class="theme-li-dataView" v-for="(value, key) in profile" :key="key">
          <span class="theme-dataView-header">{{ $t(`user.profile.accessed.${key}`) }}</span>
          <p class="theme-dataView-data">{{ value }}</p>
        </li>

        <!-- <li class="theme-li-dataView" v-for="item in list" :key="item.title">
          <span class="theme-dataView-header">{{ $t(`user.profile.accessed.${item.name}`) }}</span>
          <p class="theme-dataView-data">{{ item.content }}</p>
        </li> -->
        <form class="user-profile-access__main__form" id="formPasswordChange" @submit.prevent="changeWithdrawPassword">
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordOld') }}</span>
            <input
              class="ui-ipt"
              type="password"
              required
              minlength="6"
              pattern="^[a-zA-Z0-9]$"
              v-model="Add_OldPassword"
            />
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordNew') }}</span>
            <input
              class="ui-ipt"
              type="password"
              required
              minlength="6"
              pattern="^[a-zA-Z0-9]$"
              v-model="Add_NewPassword"
            />
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordCheck') }}</span>
            <input
              class="ui-ipt"
              type="password"
              required
              minlength="6"
              pattern="^[a-zA-Z0-9]$"
              v-model="Add_PasswordCheck"
            />
          </li>
        </form>
      </ul>
    </div>
    <div class="user-profile-access__button-div">
      <button type="submit" class="user-profile-access__button--submit ui-btn ui-btn-long" form="formPasswordChange">
        {{ $t('ui.button.submit') }}
      </button>
    </div>
  </div>
</template>

<script>
// import { registerFieldList, validateField } from '@/utils/register';

export default {
  name: 'UserProfileListAccess',
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
    userBankList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Add_OldPassword: '',
      Add_NewPassword: '',
      Add_PasswordCheck: '',
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
