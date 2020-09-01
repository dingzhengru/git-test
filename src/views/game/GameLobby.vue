<template>
  <div class="game-lobby">
    <GameProductNavigation :productList="productList" @change-product="changeProduct" />
    <GameCategoryNavigation
      :categoryList="categoryList"
      @change-category="changeCategory"
      v-if="currentProduct.Lst_Site_Product_Status == 0"
    />

    <GameSearchBlock
      :search="search"
      @change-search="changeSearch"
      @submit-search-form="submitSearch"
      @open-transfer-dialog="isShowTransferDialog = true"
      v-if="currentProduct.Lst_Site_Product_Status == 0"
    />

    <GameListTable
      :gameList="gameList"
      :isCurrentProductEnable="currentProduct.Lst_Site_Product_Status == 0"
      @open-game="openGame"
      @like-game="likeGame"
    />

    <AppPagination
      :length="pagination.dataLength"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
      v-if="currentProduct.Lst_Site_Product_Status == 0"
    />

    <GameTransferDialog
      :amount.sync="transferAmount"
      :wallet="wallet"
      :currentPointProduct="currentPointProduct"
      :isTransferAll.sync="isTransferAll"
      @submit-transfer="transferPoint"
      @close="isShowTransferDialog = false"
      v-if="isShowTransferDialog"
    />

    <LiveGameEnterDialog
      :gameLimitBetList="gameLimitBetList"
      :selectedGame="game"
      @open-live-game="openLiveGame"
      @close="isShowLiveGameEnterDialog = false"
      v-if="isShowLiveGameEnterDialog"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getGameRedirectUrl,
  getGameLobbyProduct,
  getGameLobbyCategory,
  getGameLobbyGameList,
  getGameUrl,
  getLiveGameLobbyProduct,
  getLiveGameLobbyCategory,
  getLiveGameLobbyGameList,
  setGameLike,
} from '@/api/game';
import { transferPoint } from '@/api/transaction-transfer';
import { getAllGamePoint } from '@/api/user';

