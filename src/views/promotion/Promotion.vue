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
        @click.prevent="goPromotionContent(promotion)"
      >
        <img :src="promotion.Lst_ImageUrl" class="promotion__list__img" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getPromotionList } from '@/api/promotion';
import { isIos, openNewWindowURL } from '@/utils/device';
import event01 from '@/assets/Y/01/imgs/promotion/event01.jpg';

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
      this.promotionList = [
        {
          Lst_PromotionID: 11111,
          Lst_Title: 'Title11111',
          Lst_Sort: 0,
          Lst_ImageUrl: event01,
          Lst_LinkType: 2,
          Lst_LinkUrl: '',
        },
        {
          Lst_PromotionID: 22222,
          Lst_Title: 'Title22222',
          Lst_Sort: 1,
          Lst_ImageUrl: event01,
          Lst_LinkType: 2,
          Lst_LinkUrl: '',
        },
        {
          Lst_PromotionID: 33333,
          Lst_Title: 'Title33333',
          Lst_Sort: 1,
          Lst_ImageUrl: event01,
          Lst_LinkType: 1,
          Lst_LinkUrl: 'http://google.com',
        },
        {
          Lst_PromotionID: 44444,
          Lst_Title: 'Title44444',
          Lst_Sort: 1,
          Lst_ImageUrl: event01,
          Lst_LinkType: 2,
          Lst_LinkUrl: '',
        },
        {
          Lst_PromotionID: 55555,
          Lst_Title: 'Title55555',
          Lst_Sort: 1,
          Lst_ImageUrl: event01,
          Lst_LinkType: 2,
          Lst_LinkUrl: '',
        },
      ];

      const result = await getPromotionList();

      console.log('[Promotion]', result);

      // if (result.Code == 200) {
      //   this.promotionList = result.RetObj;
      // }
    },
    async goPromotionContent(promotion) {
      console.log('[GoPromotionContent]', promotion);

      if (promotion.Lst_LinkType == 1) {
        let newWindow;
        if (isIos()) {
          newWindow = window.open();
        }
        openNewWindowURL(newWindow, promotion.Lst_LinkUrl);
      } else if (promotion.Lst_LinkType == 2) {
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

<style scoped>
.promotion {
  padding-bottom: 160px;
}

.promotion-auth {
  padding-top: 88px;
}

.promotion__list {
  text-align: center;
  margin-top: 20px;
}

.promotion__list__img {
  margin-bottom: 20px;
}

.promotion__bonus__link {
  display: block;
  width: 100%;
  height: 109px;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.promotion__bonus__link__icon {
  display: inline-block;
  width: 70px;
  height: 64px;
  text-indent: -999em;
  vertical-align: top;
}
.promotion__bonus__link__text {
  display: inline-block;
  width: 82%;
  font-size: 32px;
  line-height: 72px;
  padding-left: 20px;
}
</style>
