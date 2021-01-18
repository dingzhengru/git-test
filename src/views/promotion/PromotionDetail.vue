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
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/promotion/promotion-detail.scss`);

    this.getPromotionDetail();
  },
  watch: {
    lang() {
      this.getPromotionDetail();
    },
  },
};
</script>

<style lang="scss">
/**
 ** 因為 normalize 有設定 font-size，無法寫在 scoped
 ** 看是要去改 normalize 還是現在這種另外覆蓋寫
*/
.promotion-detail__main__content__desc {
  h1 {
    font-size: 4.6em;
  }
  h2 {
    font-size: 3.45em;
  }
  h3 {
    font-size: 2.69em;
  }
  h4 {
    font-size: 2.3em;
  }
  h5 {
    font-size: 1.9em;
  }
  h6 {
    font-size: 1.54em;
  }
}
</style>

<style lang="scss" scoped>
.promotion-detail {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 160px;

  &-auth {
    padding-top: 88px;
  }

  &__image {
    display: block;
    width: 600px;
    height: 190px;
    margin: 20px auto;
  }

  &__main {
    &__content {
      &__title {
        height: 98px;
        padding: 34px 0 0 95px;
        font-size: 2.4em;
        font-weight: normal;
      }

      &__desc {
        font-size: 2.3em;
      }

      .ui-table04 {
        font-size: 1em;
      }

      ul > li {
        margin-bottom: 20px;
      }

      ul > li > a {
        border-radius: 6px;
        padding: 5px 10px;
        margin: 5px;
        display: inline-block;
      }
    }
    &__button {
      text-align: center;
    }
  }
}
</style>
