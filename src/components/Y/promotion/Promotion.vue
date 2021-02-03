<template>
  <div class="promotion" :class="{ 'promotion-auth': userIsLoggedIn }">
    <div class="promotion__bonus">
      <a class="promotion__bonus__link" href="javascript:;">
        <i class="promotion__bonus__link__icon"></i>
        <span class="promotion__bonus__link__text">Bonus V.I.P</span>
      </a>
    </div>
    <div class="promotion__list">
      <a
        href="javascript:;"
        v-for="item in promotionList"
        :key="item.Lst_PromotionID"
        @click.prevent="goPromotionDetail(item)"
      >
        <img :src="item.Lst_ImageUrl" class="promotion__list__img" />
      </a>
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
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/promotion.scss`);
  },
};
</script>
