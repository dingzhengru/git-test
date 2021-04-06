<template>
  <div class="promotion" :class="{ 'promotion-auth': userIsLoggedIn }">
    <component
      :is="PromotionNavTab"
      :category="category"
      :categoryList="categoryList"
      @change-category="changeCategory"
    />

    <transition-group tag="div" class="promotion__group" name="list-zoom">
      <div
        class="promotion__item list-zoom-item"
        v-for="item in promotionListByCategory"
        :key="item.Lst_PromotionID"
        @click="goPromotionDetail(item)"
      >
        <img :src="item.Lst_ImageUrl" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinPromotion from '@/mixins/promotion';
import { mapGetters } from 'vuex';

export default {
  name: 'Promotion',
  mixins: [mixinStyleLoader, mixinPromotion],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'userIsLoggedIn']),
    PromotionNavTab() {
      return () => import(`@/${this.siteSetting.components.promotion.PromotionNavTab}`);
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/promotion.scss`);
    this.importStyleByFilename('promotion');
  },
};
</script>
