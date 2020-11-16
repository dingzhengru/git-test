<template>
  <div class="game-lobby">
    <GameJackpot :jackpot="jackpot" />
    <GameProductNavigation :productList="productList" @change-product="changeProduct" />
    <GameCategoryNavigation
      :categoryList="categoryList"
      :category="currentCategory"
      @change-category="changeCategory"
      v-if="currentProduct.Lst_Site_Product_Status == 0"
    />

    <GameSearchBlock
      :search="search"
      :isShowLike="true"
      @change-search="changeSearch"
      @submit-search-form="submitSearch"
      @open-transfer-dialog="isShowTransferDialog = true"
      v-if="currentProduct.Lst_Site_Product_Status == 0"
    />

    <GameListTable
      :gameList="gameList"
      :currentProduct="currentProduct"
      :isShowDemo="true"
      :isShowLike="true"
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
      :wallet="wallet"
      :currentPointProduct="currentPointProduct"
      @submit-transfer="transferPoint"
      @close="closeTransferDialog"
      v-show="isShowTransferDialog"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinGameLobby from '@/mixins/gameLobby';
import {
  apiGetJackpotTotal,
  apiGetGameLobbyProduct,
  apiGetGameLobbyCategory,
  apiGetGameLobbyGameList,
  apiGetGameUrl,
} from '@/api/game';
import { isIos, openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameList',
  mixins: [mixinGameLobby],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
    GameJackpot: () => import('@/components/game/GameJackpot'),
    GameProductNavigation: () => import('@/components/game/GameProductNavigation'),
    GameCategoryNavigation: () => import('@/components/game/GameCategoryNavigation'),
    GameSearchBlock: () => import('@/components/game/GameSearchBlock'),
    GameListTable: () => import('@/components/game/GameListTable'),
    GameTransferDialog: () => import('@/components/game/GameTransferDialog'),
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userGamePointList']),
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
      result = await apiGetGameLobbyProduct(requestData);
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
        } else {
          item.class = 'ui-li-supply-1190';
        }
        return item;
      });
    },
    async getGameCategoryList() {
      let result = {};
      const requestData = { Tag: this.productTag };
      result = await apiGetGameLobbyCategory(requestData);
      this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      return result;
    },
    async getGameList() {
      let result = {};
      const requestData = {
        Tag: this.productTag,
        Category: this.currentCategory,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isLike ? 1 : 0,
      };

      result = await apiGetGameLobbyGameList(requestData);
      this.gameList = result.RetObj.JsonGameList || [];
      this.pagination.dataLength = result.RetObj.DataCnt;
    },
    async openGame(game, freePlay) {
      //* 因 IOS 預設會擋非同步後開啟的視窗，所以需於送出請求前打開
      let newWindow = null;
      if (isIos()) {
        newWindow = window.open();
      }

      const requestData = { Tag: this.productTag, Gameid: game.Lst_GameID, Freeplay: freePlay };
      const result = await apiGetGameUrl(requestData);
      if (result.Code == 200) {
        openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
      } else {
        if (newWindow != null) {
          newWindow.close();
        }

        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
  },
  mounted() {
    this.getJackpotTotal();
    this.intervalJackpot = window.setInterval(() => {
      this.getJackpotTotal();
    }, 20000);

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
    productList() {
      console.log('[watch][productList]');
      //* 避免直接輸入網址，到要去站外大廳的 Product
      if (this.currentProduct.GetGameRedirectUrl) {
        window.location.replace('/');
      }
    },
  },
};
</script>
