import { mapGetters } from 'vuex';
import { apiGetPromotionList, apiPostPromotionList } from '@/api/promotion';

export default {
  name: 'MixinPromotion',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
  },
  data() {
    return {
      promotionList: [],
    };
  },
  methods: {
    async getPromotionList() {
      //* 連結類型，0:無、1:自定義、2:優惠活動、3:遊戲館
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostPromotionList();
      } else {
        const requestData = { Lang: this.lang };
        result = await apiGetPromotionList(requestData);
      }

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
  watch: {
    lang() {
      this.getPromotionList();
    },
  },
};
