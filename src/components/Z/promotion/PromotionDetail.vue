<template>
  <div class="promotion-detail" :class="{ 'promotion-detail-auth': userIsLoggedIn }">
    <img class="promotion-detail__image" :src="image" alt="" />
    <div class="promotion-detail__main">
      <div class="promotion-detail__main__content" v-for="item in promotionDetailList" :key="item.name">
        <h3 class="promotion-detail__main__content__title">
          {{ item.ContentTitle }}
        </h3>
        <div class="promotion-detail__main__content__desc">
          <div class="fr-view" v-html="item.ContentHtml"></div>
        </div>
      </div>
      <div class="promotion-detail__main__button">
        <button
          class="promotion-detail__main__button--back ui-btn ui-btn--long"
          @click="$router.push({ name: 'Promotion' })"
        >
          {{ $t('promotionDetail.button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mixinPromotionDetail from '@/mixins/promotionDetail';
import { mapGetters } from 'vuex';
import 'froala-editor/css/froala_style.min.css';

export default {
  name: 'PromotionDetail',
  mixins: [mixinPromotionDetail],
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userIsLoggedIn']),
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/promotion.scss`);
  },
};
</script>
