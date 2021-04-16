<template>
  <div class="game-lobby" :class="{ 'game-lobby-auth': userIsLoggedIn }">
    <div class="ui-panel-tab">
      <component
        :is="GameProductNavigation"
        :productList="productList"
        :productCurrent="productCurrent"
        @change-product="changeProduct"
      />

      <div class="ui-panel-tab__content">
        <component
          :is="GameCategoryNavigation"
          :categoryList="categoryList"
          :categoryCurrent="categoryCurrent"
          @change-category="changeCategory"
          v-if="isShowCategory"
        />

        <component
          :is="GameListIcon"
          :gameList="gameList"
          :productCurrent="productCurrent"
          :isProductActive="isProductActive"
          @change-page="changePageScrollBottom"
          @open-game="openGame"
        />
      </div>
    </div>

    <component :is="GameSearchBlock" @submit-search="submitSearch" v-if="isShowSearchBlock" />

    <!-- <component
      :is="GameCategoryNavigation"
      :categoryList="categoryList"
      :categoryCurrent="categoryCurrent"
      @change-category="changeCategory"
      v-if="isShowCategory"
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

    <!-- <intersect @enter="changePageScrollBottom" rootMargin="0px 5px 0px 0px">
      <div class="game-lobby-intersect"></div>
    </intersect> -->
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
