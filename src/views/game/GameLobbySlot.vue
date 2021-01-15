<template>
  <div class="game-lobby">
    <component :is="GameJackpot" :jackpot="jackpot" />
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
      :isShowLike="true"
      @submit-search="submitSearch"
      @open-transfer-dialog="isShowTransferDialog = true"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    />

    <component
      :is="GameListTable"
      :gameList="gameList"
      :productCurrent="productCurrent"
      :isShowDemo="true"
      :isShowLike="true"
      @open-game="openGame"
      @change-game-fav="changeGameFav"
    />

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
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'GameList',
  mixins: [mixinGameLobby],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang', 'siteSetting', 'siteFullCss', 'userGamePointWallet']),
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
        Category: this.categoryCurrent.Lst_Category,
        Page: this.pagination.page,
        GameName: this.search.text,
        IsLike: this.search.isFav ? 1 : 0,
      };

      result = await apiGetGameLobbyGameList(requestData);
      this.gameList = result.RetObj.JsonGameList || [];
      this.pagination.count = result.RetObj.DataCnt;
    },
    async openGame(game, freePlay) {
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
</script>
