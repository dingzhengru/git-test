import { mapGetters } from 'vuex';
import mixinGameLobby from '@/mixins/gameLobby';
import {
  apiGetGameUrl,
  apiGetLiveGameLobbyProduct,
  apiPostLiveGameLobbyProduct,
  apiGetGameLobbyCategory,
  apiPostGameLobbyCategory,
  apiGetGameLobbyGameList,
  apiPostGameLobbyGameList,
} from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameLobbyLive',
  mixins: [mixinGameLobby],
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    productLiveRCG() {
      return this.productList.find(item => item.Lst_Product_id === 1360);
    },
    productLiveEVO() {
      return this.productList.find(item => item.Lst_Product_id === 1400);
    },
  },
  data() {
    return {
      //* 以類別進入大廳會使用到的參數 (真人、戰棋)
      productCategoryStatus: null,
      productCategoryEntry: null,

      defaultCategoryList: [
        {
          Lst_Category: '',
          Lst_GameName: 'all',
        },
      ],
    };
  },
  methods: {
    async getGameProductList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostLiveGameLobbyProduct(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetLiveGameLobbyProduct(requestData);
      }
      this.productList = result.RetObj.ProductList;
    },
    async getGameCategoryList() {
      const requestData = { Tag: this.productTag, GameClassify: 1 };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyCategory(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyCategory(requestData);
      }
      this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      this.productCategoryStatus = result.RetObj.ProductStatus;
      this.productCategoryEntry = result.RetObj.ProductEntry;
      return result;
    },
    async getGameList() {
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
      this.gameList = result.RetObj.JsonGameList || [];
      this.pagination.count = result.RetObj.DataCnt;
    },
    async getGameListScrollBottom() {
      const requestData = {
        Tag: this.productTag,
        Category: this.categoryCurrent.Lst_Category || '',
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
        GameClassify: this.productClassify,
      };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyGameList(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyGameList(requestData);
      }
      this.gameList = this.gameList.concat(result.RetObj.JsonGameList || []);
      this.gameLimitBetList = result.RetObj.GameLimitBet;
      this.pagination.count = result.RetObj.DataCnt;
    },
    async openGame(game) {
      if (!this.userIsLoggedIn) {
        return this.$router.push({ name: 'Login' });
      }
      const requestData = {
        Tag: this.productTag,
        Gameid: game.Lst_GameID,
        Freeplay: 0,
        GameClassify: this.productClassify,
      };

      const newWindow = window.open('/loading.html');

      const result = await apiGetGameUrl(requestData);

      if (result.Code == 200) {
        openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
      } else {
        newWindow.close();
        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
  },
  async mounted() {
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
};
