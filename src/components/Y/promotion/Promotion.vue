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
import { mapGetters } from 'vuex';
import { apiGetPromotionList } from '@/api/promotion';
// import { isIos, openNewWindowURL } from '@/utils/device';

export default {
  name: 'Promotion',
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
  },
  data() {
    return {
      promotionList: [],
    };
  },
  methods: {
    async getPromotionList() {
      //* 連結類型，0:無、1:自定義、2:優惠活動、3:遊戲館
      const result = await apiGetPromotionList();

      if (result.Code == 200) {
        this.promotionList = result.RetObj;
      }
    },
    async goPromotionDetail(promotion) {
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
  mounted() {
    import(`@/styles/${this.siteFullCss}/promotion.scss`);

    this.getPromotionList();
  },
};
</script>
