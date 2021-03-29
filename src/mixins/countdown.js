export default {
  name: 'MixinCountdown',
  data() {
    return {
      countdownTimeoutSecond: 10,
      countdownTimeoutSecondCurrent: 10,

      countdownInterval: null,
    };
  },
  computed: {
    getCountdownTimeoutSecond() {
      return this.countdownTimeoutSecond;
    },
    getCountdownTimeoutSecondCurrent() {
      return this.countdownTimeoutSecondCurrent;
    },
  },
  methods: {
    setCountdownSecond(second) {
      this.countdownTimeoutSecond = second;
      this.countdownTimeoutSecondCurrent = second;
    },
    startCountdown(callback = null) {
      const interval = window.setInterval(() => {
        if (this.countdownTimeoutSecondCurrent <= 0) {
          window.clearInterval(interval);
          this.countdownTimeoutSecondCurrent = this.countdownTimeoutSecond;
          if (callback) {
            callback();
          }
          return;
        }
        this.countdownTimeoutSecondCurrent = this.countdownTimeoutSecondCurrent - 1;
      }, 1000);
    },
  },
};
