export default {
  data() {
    return {
      refreshTimeCount: 60,
      refreshTimeInterval: 60,
    };
  },
  methods: {
    refreshWallet() {
      if (this.refreshTimeCount != this.refreshTimeInterval) {
        return;
      }

      this.$store.dispatch('user/getPointInfo');

      let countDown = setInterval(() => {
        this.refreshTimeCount--;
      }, 1000);

      window.setTimeout(() => {
        window.clearInterval(countDown);
        this.refreshTimeCount = this.refreshTimeInterval;
      }, this.refreshTimeInterval * 1000);
    },
    async transferAllPointToMain() {
      this.$store.dispatch('user/transferAllPointToMain');
    },
  },
};
