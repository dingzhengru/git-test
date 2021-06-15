import { mapGetters } from 'vuex';
import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import {
  apiGetGameUrl,
  apiGetGameLobbyProduct,
  apiPostGameLobbyProduct,
  apiGetLiveGameLobbyProduct,
  apiPostLiveGameLobbyProduct,
  apiGetFightLobby,
  apiPostFightLobby,
  apiGetGameLobbyCategory,
  apiPostGameLobbyCategory,
  apiGetGameLobbyGameList,
  apiPostGameLobbyGameList,
  apiSetGameFav,
  apiGetJackpotTotal,
  apiGetGameListFav,
} from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'MixinGameLobby',
  mixins: [mixinProductLinkHandler],
  computed: {
    ...mapGetters([
      'lang',
      'userIsLoggedIn',
      'userGamePointById',
      'siteWalletType',
      'siteIsLandscape',
      'siteIsWalletTypeNoTransfer',
    ]),
    productClassify() {
      return Number(this.$route.params.classify);
    },
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
    isProductActive() {
      return this.productCurrent.Lst_Site_Product_Status === 0;
    },
    isProductClassifyLive() {
      return this.productClassify === 1;
    },
    isProductClassifySlot() {
      return this.productClassify === 2;
    },
    isProductClassifyP2P() {
      return this.productClassify === 5;
    },
    isShowJackpot() {
      return this.userIsLoggedIn && this.isProductClassifySlot;
    },
    isShowCategory() {
      return this.isProductActive && this.productCategoryStatus === 0 && !this.isCategoryEntry;
    },
    isShowSearchBlock() {
      return this.isProductActive;
    },
    isCategoryEntry() {
      return this.productCategoryEntry === 1;
    },
    isShowSearch() {
      if (this.siteIsLandscape) {
        return !this.isCategoryEntry && this.$route.name !== 'GameLobbyFav';
      }
      return !this.isCategoryEntry;
    },
    isShowTransfer() {
      return this.userIsLoggedIn && this.siteWalletType === 1;
    },
    isShowStart() {
      return true;
    },
    isShowDemo() {
      return this.userIsLoggedIn && this.productCurrent.Lst_Site_Product_CanDemo;
    },
    isShowFav() {
      return this.userIsLoggedIn && this.isProductClassifySlot;
    },
    isChangePageScroll() {
      return !this.isCategoryEntry;
    },
    totalPage() {
      return Math.ceil(this.pagination.count / this.pagination.pagesize);
    },

    //* 橫版
    isProductFav() {
      return this.$route.name === 'GameLobbyFav';
    },
    isShowProductFav() {
      return this.userIsLoggedIn;
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
        count: 1,
      },
      // isShowTransferDialog: false, //* 轉帳視窗

      productCategoryStatus: null, //* 是否顯示 Category (0啟用10維護20未啟用30即將推出40關閉50產品下架)
      productCategoryEntry: null, //* 是否以類別進入遊戲大廳 (0: 不是類別,1:是類別)

      //* 電子大廳
      jackpot: 0,
      intervalJackpot: null,

      defaultCategoryListLive: [{ Lst_Category: '', Lst_GameName: 'all' }],
      defaultCategoryListSlot: [
        {
          Lst_Category: '',
          Lst_GameName: 'game.category.all',
        },
        {
          Lst_Category: 'Hot Games',
          Lst_GameName: 'game.category.hot',
        },
      ],
    };
  },
  methods: {
    async getJackpotTotal() {
      const requestData = { Tag: this.productTag };
      const result = await apiGetJackpotTotal(requestData);
      if (result.Code == 200) {
        this.jackpot = result.RetObj;
      }
    },
    async changeGameFav(game) {
      const requestData = {
        Add_ProductID: game.Lst_ProductID || this.productId,
        Add_ProductKey: game.Lst_ProductKey || this.productKey,
        Add_GameID: game.Lst_GameID,
      };
      const result = await apiSetGameFav(requestData);

      if (result.Code == 200) {
        game.Lst_IsLike = !game.Lst_IsLike;

        if (this.isProductFav) {
          this.getGameListFav();
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
        name: 'GameLobby',
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
    async getGameProductList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        if (this.isProductClassifyLive) {
          result = await apiPostLiveGameLobbyProduct(requestData);
        } else if (this.isProductClassifySlot) {
          result = await apiPostGameLobbyProduct(requestData);
        } else if (this.isProductClassifyP2P) {
          result = await apiPostFightLobby(requestData);
        }
      } else {
        requestData.Lang = this.lang;
        if (this.isProductClassifyLive) {
          result = await apiGetLiveGameLobbyProduct(requestData);
        } else if (this.isProductClassifySlot) {
          result = await apiGetGameLobbyProduct(requestData);
        } else if (this.isProductClassifyP2P) {
          result = await apiGetFightLobby(requestData);
        }
      }
      this.productList = result.RetObj.ProductList;
    },
    async getGameCategoryList() {
      if (this.isProductFav) {
        return;
      }

      const requestData = { Tag: this.productTag, GameClassify: this.productClassify };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyCategory(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyCategory(requestData);
      }

      if (this.isProductClassifyLive || this.isProductClassifyP2P) {
        this.categoryList = this.defaultCategoryListLive.concat(result.RetObj.gameCategoryList);
      } else if (this.isProductClassifySlot) {
        this.categoryList = this.defaultCategoryListSlot.concat(result.RetObj.gameCategoryList);
      }

      this.productCategoryStatus = result.RetObj.ProductStatus;
      this.productCategoryEntry = result.RetObj.ProductEntry;
      return result;
    },
    async getGameList(isScroll = false) {
      if (this.isProductFav) {
        this.getGameListFav();
        return;
      }

      const requestData = {
        Tag: this.productTag,
        Category: this.categoryCurrent.Lst_Category || '',
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
        GameClassify: this.productClassify,
        Entrance: this.productCategoryEntry,
      };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyGameList(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyGameList(requestData);
      }

      if (isScroll) {
        this.gameList = this.gameList.concat(result.RetObj.JsonGameList || []);
      } else {
        this.gameList = result.RetObj.JsonGameList || [];
      }

      this.pagination.count = result.RetObj.DataCnt;
      this.pagination.pagesize = result.RetObj.PageSize;
    },
    async getGameListFav() {
      const requestData = { Page: this.pagination.page };
      const result = await apiGetGameListFav(requestData);
      // this.gameList = result.RetObj.FavoritesList || [];
      this.gameList = this.gameList.concat(result.RetObj.FavoritesList);
      this.pagination.count = result.RetObj.DataCnt;
      this.pagination.pagesize = result.RetObj.PageSize;
    },
    async openGame(game) {
      if (!this.userIsLoggedIn) {
        if (this.siteIsLandscape) {
          return this.$store.dispatch('openModalAuth');
        }
        return this.$router.push({ name: 'Login' });
      }
      const requestData = {
        Tag: game.Tag || this.productTag,
        Gameid: game.Lst_GameID,
        Freeplay: 0,
        GameClassify: this.productClassify,
      };

      const newWindow = window.open('/loading.html');

      const result = await apiGetGameUrl(requestData);

      if (result.Code == 200) {
        if (this.siteIsWalletTypeNoTransfer) {
          //* 免轉錢包的話，要更新錢包、於新視窗顯示轉移訊息

          if (result.RetObj.GameSitePoints.length > 0) {
            this.$store.commit('user/setPointInfo', result.RetObj);
          }

          if (result.RetObj.MsgString) {
            newWindow.alert(result.RetObj.MsgString);
          }
        }

        openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
      } else {
        newWindow.close();
        window.setTimeout(() => window.alert(result.ErrMsg), 500);
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
    changePageScrollBottom() {
      if (this.pagination.page >= this.totalPage) {
        return;
      }
      this.pagination.page = this.pagination.page + 1;
      this.getGameList(true);
    },
  },
  async mounted() {
    if (this.isShowJackpot && !this.siteIsLandscape) {
      this.getJackpotTotal();
      this.intervalJackpot = window.setInterval(() => {
        this.getJackpotTotal();
      }, 20000);
    }

    this.getGameProductList();
    await this.getGameCategoryList();
    this.getGameList();
  },
  watch: {
    async lang() {
      this.getGameProductList();
      await this.getGameCategoryList();
      this.getGameList();
    },
    async productTag() {
      await this.getGameCategoryList();
      this.getGameList();
    },
  },
  beforeDestroy() {
    window.clearInterval(this.intervalJackpot);
  },
};
