<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{ username, currency, createdDatetime: createdDatetime.replace('T', ' ') }"
      :registerList="registerList"
      :bankList="bankList"
      v-if="isAccessed == false"
      @instantAccess="submitInstantAccess"
    ></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :profile="{
        username,
        currency,
        createdDatetime: createdDatetime.replace('T', ' '),
        fullName,
        email,
        birthday: birthday.split('T')[0],
        bankName1,
        bankAccount1,
        bankBrach1,
        bankAccountName1,
      }"
      v-else-if="isAccessed == true"
      @change-withdrawal-password="changeWithdrawalPassword"
    ></UserProfileListAccess>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getBankInfoList, changePasswordWithdrawal } from '@/api/user';
import { getRegisterAdvanceNew } from '@/api/register';

export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters([
      'isAccessed',
      'siteID',
      'siteFullCss',
      'username',
      'currency',
      'createdDatetime',
      'fullName',
      'email',
      'birthday',
      'bankName1',
      'bankAccount1',
      'bankBrach1',
      'bankAccountName1',
    ]),
  },
  data() {
    return {
      profile: {},
      registerList: [],
      bankList: [],
    };
  },
  methods: {
    async submitInstantAccess(data) {
      //* 接收送出開通帳號表單事件
      console.log('[AdvancedRegisterNew]', data);
      this.$store.dispatch('user/advancedRegisterNew', data);
    },
    async changeWithdrawalPassword(data) {
      console.log('[ChangeWithdrawalPassword]', data);
      const result = await changePasswordWithdrawal(data);

      console.log('[ChangeWithdrawalPassword]', result);
      if (result.Code == 200) {
        window.alert(this.$t('alert.changePassword.success'));
      }
    },
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/user/profile.scss`);
      },
    },
    isAccessed: {
      immediate: true,
      async handler() {
        if (this.isAccessed == null) {
          return;
        }

        if (this.isAccessed) {
          // this.profileList = this.accessList;
          // this.list = this.accessList.map(item => {
          //   if (result.RetObj[item.name]) {
          //     item.value = result.RetObj[item.name];
          //   }
          // });
          const bankInfoListResult = await getBankInfoList();
          console.log('[BankInfoList]', bankInfoListResult);
        } else {
          const result = await getRegisterAdvanceNew();
          console.log('[RegisterAdvanceNew]', result);

          this.bankList = result.RetObj.Add_BankList;
          this.registerList = result.RetObj.Register;
        }
      },
    },
  },
};
</script>

<style scoped></style>
