<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{ username, currency, createdDatetime: createdDatetime ? createdDatetime.replace('T', ' ') : '' }"
      :registerList="registerList"
      :bankList="bankList"
      @instantAccess="submitInstantAccess"
      @change-register-field="changeRegisterField"
      v-if="isAccountOpen == false"
    ></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :profile="{
        username,
        currency,
        createdDatetime: createdDatetime.replace('T', ' '),
        realName,
        email,
        birthday: birthday.split('T')[0],
        bankName1,
        bankAccount1,
        bankBrach1,
        bankAccountName1,
      }"
      @change-withdrawal-password="changeWithdrawalPassword"
      v-else-if="isAccountOpen == true"
    ></UserProfileListAccess>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { changePasswordWithdrawal } from '@/api/user';
import { getRegisterAdvanceNew, checkRegisterFieldExist } from '@/api/register';

export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters([
      'isAccountOpen',
      'siteID',
      'siteFullCss',
      'username',
      'currency',
      'createdDatetime',
      'realName',
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
        window.alert(this.$t('user.changePassword.alert.success'));
      }
    },
    async changeRegisterField(field, fieldList, invalid, oldField) {
      if (invalid || field.value == '') {
        return;
      }

      if (field.isOnly) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await checkRegisterFieldExist(requestData);
        if (result == false) {
          field.value = oldField.value;
          alert(this.$t(`register.${field.name}.error.invalid`));
        }
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
    isAccountOpen: {
      immediate: true,
      async handler() {
        if (this.isAccountOpen === false) {
          console.log('[isAccountOpen]', this.isAccountOpen);
          const result = await getRegisterAdvanceNew();
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
