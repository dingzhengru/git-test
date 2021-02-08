import { mapGetters } from 'vuex';

export default {
  name: 'MixinUserProfile',
  computed: {
    ...mapGetters([
      'lang',
      'siteFullCss',
      'userInfo',
      'userAccount',
      'userBirthday',
      'userCreatedDatetime',
      'userRealName',
      'userNickname',
      'userMobile',
    ]),
    getDatetime: () => datetime => {
      return `${datetime.split('.')[0].replace('T', ' ')} (GMT+8)`;
    },
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
  data() {
    return {
      birthday: '',
    };
  },
  mounted() {},
  watch: {
    userInfo: {
      immediate: true,
      handler() {
        if (Object.keys(this.userInfo).length === 0) {
          return;
        }

        this.birthday = this.userBirthday.split('T')[0];
      },
    },
  },
};
