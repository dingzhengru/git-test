export default {
  name: 'MixinLotteryGame',
  methods: {
    async openLotteryGame(lottery) {
      if (lottery.Type == 0) {
        this.initWheelHandler();
      } else if (lottery.Type == 1) {
        this.initHandlerRedEnvelope();
      }
    },
  },
};
