<template>
  <div class="game-lobby">
    <component
      :is="GameProductNavigation"
      :productList="productList"
      :productCurrent="productCurrent"
      @change-product="changeProduct"
    />
    
    <component
      :is="GameCategoryNavigation"
      :categoryList="categoryList"
      :categoryCurrent="categoryCurrent"
      @change-category="changeCategory"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    />

    <component
      :is="GameSearchBlock"
      @submit-search="submitSearch"
      @open-transfer-dialog="isShowTransferDialog = true"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    />

    <component :is="GameListTable" :gameList="gameList" :productCurrent="productCurrent" @open-game="openGame" />

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    />

    <component
      :is="GameTransferDialog"
      :wallet="userGamePointWallet"
      :currentPointProduct="productPointCurrent"
      :isShow="isShowTransferDialog"
      @submit-transfer="transferPoint"
      @close="closeTransferDialog"
      v-show="isShowTransferDialog"
    />

    <component
      :is="LiveGameEnterDialog"
      :gameLimitBetList="gameLimitBetList"
      :selectedGame="game"
      :isShow="isShowLiveGameEnterDialog"
      @open-live-game="openLiveGame"
      @close="isShowLiveGameEnterDialog = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinGameLobby from '@/mixins/gameLobby';
import {
  apiGetGameUrl,
  apiGetLiveGameLobbyProduct,
  apiGetLiveGameLobbyCategory,
  apiGetLiveGameLobbyGameList,
} from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameList',
  mixins: [mixinGameLobby],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang', 'siteSetting', 'userGamePointWallet']),
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
      result = await apiGetLiveGameLobbyProduct(requestData);
      this.productList = result.RetObj.ProductList;
      this.productList = this.productList.map(item => {
        //* 放置對應的 css
        //* 真人
        item.class = 'ui-li-supply-1190';
        return item;
      });
    },
    async getGameCategoryList() {
      let result = {};
      const requestData = { Tag: this.productTag };
      result = await apiGetLiveGameLobbyCategory(requestData);
      this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      this.guid = result.RetObj.H3GUID;
      return result;
    },
    async getGameList() {
      let result = {};
      const requestData = {
        Tag: this.productTag,
        Category: this.categoryCurrent.Lst_Category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
        H3GUID: this.guid,
      };
      result = await apiGetLiveGameLobbyGameList(requestData);
      this.gameList = result.RetObj.JsonGameList || [];
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
  },
};
</script>
