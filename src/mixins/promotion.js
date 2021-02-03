import { mapGetters } from 'vuex';
import { apiGetPromotionList } from '@/api/promotion';

export default {
  name: 'MixinPromotion',
  computed: {
    ...mapGetters(['userIsLoggedIn']),
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
    this.getPromotionList();
  },
};
