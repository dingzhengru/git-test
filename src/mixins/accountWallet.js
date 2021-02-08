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

      setTimeout(() => {
        clearInterval(countDown);
        this.refreshTimeCount = this.refreshTimeInterval;
      }, this.refreshTimeInterval * 1000);
    },
    async transferAllPointToMain() {
      const result = await this.$store.dispatch('user/transferAllPointToMain');
      if (result.Code == 200) {
        window.alert(result.RetObj.MsgString);
      }
    },
  },
};
