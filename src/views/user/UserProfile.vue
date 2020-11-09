<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{
        username: userUsername,
        currency: userCurrency,
        createdDatetime: userCreatedDatetime ? userCreatedDatetime.replace('T', ' ') : '',
      }"
      :registerList="registerList"
      :bankList="bankList"
      @instantAccess="submitInstantAccess"
      @change-register-field="changeRegisterField"
      v-if="userIsAccountOpen == false"
    ></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :profile="{
        username: userUsername,
        currency: userCurrency,
        createdDatetime: userCreatedDatetime.replace('T', ' '),
        realName: userRealName,
        email: userEmail,
        birthday: userBirthday.split('T')[0],
        bankName1: userBankName1,
        bankAccount1: userBankAccount1,
        bankBrach1: userBankBrach1,
        bankAccountName1: userBankAccountName1,
      }"
      @change-withdrawal-password="changeWithdrawalPassword"
      v-else-if="userIsAccountOpen == true"
    ></UserProfileListAccess>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { apiChangePasswordWithdrawal } from '@/api/user';
import { apiGetRegisterAdvanceNew, apiCheckRegisterFieldExist } from '@/api/register';

export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters([
      'siteFullCss',
      'userIsAccountOpen',
      'userUsername',
      'userCurrency',
      'userCreatedDatetime',
      'userRealName',
      'userEmail',
      'userBirthday',
      'userBankName1',
      'userBankAccount1',
      'userBankBrach1',
      'userBankAccountName1',
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
      const result = this.$store.dispatch('user/advancedRegisterNew', data);
      if (result.Code == 200) {
        window.alert(this.$t('alert.accessSuccess'));
      }
    },
    async changeWithdrawalPassword(data) {
      console.log('[ChangeWithdrawalPassword]', data);
      const result = await apiChangePasswordWithdrawal(data);

      console.log('[ChangeWithdrawalPassword]', result);
      if (result.Code == 200) {
        window.alert(this.$t('alert.changeProfileSuccess'));
      }
    },
    async changeRegisterField(field, fieldList, invalid, oldField) {
      if (invalid || field.value == '') {
        return;
      }

      if (field.isOnly) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result == false) {
          field.value = oldField.value;
          alert(this.$t(`register.${field.name}.error.invalid`));
        }
      }
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/user/profile.scss`);
  },
  watch: {
    userIsAccountOpen: {
      immediate: true,
      async handler() {
        if (this.userIsAccountOpen === false) {
          console.log('[isAccountOpen]', this.userIsAccountOpen);
          const result = await apiGetRegisterAdvanceNew();
          console.log('[RegisterAdvanceNew]', result);

          this.registerList = result.RetObj.Register;
          this.bankList = result.RetObj.Add_BankList;
        }
      },
    },
  },
};
</script>

<style scoped></style>
