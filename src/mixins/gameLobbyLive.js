import { mapGetters } from 'vuex';
import mixinGameLobby from '@/mixins/gameLobby';
import {
  apiGetGameUrl,
  apiGetLiveGameLobbyProduct,
  apiPostLiveGameLobbyProduct,
  apiGetLiveGameLobbyCategory,
  apiPostLiveGameLobbyCategory,
  apiGetLiveGameLobbyGameList,
  apiPostLiveGameLobbyGameList,
} from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameLobbyLive',
  mixins: [mixinGameLobby],
  computed: {
    ...mapGetters(['lang', 'siteSetting', 'userIsLoggedIn', 'userGamePointWallet']),
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
    LiveGameEnterDialog() {
      return () => import(`@/${this.siteSetting.components.game.LiveGameEnterDialog}`);
    },
    GameTransferDialog() {
      return () => import(`@/${this.siteSetting.components.game.GameTransferDialog}`);
    },
  },
  data() {
    return {
      defaultCategoryList: [
        {
          Lst_Category: '',
          Lst_GameName: 'all',
        },
      ],
      game: {}, //* 現在選取的遊戲，因真人遊戲是兩階段開啟遊戲的
      guid: '', //* 真人遊戲會用到的 guid，於 getGameCategoryList 取得
      gameLimitBetList: [], //* 真人遊戲的範本列表
      isShowLiveGameEnterDialog: false, //* 真人遊戲開遊戲的列表
    };
  },
  methods: {
    async getGameProductList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostLiveGameLobbyProduct(requestData);
      } else {
        result = await apiGetLiveGameLobbyProduct(requestData);
      }
      this.productList = result.RetObj.ProductList;
    },
    async getGameCategoryList() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostLiveGameLobbyCategory(requestData);
      } else {
        result = await apiGetLiveGameLobbyCategory(requestData);
      }
      this.guid = result.RetObj.H3GUID;
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
        H3GUID: this.guid,
      };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostLiveGameLobbyGameList(requestData);
      } else {
        result = await apiGetLiveGameLobbyGameList(requestData);
      }
      this.gameList = result.RetObj.JsonGameList || [];
      this.gameLimitBetList = result.RetObj.GameLimitBet;
      this.pagination.count = result.RetObj.DataCnt;
    },
    async getGameListScrollBottom() {
      if (!this.guid) {
        return;
      }

      const requestData = {
        Tag: this.productTag,
        Category: this.categoryCurrent.Lst_Category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
        H3GUID: this.guid,
      };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostLiveGameLobbyGameList(requestData);
      } else {
        result = await apiGetLiveGameLobbyGameList(requestData);
      }
      this.gameList = this.gameList.concat(result.RetObj.JsonGameList || []);
      this.gameLimitBetList = result.RetObj.GameLimitBet;
      this.pagination.count = result.RetObj.DataCnt;
    },
    async openGame(game) {
      //* 因應真人遊戲兩階段開遊戲，這樣才知道現在的遊戲是甚麼
      this.game = game;
      this.isShowLiveGameEnterDialog = true;
    },
    async openLiveGame(templatesId, order) {
      const requestData = {
        Tag: this.productTag,
        Gameid: this.game.Lst_GameID,
        Freeplay: 0,
        Template: templatesId,
        LibOrder: order,
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
    await this.getGameCategoryList(); //* 真人遊戲需先從此取得 guid，才能取得遊戲列表
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
