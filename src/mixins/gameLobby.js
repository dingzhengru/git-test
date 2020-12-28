import { mapGetters } from 'vuex';
import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import { apiSetGameFav } from '@/api/game';
import { apiTransferPoint } from '@/api/transaction-transfer';

export default {
  name: 'MixinGameLobby',
  mixins: [mixinProductLinkHandler],
  computed: {
    ...mapGetters(['lang', 'userGamePointById']),
    productId() {
      return String(this.$route.params.id);
    },
    productKey() {
      return String(this.$route.params.key);
    },
    productTag() {
      return this.productId + '-' + this.productKey;
    },
    productCategory() {
      return this.$route.query.category || '';
    },
    productCurrent() {
      return this.productList.find(item => item.Lst_Proxy_Product_Key == this.productKey) || {};
    },
    categoryCurrent() {
      return this.categoryList.find(item => item.Lst_Category == this.productCategory) || {};
    },
    productPointCurrent() {
      return this.userGamePointById(this.productId);
    },
  },
  data() {
    return {
      productList: [],
      categoryList: [],
      gameList: [],
      search: {
        text: '',
        isFav: false,
      },
      pagination: {
        page: 1,
        pagesize: 6,
        dataLength: 1,
      },
      isShowTransferDialog: false, //* 轉帳視窗
    };
  },
  methods: {
    async changeGameFav(game) {
      const requestData = {
        Add_ProductID: this.productId,
        Add_ProductKey: this.productKey,
        Add_GameID: game.Lst_GameID,
      };
      const result = await apiSetGameFav(requestData);

      if (result.Code == 200) {
        game.Lst_IsLike = !game.Lst_IsLike;
      }
    },
    async transferPoint(amount) {
      const requestData = {
        Add_Source: 9999,
        Add_Destination: this.productId,
        Add_TransferPoint: amount,
      };

      const result = await apiTransferPoint(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
        this.transferAmount = 0;
        window.alert(this.$t('alert.transferSuccess'));

        //* 開啟站外連結
        if (this.productCurrent.GetGameRedirectUrl) {
          this.handleProductLink(this.productCurrent);
          this.isShowTransferDialog = false;
          this.$router.go(-1);
        }
      }
    },
    async changeProduct(product) {
      if (product.Lst_Proxy_Product_Key == this.productCurrent.Lst_Proxy_Product_Key) {
        return;
      } else if (product.Lst_Site_Product_Status != 0) {
        window.alert(this.$t('alert.gameMaintenance'));
        return;
      }

      this.pagination.page = 1;
      this.search.text = '';

      this.$router.push({
        params: { id: product.Lst_Product_id, key: product.Lst_Proxy_Product_Key },
        query: { category: '' },
      });

      if (product.GetGameRedirectUrl) {
        //* 開啟站外大廳
        if (this.currentPointProduct.Point == 0) {
          this.isShowTransferDialog = true;
        } else {
          this.handleProductLink(this.productCurrent).finally(() => {
            this.$router.go(-1);
          });
        }

        return;
      }
    },
    changeCategory(category) {
      if (this.categoryCurrent.Lst_Category == category.Lst_Category) {
        return;
      }
      this.$router.push({ query: { category: category.Lst_Category } });
      this.pagination.page = 1;
      this.search.text = '';
      this.getGameList();
    },
    closeTransferDialog() {
      if (this.productCurrent.GetGameRedirectUrl) {
        this.$router.go(-1);
      }
      this.isShowTransferDialog = false;
    },
    submitSearch(search) {
      this.search = search;
      this.pagination.page = 1;
      this.getGameList();
    },
    changePage(page) {
      this.pagination.page = page;
      this.getGameList();
    },
  },
};
