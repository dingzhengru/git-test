<template>
  <div class="promotion" :class="{ 'promotion-auth': userIsLoggedIn }">
    <component :is="PromotionNavTab" />
    <div
      class="promotion__item"
      v-for="item in promotionList"
      :key="item.Lst_PromotionID"
      @click="goPromotionDetail(item)"
    >
      <img :src="item.Lst_ImageUrl" />
    </div>
  </div>
</template>

<script>
import mixinPromotion from '@/mixins/promotion';
import { mapGetters } from 'vuex';

export default {
  name: 'Promotion',
  mixins: [mixinPromotion],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'userIsLoggedIn']),
    PromotionNavTab() {
      return () => import(`@/${this.siteSetting.components.promotion.PromotionNavTab}`);
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/promotion.scss`);
  },
};
</script>
