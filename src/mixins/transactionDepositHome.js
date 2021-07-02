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

      navList: [],
      navListOrigin: [
        {
          route: 'TransactionDepositBase',
          text: 'transaction.deposit.nav.base',
          params: {},
        },
      ],
    };
  },
  methods: {
    async getDepositInfo() {
      const result = await apiGetDepositInfo();

      if (result.Code === 200) {
        this.depositInfo = result.RetObj;

        this.updateNavList();

        //* 若 AutoCash 開啟
        if (this.$env === 'development') {
          if (this.depositInfo.AutoCashCount > 0) {
            return this.$router.push({ name: 'TransactionDepositAutoCash' }).catch(() => {});
          }
        }
      }
    },
    updateNavList() {
      this.navList = [...this.navListOrigin];
      this.depositInfo.paymentSelect.forEach(item => {
        this.navList.push({
          route: 'TransactionDepositThirdPartyPayment',
          params: { payment: item.Value },
          text: item.Text,
        });
      });
      if (this.$env === 'development') {
        if (this.depositInfo.AutoCashCount > 0) {
          this.navList.push({
            route: 'TransactionDepositAutoCash',
            text: 'transaction.deposit.nav.autoCash',
            params: {},
          });
        }
      }
    },
    navIsActive(nav) {
      if (this.$isObjEmpty(nav.params)) {
        return this.$route.name === nav.route;
      }

      const payment = nav.params.payment;
      return this.$route.name === nav.route && this.$route.params.payment === payment;
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
