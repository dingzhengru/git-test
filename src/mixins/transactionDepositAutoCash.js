import { mapGetters } from 'vuex';
// import { apiDepositThirdParty } from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositThirdParty',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['lang']),
    amountMin() {
      return this.depositInfo.DepositDownlimit;
    },
    amountMax() {
      return this.depositInfo.DepositUplimit;
    },
  },
  data() {
    return {
      promotionList: [],

      dispensingBank: {},
      amount: 0,
      promotion: '-1',
    };
  },
  methods: {
    submitDepositAutoCash() {},
    inputAmount() {
      if (this.amount < this.amountMin) {
        this.amount = this.amountMin;
      } else if (this.amount > this.amountMax) {
        this.amount = this.amountMax;
      }
    },
    resetForm() {
      this.dispensingBank = {};
      this.amount = 0;
      this.promotion = '-1';
    },
  },
  mounted() {},
};
