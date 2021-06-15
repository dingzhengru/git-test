import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import { mapGetters } from 'vuex';
import { apiGetProductPromotionList } from '@/api/product';
export default {
  name: 'modalTransfer',
  mixins: [mixinProductLinkHandler],
  computed: {
    ...mapGetters([
      'modalTransferProduct',
      'modalTransferIsShow',
      'userIsLoggedIn',
      'userGamePointWallet',
      'userGamePointById',
      'productById',
    ]),
    productPointCurrent() {
      console.log(this.modalTransferProduct);
      if (this.$isObjEmpty(this.modalTransferProduct)) {
        return {};
      }
      return this.userGamePointById(this.modalTransferProduct.Product_id);
    },
    productCurrent() {
      if (this.$isObjEmpty(this.modalTransferProduct)) {
        return {};
      }
      return this.productById(this.modalTransferProduct.Product_id);
    },
    walletPoint() {
      return Math.floor(this.userGamePointWallet.Point);
    },
  },
  data() {
    return {
      promotionList: [],
      amount: 0,
      promotion: '',
      isTransferAll: true,
    };
  },
  methods: {
    async submitTransfer() {
      const requestData = {
        Add_Source: this.userGamePointWallet.Product_id,
        Add_Destination: this.productPointCurrent.Product_id,
        Add_TransferPoint: this.isTransferAll ? this.walletPoint : this.amount,
        Add_ActivityID: this.promotion,
      };

      const result = await this.$store.dispatch('user/transferPoint', requestData);

      if (result.Code === 200) {
        this.amount = 0;

        //* 開啟站外連結
        // if (this.productCurrent.GetGameRedirectUrl) {
        //   this.handleProductLink(this.productCurrent);
        //   this.closeModalTransfer();
        //   this.$router.go(-1);
        // }
      }
    },
    focusAmount() {
      if (this.amount <= 0) {
        this.amount = '';
      }
    },
    blurAmount() {
      if (this.amount == '') {
        this.amount = 0;
      }
    },
    changeAmount() {
      if (this.amount > this.walletPoint) {
        this.amount = this.walletPoint;
      } else if (this.amount < 1) {
        this.amount = 1;
      }
    },
    switchTransferAll(isTransferAll) {
      this.isTransferAll = isTransferAll;
    },
    resetForm() {
      this.promotionList = [];
      this.amount = 0;
      this.promotion = '';
    },
    closeModalTransfer() {
      this.$store.dispatch('closeModalTransfer');
      this.resetForm();
    },
  },
  async mounted() {
    const requestData = { Add_Destination: [this.productPointCurrent.Product_id] };
    const result = await apiGetProductPromotionList(requestData);

    if (result.Code === 200) {
      this.promotionList = result.RetObj.ActivityList;
    }
  },
};
