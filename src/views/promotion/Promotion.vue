<template>
  <div class="promotion" :class="{ 'promotion-auth': isLoggedIn }">
    <div class="promotion__bonus">
      <a class="promotion__bonus__link" href="javascript:;">
        <i class="promotion__bonus__link__icon"></i>
        <span class="promotion__bonus__link__text">Bonus V.I.P</span>
      </a>
    </div>
    <div class="promotion__list">
      <a
        href="javascript:;"
        v-for="promotion in promotionList"
        :key="promotion.Lst_PromotionID"
        @click.prevent="goPromotionDetail(promotion)"
      >
        <img :src="promotion.Lst_ImageUrl" class="promotion__list__img" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getPromotionList } from '@/api/promotion';
// import { isIos, openNewWindowURL } from '@/utils/device';

export default {
  name: 'Promotion',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      promotionList: [],
    };
  },
  methods: {
    async getPromotionList() {
      //* 連結類型，0:無、1:自定義、2:優惠活動、3:遊戲館
      const result = await getPromotionList();

      console.log('[Promotion]', result);

      if (result.Code == 200) {
        this.promotionList = result.RetObj;
      }
    },
    async goPromotionDetail(promotion) {
      console.log('[GoPromotionDetail]', promotion);

      if (promotion.Lst_LinkType == 1) {
        window.open(promotion.Lst_LinkUrl);
      } else if (promotion.Lst_LinkType == 2 || promotion.Lst_LinkType == 0) {
        this.$router.push({
          name: 'PromotionDetail',
          params: { id: promotion.Lst_PromotionID },
        });
      }
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/promotion/promotion.scss`);

        this.getPromotionList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.promotion {
  padding-bottom: 160px;

  &-auth {
    padding-top: 88px;
  }

  &__list {
    text-align: center;
    margin-top: 20px;

    &__img {
      margin-bottom: 20px;
    }
  }

  &__bonus {
    &__link {
      display: block;
      width: 100%;
      height: 109px;
      padding: 20px 0 0 35px;
      box-sizing: border-box;
      margin-bottom: 8px;

      &__icon {
        display: inline-block;
        width: 70px;
        height: 64px;
        text-indent: -999em;
        vertical-align: top;
      }
      &__text {
        display: inline-block;
        width: 82%;
        font-size: 32px;
        line-height: 72px;
        padding-left: 20px;
      }
    }
  }
}
</style>

<style scoped>
/* .promotion {
  padding-bottom: 160px;
} */

/* .promotion-auth {
  padding-top: 88px;
} */

/* .promotion__list {
  text-align: center;
  margin-top: 20px;
} */

/* .promotion__list__img {
  margin-bottom: 20px;
} */

/* .promotion__bonus__link {
  display: block;
  width: 100%;
  height: 109px;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
  margin-bottom: 8px;
} */
/* .promotion__bonus__link__icon {
  display: inline-block;
  width: 70px;
  height: 64px;
  text-indent: -999em;
  vertical-align: top;
} */
/* .promotion__bonus__link__text {
  display: inline-block;
  width: 82%;
  font-size: 32px;
  line-height: 72px;
  padding-left: 20px;
} */
</style>
