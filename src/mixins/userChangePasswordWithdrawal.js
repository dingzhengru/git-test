import { apiChangePasswordWithdrawal } from '@/api/user';

export default {
  name: 'MixinUserChangePassword',
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      noticeList: ['user.changePasswordWithdrawal.notice.first'],
    };
  },
  methods: {
    async submitChangeWithdrawPassword() {
      const requestData = {
        OldPassword: this.passwordOld,
        Password: this.passwordNew,
        CheckPassword: this.passwordCheck,
      };

      const result = await apiChangePasswordWithdrawal(requestData);

      if (result.Code == 200) {
        this.$store.dispatch('user/getInfo');
        window.alert(this.$t('alert.changeProfileSuccess'));
        this.resetForm();
      }
      
      return result;
    },
    resetForm() {
      this.passwordOld = '';
      this.passwordNew = '';
      this.passwordCheck = '';
    },
  },
};
