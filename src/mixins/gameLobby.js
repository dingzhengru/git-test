import { mapGetters } from 'vuex';

import { apiGetGameRedirectUrl, apiSetGameLike } from '@/api/game';
import { apiTransferPoint } from '@/api/transaction-transfer';
import { isIos, openNewWindowURL, openNewWindowHTML } from '@/utils/device';

export default {
  name: 'GameList',
  computed: {
    ...mapGetters(['lang', 'userGamePointList']),
    productTag() {
      return this.$route.params.id + '-' + this.$route.params.key;
    },
    currentProduct() {
      return this.productList.find(item => item.Lst_Proxy_Product_Key == this.$route.params.key) || {};
    },
    currentCategory() {
      return this.$route.query.category;
    },
    wallet() {
      if (this.userGamePointList && this.userGamePointList.length > 0) {
        return this.userGamePointList.find(item => item.Product_id == 9999) || {};
      }
      return {};
    },
    currentPointProduct() {
      if (this.userGamePointList && this.userGamePointList.length > 0) {
        return this.userGamePointList.find(item => item.Product_id == this.$route.params.id) || {};
      }
      return {};
    },
  },
  data() {
    return {
      productList: [],
      categoryList: [],
      gameList: [],
      search: {
        text: '',
        isLike: false,
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
    async openGameRedirectUrl() {
      //* 打開站外連結
      const requestData = {
        Pid: this.currentProduct.Lst_Product_id,
        gameclassify: this.currentProduct.Lst_Game_Classify,
        proxypid: this.currentProduct.Lst_Proxy_Product_Key,
      };

      let newWindow = null;
      if (isIos()) {
        newWindow = window.open();
      }

      const result = await apiGetGameRedirectUrl(requestData);
      if (result.Code == 200) {
        if (result.RetObj.iGameOpenType == 1) {
          openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
        } else if (result.RetObj.iGameOpenType == 2) {
          openNewWindowHTML(newWindow, result.RetObj.RedirectUrl, this.currentProduct.Lst_Name);
        }
      } else {
        if (newWindow != null) {
          newWindow.close();
        }

        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
    async likeGame(game) {
      const requestData = {
        Add_ProductID: this.$route.params.id,
        Add_ProductKey: this.$route.params.key,
        Add_GameID: game.Lst_GameID,
      };
      const result = await apiSetGameLike(requestData);

      if (result.Code == 200) {
        game.Lst_IsLike = !game.Lst_IsLike;
      }
    },
    async transferPoint(amount) {
      const requestData = {
        Add_Source: 9999,
        Add_Destination: this.$route.params.id,
        Add_TransferPoint: amount,
      };

      const result = await apiTransferPoint(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
        this.transferAmount = 0;
        window.alert(this.$t('alert.transferSuccess'));

        //* 開啟站外連結
        if (this.currentProduct.GetGameRedirectUrl) {
          this.openGameRedirectUrl();
          this.isShowTransferDialog = false;
          this.$router.go(-1);
        }
      }
    },
    async changeProduct(product) {
      if (product.Lst_Proxy_Product_Key == this.currentProduct.Lst_Proxy_Product_Key) {
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
          this.openGameRedirectUrl().finally(() => {
            this.$router.go(-1);
          });
        }

        return;
      } else {
        await this.getGameCategoryList();
        await this.getGameList();
      }
    },
    changeCategory(category) {
      if (this.currentCategory == category) {
        return;
      }
      this.$router.push({ params: this.$route.params, query: { category } });
      this.pagination.page = 1;
      this.search.text = '';
      this.getGameList();
    },
    closeTransferDialog() {
      if (this.currentProduct.GetGameRedirectUrl) {
        this.$router.go(-1);
      }
      this.isShowTransferDialog = false;
    },
    submitSearch() {
      this.pagination.page = 1;
      this.getGameList();
    },
    changeSearch(search) {
      this.search = search;
    },
    changePage(page) {
      this.pagination.page = page;
      this.getGameList();
    },
  },
};
