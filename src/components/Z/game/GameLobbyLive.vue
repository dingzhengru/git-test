<template>
  <div class="game-lobby" :class="{ 'game-lobby-auth': userIsLoggedIn }">
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
      v-if="productCurrent.Lst_Site_Product_Status == 0 && productCurrent !== productLiveEVO"
    />

    <component
      :is="GameSearchBlock"
      :isShowSearch="false"
      :isShowTransfer="userIsLoggedIn"
      @submit-search="submitSearch"
      @open-transfer-dialog="isShowTransferDialog = true"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    />

    <component
      :is="GameListIcon"
      :gameList="gameList"
      :productCurrent="productCurrent"
      @open-game="openGame"
      v-if="productCategoryEntry === 1"
    />

    <component
      :is="GameListTable"
      :gameList="gameList"
      :productCurrent="productCurrent"
      :isShowStart="true"
      @open-game="openGame"
      v-else
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

    <!-- <intersect @enter="changePageScrollBottom" rootMargin="0px 0px 5px 0px">
      <div class="game-lobby-bottom-intersect"></div>
    </intersect> -->
  </div>
</template>

<script>
import mixinGameLobbyLive from '@/mixins/gameLobbyLive';
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';

export default {
  name: 'GameLobbyLive',
  mixins: [mixinGameLobbyLive],
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
    GameTransferDialog() {
      return () => import(`@/${this.siteSetting.components.game.GameTransferDialog}`);
    },
  },
};
</script>
