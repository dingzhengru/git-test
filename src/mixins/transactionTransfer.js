import { mapGetters } from 'vuex';
import { apiGetTransferInfo, apiTransferPoint, apiTransferAllGamePointToMain } from '@/api/transaction-transfer';

export default {
  name: 'TransactionTransfer',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userGamePointList', 'userGamePointById']),
    fromList() {
      return this.productList;
    },
    toList() {
      if (this.from == 9999) {
        return this.productList.filter(item => item.Product_id != 9999);
      } else {
        return this.productList.filter(item => item.Product_id == 9999);
      }
    },
    productPointCurrent() {
      return this.userGamePointById(this.from);
    },
    currentPoint() {
      return Math.floor(this.productPointCurrent.Point) || 0;
    },
  },
  data() {
    return {
      productList: [],
      productDetailList: [],
      from: 9999,
      to: -1,
      amount: 0,
    };
  },
  methods: {
    async getTransferInfo() {
      const result = await apiGetTransferInfo();
      this.productList = result.RetObj.Add_SourceList;
      this.productDetailList = result.RetObj.MenuMemberDetailItemList;
    },
    async submitTransferPoint() {
      const requestData = { Add_Source: this.from, Add_Destination: this.to, Add_TransferPoint: this.amount };
      const result = await apiTransferPoint(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
        window.alert(this.$t('alert.transferSuccess'));
      }
    },
    async transferToMain() {
      const result = await apiTransferAllGamePointToMain();
      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
        window.alert(result.RetObj.MsgString);
      }
    },
    rangeError(type, msg) {
      //* 參考 https://nightcatsama.github.io/vue-slider-component/#/zh-CN/advanced/input
      const ERROR_TYPE = {
        VALUE: 1,
        INTERVAL: 2,
        MIN: 3,
        MAX: 4,
        ORDER: 5,
      };
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      return msg;
    },
    changeAmount() {
      if (this.amount > this.currentPoint) {
        this.amount = this.currentPoint;
      }
    },
    switchProduct() {
      if (this.from < 0 || this.to < 0) {
        return;
      }
      const from = this.from;
      const to = this.to;
      this.from = to;
      this.to = from;
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-transfer.scss`);

    this.getTransferInfo();
  },
  watch: {
    lang() {
      this.getTransferInfo();
    },
    userGamePointList() {
      this.amount = this.currentPoint;
    },
    from: {
      immediate: true,
      handler() {
        this.amount = this.currentPoint;

        if (this.from != 9999) {
          //* 當 from 選擇非錢包時，to 列表會只剩下錢包
          this.to = 9999;
        } else if (this.from == 9999 && this.to == 9999) {
          //* 當 from 選錢包，但 to 也是錢包時
          this.to = -1;
        }
      },
    },
  },
};
