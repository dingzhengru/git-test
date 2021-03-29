import mixinCountdown from '@/mixins/countdown';
export default {
  mixins: [mixinCountdown],
  data() {
    return {
      refreshButtonIsLoading: false,
    };
  },
  methods: {
    async refreshWallet() {
      if (this.refreshButtonIsLoading) {
        return;
      }

      this.refreshButtonIsLoading = true;

      const result = await this.$store.dispatch('user/getPointInfo');

      if (result.Code === 200) {
        this.setCountdownSecond(60);
        this.startCountdown(() => {
          this.refreshButtonIsLoading = false;
        });
      } else {
        this.refreshButtonIsLoading = false;
      }
    },
    async transferAllPointToMain() {
      this.$store.dispatch('user/transferAllPointToMain');
    },
  },
};
