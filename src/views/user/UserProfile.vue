<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{ username, currency, createdDatetime: createdDatetime.replace('T', ' ') }"
      :registerList="registerList"
      :bankList="bankList"
      v-if="isAccountOpen == false"
      @instantAccess="submitInstantAccess"
      @change-register-field="changeRegisterField"
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
      v-else-if="isAccountOpen == true"
      @change-withdrawal-password="changeWithdrawalPassword"
    ></UserProfileListAccess>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getBankInfoList, changePasswordWithdrawal } from '@/api/user';
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
    async changeRegisterField(field, fieldList, fieldValidError, oldField) {
      if (fieldValidError != '') {
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
        if (this.isAccountOpen == null) {
          return;
        }

        if (this.isAccountOpen) {
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
