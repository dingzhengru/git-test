<template>
  <div class="game-lobby">
    <div class="game-lobby__supply">
      <ul class="game-lobby__supply__ul" :class="{ 'text-center': productList.length == 1 }">
        <li
          class="game-lobby__supply__ul__li"
          :class="[
            product.class,
            { 'game-lobby__supply__ul__li--active': $route.params.key == product.Lst_Proxy_Product_Key },
          ]"
          v-for="product in productList"
          :key="product.Lst_Proxy_Product_Key"
        >
          <router-link
            class="game-lobby__supply__ul__li__link"
            :to="{
              name: 'GameLobby',
              params: { id: product.Lst_Product_id, key: product.Lst_Proxy_Product_Key },
              query: { category: '' },
            }"
          >
            {{ product.Lst_Name }}
          </router-link>
        </li>
      </ul>
      <div class="game-lobby__category">
        <ul class="game-lobby__category__ul">
          <li
            class="game-lobby__category__ul__li"
            v-for="category in categoryList"
            :key="category.Lst_Category"
            :class="{ 'game-lobby__category__ul__li--active': $route.query.category == category.Lst_Category }"
          >
            <a
              class="game-lobby__category__ul__li__link"
              href="javascript:;"
              @click="changeCategory(category.Lst_Category)"
            >
              <template v-if="category.Lst_GameName == 'all' || category.Lst_GameName == 'hot'">
                {{ $t(`game.category.${category.Lst_GameName}`) }}
              </template>

              <template v-else>
                {{ category.Lst_GameName }}
              </template>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="game-lobby__inquire">
      <div class="game-lobby__inquire__input-div">
        <input
          class="game-lobby__inquire__search"
          type="search"
          v-model="search.text"
          :placeholder="$t('game.placeholder.search')"
        />
        <button class="game-lobby__inquire__search-icon"></button>
      </div>
      <input class="game-lobby__inquire__favorites" type="submit" title="My Favorites" />
      <button class="game-lobby__inquire__button--transfer-now" href="javascript:;">
        {{ $t('game.button.transferNow') }}
      </button>
    </div>
    <table class="game-lobby__table">
      <tbody>
        <tr
          class="game-lobby__table__tr"
          v-for="(game, index) in gameList"
          :key="game.Lst_GameID + index"
          @click="openGame(game, 0)"
        >
          <td class="game-lobby__table__tr__td-1st">
            <img class="game-lobby__table__tr__td__img" :src="game.imagePath" />
          </td>
          <td class="game-lobby__table__tr__td-2nd">{{ game.Lst_GameName }}</td>
          <td class="game-lobby__table__tr__td-3rd">
            <a href="javascript:;" class="game-lobby__table__tr__td__link--start">
              {{ $t('game.link.play') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby__table__tr__td__link--freeplay"
              @click.capture.stop="openGame(game, 0)"
              v-if="$route.params.type == 2"
            >
              {{ $t('game.link.free') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby__table__tr__td__link--favorites"
              :class="{ active: game.Lst_IsLike }"
              @click.capture.stop="likeGame(game)"
              v-if="$route.params.type == 2"
            >
              {{ $t('game.link.fav') }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <AppPagination
      :length="pagination.dataLength"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />

    <div class="ui-overlay" v-if="isShowLiveGameEnterDialog"></div>
    <div class="enter-dialog-container" v-if="isShowLiveGameEnterDialog" @click="isShowLiveGameEnterDialog = false">
      <div class="enter-dialog">
        <div class="ui-box-close"></div>

        <template v-for="(gameLimit, index) in gameLimitBetList">
          <button
            class="enter-dialog__button ui-btn"
            :key="index"
            @click.capture.stop="openLiveGame(gameLimit.Lst_TemplatesId, index + 1)"
            v-if="gameLimit.Lst_ProductGameId == game.Lst_Category"
          >
            <template v-if="gameLimit.Lst_TemplatesId == 0">
              {{ $t('game.button.enterGame') }}
            </template>
            <template v-else>
              {{ `${gameLimit.Lst_LimitMin}-${gameLimit.Lst_LimitMax}` }}
            </template>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  getGameLobbyProduct,
  getGameLobbyCategory,
  getGameLobbyGameList,
  getGameUrl,
  getLiveGameLobbyProduct,
  getLiveGameLobbyCategory,
  getLiveGameLobbyGameList,
  setGameLike,
} from '@/api/game';

export default {
  name: 'GameList',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    productTag() {
      return this.$route.params.id + '-' + this.$route.params.key;
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
      },
      pagination: {
        page: 1,
        pagesize: 6,
        dataLength: 1,
      },
      guid: '', //* 真人遊戲會用到的 guid，於 getGameCategory 取得
      gameLimitBetList: [], //* 真人遊戲的範本列表
      isShowLiveGameEnterDialog: false, //* 真人遊戲開遊戲的列表
    };
  },
  async mounted() {
    /*
     * API: 電子遊戲 & 真人遊戲，兩者的方法是分開的
     * 用 this.$route.params.type 來判斷，1: 真人 2: 電子
     */
    const requestDataGetGameLobbyProduct = { Tag: this.productTag };
    this.getGameProduct(requestDataGetGameLobbyProduct);
  },
  methods: {
    async getGameProduct(data) {
      let result = {};
      if (this.$route.params.type == 1) {
        result = await getLiveGameLobbyProduct(data);
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyProduct(data);
      }
      console.log('[GameLobby Product]', result.RetObj.ProductList);
      this.productList = result.RetObj.ProductList;
      this.productList = this.productList
        .filter(item => {
          //* 篩掉舊的
          const oldProductList = [701, 402, 1040];
          return !oldProductList.includes(item.Lst_Proxy_Product_Key);
        })
        .map(item => {
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
          } else if (item.Lst_Proxy_Product_Key == 2200) {
            //* CQ9
            item.class = 'ui-li-supply-1200';
          } else if (item.Lst_Proxy_Product_Key == 2300) {
            //* JDB
            item.class = 'ui-li-supply-1180';
          } else if (item.Lst_Proxy_Product_Key == 2400) {
            //* BBIN
            item.class = 'ui-li-supply-1120';
          } else if (item.Lst_Proxy_Product_Key == 1030) {
            //* 真人
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
      console.log('openGame', game, freePlay);
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
    changeCategory(category) {
      if (this.$route.query.category == category) {
        return;
      }
      this.$router.push({ name: 'GameLobby', params: this.$route.params, query: { category } });
      this.pagination.page = 1;
      this.getGameList();
    },
    changePage(page) {
      this.pagination.page = page;
      this.getGameList();
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/game.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    '$route.params.key': {
      immediate: true,
      async handler() {
        //* 這裡是切換遊戲分類時觸發

        this.pagination.page = 1;

        await this.getGameCategory();

        this.getGameList();
      },
    },
  },
};
</script>

<style>
.game-lobby__supply {
  height: 182px;
  overflow: hidden;
  position: relative;
}
.game-lobby__supply__ul {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 11px 0;
  white-space: nowrap;
  overflow: auto;
}

.game-lobby__supply__ul__li {
  display: inline-block;
  letter-spacing: normal;
  word-spacing: normal;
  background-position: center top;
  background-repeat: no-repeat;
  margin: 0 21px;
}

.game-lobby__supply__ul__li--active > .game-lobby__supply__ul__li__link {
  color: #ffbebc;
  text-shadow: 0px 0px 8px #ff1c59;
}

.game-lobby__supply__ul__li__link {
  min-width: 74px;
  display: block;
  padding: 56px 0 0 0;
  font-size: 22px;
  color: #92a0c0;
  text-align: center;
}

.game-lobby__category__ul {
  width: 100%;
  margin: 0;
  padding: 0 15px;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.game-lobby__category__ul__li {
  font-size: 24px;
  white-space: nowrap;
  display: inline-block;
}

.game-lobby__category__ul__li:last-child {
  padding-right: 20px;
}

.game-lobby__category__ul__li__link {
  display: block;
  padding: 0 15px;
  line-height: 74px;
}

.game-lobby__inquire {
  position: relative;
}

.game-lobby__inquire__input-div {
  display: inline-block;
  position: relative;
}

.game-lobby__inquire__search {
  width: 302px;
  background-size: cover;
  -webkit-background-size: cover;
  background-attachment: fixed;
  height: 59px;
  margin: 25px 0 31px 34px;
  font-size: 24px;
  border: 0;
  text-indent: 20px;
  outline: none;
}

.game-lobby__inquire__search-icon {
  top: 19px;
  /* left: 280px; */
  right: 0;
  position: absolute;
  width: 53px;
  height: 71px;
  border: 0;
}

.game-lobby__inquire__favorites {
  width: 85px;
  height: 65px;
  margin: 0 0 0 85px;
  font-size: 24px;
  text-indent: -9999px;
  border: 0;
  outline: none;
}

.game-lobby__inquire__button--transfer-now {
  display: inline-block;
  width: 187px;
  height: 65px;
  /* font-size: 21px; */
  padding: 10px 10px 10px 48px;
  margin: 22px 0 0 10px;
  color: #fedebe;
  vertical-align: top;
  background: url(~@/assets/common/imgs/ui/btn_transferNow.png) left center no-repeat;
  border: none;
}

.game-lobby__table {
  width: 100%;
  letter-spacing: -1px;
  background-color: #181b23;
}

.game-lobby__table__tr__td-1st {
  max-width: 152px;
  padding: 0 10px;
  overflow: hidden;
}

.game-lobby__table__tr__td__img {
  width: 100%;
}

.game-lobby__table__tr__td-2nd {
  width: auto;
  min-width: 208px;
  padding: 0 5px;
  font-size: 24px;
  color: #92a0c0;
  font-weight: bold;
  vertical-align: middle;
  word-break: break-word;
}

.game-lobby__table__tr__td-3rd {
  width: auto;
  padding: 10px 0;
  white-space: nowrap;
  text-align: center;
}

.game-lobby__table__tr__td-3rd > a {
  display: inline-block;
  width: 90px;
  height: 83px;
  color: #fff;
  font-size: 21px;
  line-height: 205px;
  margin: 0 10px;
  background-repeat: no-repeat;
}

/**
 ** 真人遊戲的開遊戲視窗
*/

.enter-dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
}

.enter-dialog {
  width: 576px;
  min-height: 189px;
  max-height: 50%;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  border: 2px solid #c1ae71;
  overflow: auto;
}

.enter-dialog__button {
  margin-top: 30px;
}

.enter-dialog__button:first-of-type {
  margin-top: 100px;
}

.enter-dialog__button:last-of-type {
  margin-bottom: 100px;
}

/*
 * 語系
*/

.en-us .game-lobby__inquire__button--transfer-now {
  font-size: 1.5rem;
}

.th-th .game-lobby__inquire__button--transfer-now {
  font-size: 1.5rem;
}

.zh-cn .game-lobby__inquire__button--transfer-now {
  font-size: 2.4rem;
}
</style>
