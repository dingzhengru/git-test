<template>
  <div class="game-lobby" :class="{ 'game-lobby-auth': userIsLoggedIn }">
    <component :is="GameJackpot" :jackpot="jackpot" v-if="isShowJackpot" />
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
      v-if="isShowCategory"
    />

    <component
      :is="GameSearchBlock"
      :isShowSearch="isShowSearch"
      :isShowTransfer="isShowTransfer"
      :isShowFav="isShowFav"
      @submit-search="submitSearch"
      @open-transfer-dialog="$store.dispatch('openModalTransfer', productPointCurrent)"
      v-if="isShowSearchBlock"
    />

    <component
      :is="GameListIcon"
      :gameList="gameList"
      :productCurrent="productCurrent"
      @open-game="openGame"
      v-if="isCategoryEntry"
    />

    <component
      :is="GameListTable"
      :gameList="gameList"
      :productCurrent="productCurrent"
      :isShowStart="isShowStart"
      :isShowDemo="isShowDemo"
      :isShowFav="isShowFav"
      @open-game="openGame"
      @change-game-fav="changeGameFav"
      v-else
    />

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

    <intersect @enter="changePageScrollBottom" rootMargin="0px 0px 5px 0px" v-if="isChangePageScroll">
      <div class="game-lobby-bottom-intersect"></div>
    </intersect>
  </div>
</template>

<script>
// import mixinGameLobbySlot from '@/mixins/gameLobbySlot';
import mixinGameLobby from '@/mixins/gameLobby';
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';

export default {
  name: 'GameLobbySlot',
  mixins: [mixinGameLobby],
  components: {
    Intersect,
  },
  computed: {
    ...mapGetters(['siteSetting', 'userIsLoggedIn', 'userGamePointWallet']),
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
    GameListIcon() {
      return () => import(`@/${this.siteSetting.components.game.GameListIcon}`);
    },
    // GameTransferDialog() {
    //   return () => import(`@/${this.siteSetting.components.game.GameTransferDialog}`);
    // },
  },
};
</script>
