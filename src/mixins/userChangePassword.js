import { mapGetters } from 'vuex';
import { apiChangePassword, apiChangeRemember } from '@/api/user';

export default {
  name: 'MixinUserChangePassword',
  computed: {
    ...mapGetters(['siteIs', 'userIsEnableRememberOption']),
  },
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      isRememberPassword: false,
      noticeList: [
        'user.changePassword.notice.suggest',
        'user.changePassword.notice.rule',
        'user.changePassword.notice.contact',
      ],
    };
  },
  methods: {
    async submitChangePassword() {
      const requestData = {
        Add_OldPassword: this.passwordOld,
        Add_NewPassword: this.passwordNew,
        Add_PasswordCheck: this.passwordCheck,
      };

      const result = await apiChangePassword(requestData);

      if (result.Code == 200) {
        window.alert(this.$t('alert.changeProfileSuccess'));
        this.resetForm();
      }

      return result;
    },
    async changeRemember() {
      const requestData = { ReMember: this.isRememberPassword };
      const result = await apiChangeRemember(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setIsEnableRememberOption', this.isRememberPassword);
        window.alert(this.$t('alert.changeProfileSuccess'));
      }
    },
    resetForm() {
      this.passwordOld = '';
      this.passwordNew = '';
      this.passwordCheck = '';

      this.$refs.validationObserver.reset();
    },
  },
  mounted() {
    //* 設置記憶密碼
    this.isRememberPassword = this.userIsEnableRememberOption;
  },
};