export default {
  name: 'GameList',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
    GameProductNavigation: () => import('@/components/game/GameProductNavigation'),
    GameCategoryNavigation: () => import('@/components/game/GameCategoryNavigation'),
    GameSearchBlock: () => import('@/components/game/GameSearchBlock'),
    GameListTable: () => import('@/components/game/GameListTable'),
    LiveGameEnterDialog: () => import('@/components/game/LiveGameEnterDialog'),
    GameTransferDialog: () => import('@/components/game/GameTransferDialog'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang']),
    productTag() {
      return this.$route.params.id + '-' + this.$route.params.key;
    },
    currentProduct() {
      return this.productList.find(item => item.Lst_Proxy_Product_Key == this.$route.params.key) || {};
    },
    wallet() {
      if (this.gamePointList.length <= 0) {
        return {};
      }
      console.log(
        '[Wallet]',
        this.gamePointList.find(item => item.Product_id == 9999)
      );
      return this.gamePointList.find(item => item.Product_id == 9999) || {};
    },
    currentPointProduct() {
      if (this.gamePointList.length <= 0) {
        return {};
      }
      console.log(
        '[CurrentPointProduct]',
        this.gamePointList.find(item => item.Product_id == this.$route.params.id)
      );
      return this.gamePointList.find(item => item.Product_id == this.$route.params.id) || {};
    },
  },
  data() {
    return {
      game: {}, //* 現在選取的遊戲，因真人遊戲是兩階段開啟遊戲的
      productList: [],
      categoryList: [],
      gameList: [],
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
      defaultCategoryListLiveGame: [
        {
          Lst_Category: '',
          Lst_GameName: 'all',
        },
      ],
      search: {
        text: '',
        isLike: false,
      },
      pagination: {
        page: 1,
        pagesize: 6,
        dataLength: 1,
      },
      gamePointList: [], //* 遊戲點數列表，轉帳會用到
      isShowTransferDialog: false, //* 轉帳視窗
      guid: '', //* 真人遊戲會用到的 guid，於 getGameCategory 取得
      gameLimitBetList: [], //* 真人遊戲的範本列表
      isShowLiveGameEnterDialog: false, //* 真人遊戲開遊戲的列表
    };
  },
  methods: {
    async getGameProduct() {
      const requestData = { Tag: this.productTag };
      let result = {};
      if (this.$route.params.type == 1) {
        result = await getLiveGameLobbyProduct(requestData);
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyProduct(requestData);
      }
      console.log('[GameLobby Product]', result.RetObj.ProductList);
      this.productList = result.RetObj.ProductList;
      this.productList = this.productList.map(item => {
        //* 放置對應的 css
        if (item.Lst_Proxy_Product_Key == 1031) {
          //* RG-PNG電子
          item.class = 'ui-li-supply-1190';
        } else if (item.Lst_Proxy_Product_Key == 2602) {
          //* Mg+電子
          item.class = 'ui-li-supply-1190';
        } else if (item.Lst_Proxy_Product_Key == 2100) {
          //* DS電子
          item.class = 'ui-li-supply-1190';
        } else if (item.Lst_Proxy_Product_Key == 1034) {
          //* 皇家電子
          item.class = 'ui-li-supply-1190';
        } else if (item.Lst_Proxy_Product_Key == 2200 || item.Lst_Proxy_Product_Key == 1040) {
          //* CQ9
          item.class = 'ui-li-supply-1200';
        } else if (item.Lst_Proxy_Product_Key == 2300 || item.Lst_Proxy_Product_Key == 701) {
          //* JDB
          item.class = 'ui-li-supply-1180';
        } else if (item.Lst_Proxy_Product_Key == 2400 || item.Lst_Proxy_Product_Key == 402) {
          //* BBIN
          item.class = 'ui-li-supply-1120';
        } else if (item.Lst_Proxy_Product_Key == 1030) {
          //* 真人
          item.class = 'ui-li-supply-1190';
        } else {
          item.class = 'ui-li-supply-1190';
        }
        return item;
      });
      console.log('[GameLobby Product]', this.productList);
    },
    async getGameCategory() {
      let result = {};
      const requestData = { Tag: this.productTag };
      if (this.$route.params.type == 1) {
        result = await getLiveGameLobbyCategory(requestData);
        this.categoryList = this.defaultCategoryListLiveGame.concat(result.RetObj.gameCategoryList);
        this.guid = result.RetObj.H3GUID;
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyCategory(requestData);
        this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      }
      console.log('[GameLobby Category]', result.RetObj);
      return result;
    },
    async getGameList() {
      this.$store.commit('setIsLoading', true);
      let result = {};
      const requestData = {
        Tag: this.productTag,
        Category: this.$route.query.category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isLike ? 1 : 0,
      };
      if (this.$route.params.type == 1) {
        requestData.H3GUID = this.guid;
        result = await getLiveGameLobbyGameList(requestData);
        this.gameList = result.RetObj.JsonGameList || [];
        this.gameLimitBetList = result.RetObj.GameLimitBet;
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyGameList(requestData);
        this.gameList = result.RetObj.JsonGameList || [];
      }
      console.log('[GameLobby GameList]', result.RetObj);
      this.pagination.dataLength = result.RetObj.DataCnt;
      this.$store.commit('setIsLoading', false);
    },
    async getGameUrl(data) {
      this.$store.commit('setIsLoading', true);
      const result = await getGameUrl(data);
      console.log('[GameLobby GameUrl]', data, result);
      if (result.Code == 200) {
        window.open(result.RetObj.RedirectUrl);
      }
      this.$store.commit('setIsLoading', false);
    },
    async openGame(game, freePlay) {
      //* 因應真人遊戲兩階段開遊戲
      this.game = game;
      if (this.$route.params.type == 1) {
        this.isShowLiveGameEnterDialog = true;
      } else if (this.$route.params.type == 2) {
        this.$store.commit('setIsLoading', true);
        const requestData = { Tag: this.productTag, Gameid: game.Lst_GameID, Freeplay: freePlay };
        const result = await getGameUrl(requestData);
        console.log('[GameLobby OpenGame]', result);
        if (result.Code == 200) {
          window.open(result.RetObj.RedirectUrl);
        }
        this.$store.commit('setIsLoading', false);
      }
    },
    async openLiveGame(templatesId, order) {
      const requestData = {
        Tag: this.productTag,
        Gameid: this.game.Lst_GameID,
        Freeplay: 0,
        Template: templatesId,
        LibOrder: order,
      };
      const result = await getGameUrl(requestData);
      console.log('[OpenLiveGame]', result);

      if (result.Code == 200) {
        window.open(result.RetObj.RedirectUrl);
      }
    },
    async openGameRedirectUrl() {
      //* 打開站外連結
      const requestData = {
        Pid: this.currentProduct.Lst_Product_id,
        gameclassify: this.currentProduct.Lst_Game_Classify,
        proxypid: this.currentProduct.Lst_Proxy_Product_Key,
      };
      this.$store.commit('setIsLoading', true);
      const result = await getGameRedirectUrl(requestData);
      console.log('[OpenGameRedirectUrl]', result);
      if (result.Code == 200) {
        if (result.RetObj.iGameOpenType == 1) {
          window.open(result.RetObj.RedirectUrl);
        } else if (result.RetObj.iGameOpenType == 2) {
          const gameWindow = window.open('');
          gameWindow.document.write(result.RetObj.RedirectUrl);
        }
      }
      this.$store.commit('setIsLoading', false);
    },
    async likeGame(game) {
      const requestData = {
        Add_ProductID: this.$route.params.id,
        Add_ProductKey: this.$route.params.key,
        Add_GameID: game.Lst_GameID,
      };
      const result = await setGameLike(requestData);

      if (result.Code == 200) {
        game.Lst_IsLike = !game.Lst_IsLike;
      }

      console.log('[LikeGame]', result);
    },
    async transferPoint(amount) {
      console.log('[TransferPoint]', amount);

      const requestData = {
        Add_Source: 9999,
        Add_Destination: this.$route.params.id,
        Add_TransferPoint: amount,
      };
      this.$store.commit('setIsLoading', true);
      const result = await transferPoint(requestData);
      this.$store.commit('setIsLoading', false);

      console.log('[TransferPoint]', result);

      if (result.Code == 200) {
        this.gamePointList = result.RetObj.GameSitePoints;
        this.transferAmount = 0;
        window.alert('Transfer Successful');

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
        window.alert(this.$t('alert.game.maintenance'));
        return;
      }
      console.log('[ChangeProduct]', product);

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
          this.openGameRedirectUrl().finally(() => {
            this.$router.go(-1);
          });
        }

        return;
      } else {
        await this.getGameCategory();
        await this.getGameList();
      }
    },
    changeCategory(category) {
      if (this.$route.query.category == category) {
        return;
      }
      this.$router.push({ name: 'GameLobby', params: this.$route.params, query: { category } });
      this.pagination.page = 1;
      this.search.text = '';
      this.getGameList();
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
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/game.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        //* 取得遊戲點數列表
        getAllGamePoint().then(result => {
          this.gamePointList = result.RetObj.GameSitePoints;
          console.log('[GamePointList]', result.RetObj);
        });

        this.getGameProduct();
        await this.getGameCategory(); //* 真人遊戲需先從此取得 guid，才能取得遊戲列表
        this.getGameList();

        // this.$store.commit('setIsLoading', false);
      },
    },
    async lang() {
      this.getGameProduct();
      await this.getGameCategory();
      this.getGameList();
    },
    productList() {
      //* 避免直接輸入網址，到正在維護的 Product
      // if (this.currentProduct.Lst_Site_Product_Status != 0) {
      //   window.alert(this.$t('alert.game.maintenance'));
      //   window.location.replace('/');
      // }

      //* 避免直接輸入網址，到要去站外大廳的 Product
      if (this.currentProduct.GetGameRedirectUrl) {
        // this.$store.commit('setIsLoading', false);
        // this.$router.replace({ name: 'Home' });
        window.location.replace('/');
      }
    },
  },
};
</script>
