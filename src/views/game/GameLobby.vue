<template>
  <div>
    <div class="theme-slotgame-supply">
      <ul class="cpn-boxzero cpn-inBlock-row ui-ul-supply" id="lobbyproduct">
        <li
          class="ui-li-supply"
          :class="[gameType.class, { 'ui-li-supply-active': $route.params.type == gameType.type }]"
          v-for="gameType in gameTypeList"
          :key="gameType.name"
        >
          <router-link
            class="ui-lnk-supply"
            :to="{ name: 'GameLobby', params: { type: gameType.type }, query: { category: 'all' } }"
          >
            {{ gameType.name }}
          </router-link>
        </li>
      </ul>
      <div>
        <ul class="cpn-boxzero cpn-inBlock-row ui-ul-category">
          <li
            class="ui-li-category"
            v-for="category in categoryList"
            :key="category.name"
            :class="{ 'ui-li-category-active': $route.query.category == category.value }"
          >
            <router-link
              class="ui-lnk-category lnk-category"
              :to="{ name: 'GameLobby', params: { type: $route.params.type }, query: { category: category.value } }"
            >
              {{ category.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="cpn-inBlock-row theme-slotgame-inquire">
      <input class="ui-ipt-inquire" type="text" placeholder="Search" />
      <button class="ui-lnk-inquire"></button>
      <input type="submit" class="ui-ipt-favorites" title="My Favorites" />
      <a href="javascript:;" class="inline cpn-inBlock ui-lnk-transferNow">Transfer Now</a>
    </div>
    <div class="theme-slotgame-list">
      <table class="table-game">
        <tbody>
          <tr class="tr-game">
            <td class="td-1st">
              <img class="img-gameBg" src="http://resource.re888show.com/SlotgameImg/1200/en-us/Thor2.jpg" />
            </td>
            <td class="td-2nd">
              <div>Thor 2</div>
            </td>
            <td class="td-3rd">
              <a href="javascript:;" class="cpn-inBlock lnk-game-start">Play Now</a>
              <a href="javascript:;" class="cpn-inBlock lnk-game-freeplay">Free Play</a>
              <a href="javascript:;" class="cpn-inBlock lnk-game-favorites">Favorites</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameList',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
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
    };
  },
  mounted() {},
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/game.scss`);
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
.ui-lnk-transferNow {
  font-size: 21px;
  letter-spacing: 0;
  padding: 22px 8px 0 48px;
  line-height: 2;
}

.table-game {
  width: 100%;
  letter-spacing: -1px;
}
.table-game .td-1st {
  max-width: 152px;
  padding: 0 10px;
  overflow: hidden;
}

.table-game .img-gameBg {
  width: 100%;
}

.table-game .td-2nd {
  width: auto;
  min-width: 208px;
  padding: 0 5px;
  font-size: 24px;
  color: #92a0c0;
  font-weight: bold;
  vertical-align: middle;
  word-break: break-word;
}

.table-game .td-3rd {
  width: auto;
  padding: 10px 0;
  white-space: nowrap;
  text-align: center;
}

.table-game .td-3rd a {
  color: #fff;
  font-size: 21px;
  line-height: 205px;
}

.lnk-game-start,
.lnk-game-freeplay,
.lnk-game-favorites,
.lnk-game-favorites-selected {
  width: 90px;
  height: 83px;
  margin: 0 10px;
  background-repeat: no-repeat;
}
</style>
