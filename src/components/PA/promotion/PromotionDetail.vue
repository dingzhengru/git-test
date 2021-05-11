<template>
  <div class="promotion-detail">
    <img class="promotion-detail__image" :src="promotionDetail.ImageUrl" alt="" />
    <div class="promotion-detail__main">
      <div class="promotion-detail__main__content">
        <div class="promotion-detail__main__content__title">
          {{ $t('promotionDetail.title.date') }}
        </div>
        <div class="promotion-detail__main__content__desc">{{ promotionDetailDateContent }}</div>
      </div>

      <div class="promotion-detail__main__content" v-for="item in promotionDetailListEnabled" :key="item.name">
        <div class="promotion-detail__main__content__title">
          {{ item.ContentTitle }}
        </div>
        <div class="promotion-detail__main__content__desc">
          <div class="fr-view" v-html="item.ContentHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinPromotionDetail from '@/mixins/promotionDetail';
// import { mapGetters } from 'vuex';
import 'froala-editor/css/froala_style.min.css';

export default {
  name: 'PromotionDetail',
  mixins: [mixinStyleLoader, mixinPromotionDetail],
};
</script>
