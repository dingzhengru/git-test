<template>
  <div class="game-lobby" :class="{ 'game-lobby-auth': userIsLoggedIn }">
    <div class="ui-panel-tab">
      <component
        :is="GameProductNavigation"
        :productList="productList"
        :productCurrent="productCurrent"
        :productClassify="productClassify"
        :isProductFav="isProductFav"
        :isShowProductFav="isShowProductFav"
        @change-product="changeProduct"
      />

      <div class="ui-panel-tab__content">
        <component
          :is="GameCategoryNavigation"
          :categoryList="categoryList"
          :categoryCurrent="categoryCurrent"
          @change-category="changeCategory"
          v-if="isShowCategory && !isProductFav"
        />

        <component
          :is="GameListIcon"
          :gameList="gameList"
          :productCurrent="productCurrent"
          :isShowCategory="isShowCategory"
          :isProductActive="isProductActive || isProductFav"
          :isShowFav="isShowFav"
          @change-page="changePageScrollHandler"
          @open-game="openGame"
          @change-game-fav="changeGameFav"
        />
      </div>
    </div>

    <component :is="GameSearchBlock" @submit-search="submitSearch" v-if="isShowSearch" />
  </div>
</template>

<script>
import mixinGameLobby from '@/mixins/gameLobby';
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';

export default {
  name: 'GameLobby',
  mixins: [mixinGameLobby],
  components: {
    Intersect,
  },
  computed: {
    ...mapGetters(['siteSetting', 'userIsLoggedIn', 'userGamePointWallet']),
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
    GameListIcon() {
      return () => import(`@/${this.siteSetting.components.game.GameListIcon}`);
    },
    // GameTransferDialog() {
    //   return () => import(`@/${this.siteSetting.components.game.GameTransferDialog}`);
    // },
  },
};
</script>
