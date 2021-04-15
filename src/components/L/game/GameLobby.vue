<template>
  <div class="game-lobby" :class="{ 'game-lobby-auth': userIsLoggedIn }">
    <div class="ui-panel-tab">
      <!-- <div class="ui-panel-tab__tabs"> -->
      <component
        :is="GameProductNavigation"
        :productList="productList"
        :productCurrent="productCurrent"
        @change-product="changeProduct"
      />
      <!-- </div> -->

      <div class="ui-panel-tab__content"></div>
    </div>

    <!-- <component
      :is="GameCategoryNavigation"
      :categoryList="categoryList"
      :categoryCurrent="categoryCurrent"
      @change-category="changeCategory"
      v-if="isShowCategory"
    /> -->

    <!-- <component
      :is="GameSearchBlock"
      :isShowSearch="isShowSearch"
      :isShowTransfer="isShowTransfer"
      :isShowFav="isShowFav"
      @submit-search="submitSearch"
      @open-transfer-dialog="$store.dispatch('openModalTransfer', productPointCurrent)"
      v-if="isShowSearchBlock"
    /> -->

    <!-- <component
      :is="GameListIcon"
      :gameList="gameList"
      :productCurrent="productCurrent"
      @open-game="openGame"
      v-if="isCategoryEntry"
    /> -->

    <!-- <component
      :is="GameListTable"
      :gameList="gameList"
      :productCurrent="productCurrent"
      :isShowStart="isShowStart"
      :isShowDemo="isShowDemo"
      :isShowFav="isShowFav"
      @open-game="openGame"
      @change-game-fav="changeGameFav"
      v-else
    /> -->

    <!-- <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
      v-if="productCurrent.Lst_Site_Product_Status == 0"
    /> -->

    <!-- <component
      :is="GameTransferDialog"
      :wallet="userGamePointWallet"
      :currentPointProduct="productPointCurrent"
      :isShow="isShowTransferDialog"
      @submit-transfer="transferPoint"
      @close="closeTransferDialog"
    /> -->
  </div>
</template>

<script>
// import mixinGameLobbySlot from '@/mixins/gameLobbySlot';
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
