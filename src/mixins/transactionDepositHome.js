import { mapGetters } from 'vuex';
import { apiGetDepositInfo } from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositHome',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      depositInfo: {},
    };
  },
  methods: {
    async getDepositInfo() {
      const result = await apiGetDepositInfo();

      if (result.Code === 200) {
        this.depositInfo = result.RetObj;
      }
    },
  },
  mounted() {
    this.getDepositInfo();
  },
  watch: {
    lang() {
      this.getDepositInfo();
    },
  },
};
