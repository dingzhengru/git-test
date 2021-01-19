<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <component
      :is="UserProfileList"
      :registerList="registerList"
      :bankList="bankList"
      @instantAccess="submitInstantAccess"
      @change-register-field="changeRegisterField"
      v-if="userIsAccountOpen == false"
    />

    <!-- 開通後的 -->
    <component :is="UserProfileListAccess" @change-withdrawal-password="changeWithdrawalPassword" v-else />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { apiChangePasswordWithdrawal } from '@/api/user';
import { apiGetRegisterAdvanceNew, apiCheckRegisterFieldExist } from '@/api/register';

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'userIsAccountOpen']),
    UserProfileList() {
      return () => import(`@/${this.siteSetting.components.user.UserProfileList}`);
    },
    UserProfileListAccess() {
      return () => import(`@/${this.siteSetting.components.user.UserProfileListAccess}`);
    },
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
      const result = this.$store.dispatch('user/advancedRegisterNew', data);
      if (result.Code == 200) {
        window.alert(this.$t('alert.accessSuccess'));
      }
    },
    async changeWithdrawalPassword(data) {
      const result = await apiChangePasswordWithdrawal(data);

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
  watch: {
    userIsAccountOpen: {
      immediate: true,
      async handler() {
        if (this.userIsAccountOpen === false) {
          const result = await apiGetRegisterAdvanceNew();

          this.registerList = result.RetObj.Register;
          this.bankList = result.RetObj.Add_BankList;
        }
      },
    },
  },
};
</script>
