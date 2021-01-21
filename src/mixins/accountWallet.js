export default {
  data() {
    return {
      refreshTimeCount: 60,
      refreshTimeInterval: 60,
    };
  },
  methods: {
    refreshWallet() {
      this.$store.dispatch('user/getPointInfo');
    },
    async transferAllPointToMain() {
      const result = await this.$store.dispatch('user/transferAllPointToMain');
      if (result.Code == 200) {
        window.alert(result.RetObj.MsgString);
      }
    },
  },
};
