<template>
  <div class="game-lobby">
    <div class="game-lobby__supply">
      <ul class="game-lobby__supply__ul">
        <li
          class="game-lobby__supply__ul__li"
          :class="[gameType.class, { 'game-lobby__supply__ul__li--active': $route.params.type == gameType.type }]"
          v-for="gameType in gameTypeList"
          :key="gameType.name"
        >
          <router-link
            class="game-lobby__supply__ul__li__link"
            :to="{ name: 'GameLobby', params: { type: gameType.type }, query: { category: 'all' } }"
          >
            {{ gameType.name }}
          </router-link>
        </li>
      </ul>
      <div class="game-lobby__category">
        <ul class="game-lobby__category__ul">
          <li
            class="game-lobby__category__ul__li"
            v-for="category in categoryList"
            :key="category.name"
            :class="{ 'game-lobby__category__ul__li--active': $route.query.category == category.value }"
          >
            <router-link
              class="game-lobby__category__ul__li__link"
              :to="{ name: 'GameLobby', params: { type: $route.params.type }, query: { category: category.value } }"
            >
              {{ category.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="game-lobby__inquire">
      <input class="game-lobby__inquire__search" type="text" v-model="search.text" placeholder="Search" />
      <button class="game-lobby__inquire__search-icon"></button>
      <input class="game-lobby__inquire__favorites" type="submit" title="My Favorites" />
      <a class="game-lobby__inquire__transfer-now" href="javascript:;">Transfer Now</a>
    </div>
    <table class="game-lobby__table">
      <tbody>
        <tr class="game-lobby__table__tr" v-for="(game, index) in pageData" :key="index">
          <td class="game-lobby__table__tr__td-1st">
            <img class="game-lobby__table__tr__td__img" :src="game.img" />
          </td>
          <td class="game-lobby__table__tr__td-2nd">{{ game.name }}</td>
          <td class="game-lobby__table__tr__td-3rd">
            <a href="javascript:;" class="game-lobby__table__tr__td__link--start">Play Now</a>
            <a href="javascript:;" class="game-lobby__table__tr__td__link--freeplay">Free Play</a>
            <a href="javascript:;" class="game-lobby__table__tr__td__link--favorites">Favorites</a>
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

export default {
  name: 'GameList',
  components: {
    AppPagination: () => import('@/components/Y/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
    searcData() {
      if (!this.search.text) {
        return this.gameList;
      }
      return this.gameList.filter(item => item.name.toLowerCase().includes(this.search.text.toLowerCase()));
    },
    pageData() {
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.searcData.slice(startAt, endAt) || [];
    },
  },
  data() {
    return {
      gameTypeList: [
        {
          name: 'MG+RNG',
          type: 'gametype01',
          class: 'ui-li-supply-1190',
        },
        {
          name: 'BBIN RNG',
          type: 'gametype02',
          class: 'ui-li-supply-1120',
        },
        {
          name: 'JDB',
          type: 'gametype03',
          class: 'ui-li-supply-1180',
        },
        {
          name: 'CQ9 RNG',
          type: 'gametype04',
          class: 'ui-li-supply-1200',
        },
        {
          name: 'RG電子',
          type: 'gametype05',
          class: 'ui-li-supply-1190',
        },
        {
          name: 'DS RNG',
          type: 'gametype06',
          class: 'ui-li-supply-1190',
        },
        {
          name: 'Royal RNG',
          type: 'gametype07',
          class: 'ui-li-supply-1190',
        },
      ],
      categoryList: [],
      gameList: [],
      search: {
        text: '',
      },
      pagination: {
        page: 1,
        pagesize: 6,
      },
    };
  },
  methods: {
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
      },
    },
    '$route.params.type': {
      immediate: true,
      handler() {
        this.categoryList = [
          {
            name: 'All Games',
            value: 'all',
          },
          {
            name: 'Hot Games',
            value: 'hot',
          },
        ];
        this.gameList = [
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
          {
            name: 'Thor2',
            img: 'http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg',
          },
        ];
      },
    },
    categoryList() {
      //! 當 category 對不上時(使用者擅自從網址輸入)，就轉址至 { category: 'all' }
      if (!this.categoryList.find(item => this.$route.query.category == item.value)) {
        this.$router.push({
          name: 'GameLobby',
          params: { type: this.$route.params.type },
          query: { category: 'all' },
        });
      }
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
  left: 280px;
  position: absolute;
  width: 53px;
  height: 71px;
  border: 0;
  text-indent: -9999px;
  outline: none;
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

.game-lobby__inquire__transfer-now {
  display: inline-block;
  width: 133px;
  height: 65px;
  font-size: 21px;
  letter-spacing: 0;
  line-height: 2;
  padding: 22px 8px 0 48px;
  margin: 13px 0 0 10px;
  color: #fedebe;
  vertical-align: top;
  background: url(~@/assets/common/imgs/ui/btn_transferNow.png) left center no-repeat;
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
</style>
