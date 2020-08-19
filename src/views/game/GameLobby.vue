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
            @click="getGameList({ Tag: productTag, Category: category.Lst_Category })"
          >
            <router-link
              class="game-lobby__category__ul__li__link"
              :to="{
                name: 'GameLobby',
                params: { id: $route.params.id, key: $route.params.key },
                query: { category: category.Lst_Category },
              }"
            >
              <template v-if="category.Lst_GameName == 'all' || category.Lst_GameName == 'hot'">
                {{ $t(`game.category.${category.Lst_GameName}`) }}
              </template>

              <template v-else>
                {{ category.Lst_GameName }}
              </template>
            </router-link>
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
          v-for="game in pageData"
          :key="game.Lst_GameID"
          @click="getGameUrl({ Tag: productTag, Gameid: game.Lst_GameID, Freeplay: '0' })"
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
              @click.capture.stop="getGameUrl({ Tag: productTag, Gameid: game.Lst_GameID, Freeplay: '1' })"
            >
              {{ $t('game.link.free') }}
            </a>
            <a href="javascript:;" class="game-lobby__table__tr__td__link--favorites">{{ $t('game.link.fav') }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <AppPagination
      :length="gameList.length"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
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
    searchData() {
      if (!this.search.text) {
        return this.gameList;
      }
      return this.gameList.filter(item => item.name.toLowerCase().includes(this.search.text.toLowerCase()));
    },
    pageData() {
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.searchData.slice(startAt, endAt) || [];
    },
  },
  data() {
    return {
      guid: '',
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
      },
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
    async getGameCategory(data) {
      let result = {};
      if (this.$route.params.type == 1) {
        result = await getLiveGameLobbyCategory(data);
        this.categoryList = this.defaultCategoryListLiveGame.concat(result.RetObj.gameCategoryList);
        this.guid = result.RetObj.H3GUID;
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyCategory(data);
        this.categoryList = this.defaultCategoryList.concat(result.RetObj.gameCategoryList);
      }
      console.log('[GameLobby Category]', result.RetObj);
      return result;
    },
    async getGameList(data) {
      let result = {};
      if (this.$route.params.type == 1) {
        data.H3GUID = this.guid;
        result = await getLiveGameLobbyGameList(data);
        this.gameList = result.RetObj.JsonGameList || [];
      } else if (this.$route.params.type == 2) {
        result = await getGameLobbyGameList(data);
        this.gameList = result.RetObj.JsonGameList || [];
      }
      console.log('[GameLobby GameList]', result.RetObj);
    },
    async getGameUrl(data) {
      const result = await getGameUrl(data);
      console.log('[GameLobby GameUrl]', data, result);
      if (result.Code == 200) {
        window.open(result.RetObj.RedirectUrl);
      }
    },
    changePage(page) {
      this.pagination.page = page;
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
        const requestDataGetGameLobbyCategory = { Tag: this.productTag };
        await this.getGameCategory(requestDataGetGameLobbyCategory);

        const requestDataGetGameLobbyGameList = { Tag: this.productTag };
        this.getGameList(requestDataGetGameLobbyGameList);
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
