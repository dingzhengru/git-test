import { mapGetters } from 'vuex';
import mixinGameLobby from '@/mixins/gameLobby';
import {
  apiGetJackpotTotal,
  apiGetGameLobbyProduct,
  apiPostGameLobbyProduct,
  apiGetGameLobbyCategory,
  apiPostGameLobbyCategory,
  apiGetGameLobbyGameList,
  apiPostGameLobbyGameList,
  apiGetGameUrl,
} from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameLobbySlot',
  mixins: [mixinGameLobby],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang', 'siteSetting', 'siteFullCss', 'userIsLoggedIn', 'userGamePointWallet']),
    GameJackpot() {
      return () => import(`@/${this.siteSetting.components.game.GameJackpot}`);
    },
    GameProductNavigation() {
      return () => import(`@/${this.siteSetting.components.game.GameProductNavigation}`);
    },
    GameCategoryNavigation() {
      return () => import(`@/${this.siteSetting.components.game.GameCategoryNavigation}`);
    },
    GameSearchBlock() {
      return () => import(`@/${this.siteSetting.components.game.GameSearchBlock}`);
    },
    GameListTable() {
      return () => import(`@/${this.siteSetting.components.game.GameListTable}`);
    },
    GameTransferDialog() {
      return () => import(`@/${this.siteSetting.components.game.GameTransferDialog}`);
    },
  },
  data() {
    return {
      jackpot: 0,
      intervalJackpot: null,
      defaultCategoryList: [
        {
          Lst_Category: '',
          Lst_GameName: 'all',
        },
        {
          Lst_Category: 'Hot Games',
          Lst_GameName: 'hot',
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
    async getGameProductList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyProduct(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyProduct(requestData);
      }
      this.productList = result.RetObj.ProductList;
    },
    async getGameCategoryList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyCategory(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyCategory(requestData);
      }
      this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      return result;
    },
    async getGameList() {
      const requestData = {
        Tag: this.productTag,
        Category: this.categoryCurrent.Lst_Category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
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
        Category: this.categoryCurrent.Lst_Category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
      };

      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameLobbyGameList(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetGameLobbyGameList(requestData);
      }

      this.gameList = this.gameList.concat(result.RetObj.JsonGameList || []);
      this.pagination.count = result.RetObj.DataCnt;
    },
    async openGame(game, freePlay) {
      if (!this.userIsLoggedIn) {
        return window.alert(this.$t('ui.alert.notLoggedIn'));
      }

      const newWindow = window.open('/loading.html');

      const requestData = { Tag: this.productTag, Gameid: game.Lst_GameID, Freeplay: freePlay };
      const result = await apiGetGameUrl(requestData);
      if (result.Code == 200) {
        openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
      } else {
        newWindow.close();
        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
  },
  mounted() {
    if (this.userIsLoggedIn) {
      this.getJackpotTotal();
      this.intervalJackpot = window.setInterval(() => {
        this.getJackpotTotal();
      }, 20000);
    }

    this.getGameProductList();
    this.getGameCategoryList();
    this.getGameList();
  },
  beforeDestroy() {
    window.clearInterval(this.intervalJackpot);
  },
  watch: {
    lang() {
      this.getGameProductList();
      this.getGameCategoryList();
      this.getGameList();
    },
    productTag() {
      this.getGameCategoryList();
      this.getGameList();
    },
    productList() {
      //* 避免直接輸入網址，到要去站外大廳的 Product
      if (this.productCurrent.GetGameRedirectUrl) {
        window.location.replace('/');
      }
    },
  },
};
