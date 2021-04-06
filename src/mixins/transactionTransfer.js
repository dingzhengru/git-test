import { mapGetters } from 'vuex';
import { apiGetTransferInfo } from '@/api/transaction-transfer';
import { apiGetProductPromotionList } from '@/api/product';

export default {
  name: 'TransactionTransfer',
  computed: {
    ...mapGetters(['lang', 'userGamePointList', 'userGamePointById']),
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
      productPromotionList: [],
      from: 9999,
      to: -1,
      amount: 0,
      promotion: '',
    };
  },
  methods: {
    async getTransferInfo() {
      const result = await apiGetTransferInfo();
      this.productList = result.RetObj.Add_SourceList;
      this.productDetailList = result.RetObj.MenuMemberDetailItemList;
    },
    submitTransferPoint() {
      const requestData = {
        Add_Source: this.from,
        Add_Destination: this.to,
        Add_TransferPoint: this.amount,
        Add_ActivityID: this.promotion,
      };

      this.$store.dispatch('user/transferPoint', requestData);
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
    async to() {
      if (this.to < 0) {
        return;
      }
      this.promotion = '';

      const requestData = { Add_Destination: this.to };
      const result = await apiGetProductPromotionList(requestData);

      if (result.Code === 200) {
        this.productPromotionList = result.RetObj.ActivityList;
      }
    },
  },
};
