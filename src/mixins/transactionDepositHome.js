import { mapGetters } from 'vuex';
import { apiGetDepositInfo } from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositHome',
  computed: {
    ...mapGetters(['lang', 'siteIsShowDepositNotice', 'siteDepositNoticeUrl']),
    isDepositInfoLoaded() {
      return this.$isObjEmpty(this.depositInfo) === false;
    },
  },
  data() {
    return {
      depositInfo: {},
      isShowDepositNotice: false,
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

    //* 是否顯示 DepositNotice
    this.isShowDepositNotice = this.siteIsShowDepositNotice;
  },
  watch: {
    lang() {
      this.getDepositInfo();
    },
  },
};
