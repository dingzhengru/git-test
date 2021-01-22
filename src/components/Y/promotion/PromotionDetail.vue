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
import { mapGetters } from 'vuex';
import { apiGetPromotionDetail } from '@/api/promotion';
import 'froala-editor/css/froala_style.min.css';

export default {
  name: 'PromotionDetail',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userIsLoggedIn']),
  },
  data() {
    return {
      image: '',
      promotionDetailList: [],
      contentList: [],
    };
  },
  methods: {
    async getPromotionDetail() {
      const requestData = { PromotionId: Number(this.$route.params.id) };
      const result = await apiGetPromotionDetail(requestData);
      if (result.Code == 200) {
        this.image = result.RetObj.ImageUrl;
        this.promotionDetailList = result.RetObj.ReturnList;
      }
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/promotion.scss`);

    this.getPromotionDetail();
  },
  watch: {
    lang() {
      this.getPromotionDetail();
    },
  },
};
</script>
