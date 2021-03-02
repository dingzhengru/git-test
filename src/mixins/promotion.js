import { mapGetters } from 'vuex';
import { apiGetPromotionList } from '@/api/promotion';

export default {
  name: 'MixinPromotion',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    promotionListByCategory() {
      if (this.category == 0) {
        return this.promotionList;
      }

      return this.promotionList.filter(item => item.Lst_CategoryTag.includes(this.category));
    },
  },
  data() {
    return {
      promotionList: [],
      categoryList: [],
      category: 0,
    };
  },
  methods: {
    async getPromotionList() {
      //* 連結類型，0:無、1:自定義、2:優惠活動、3:遊戲館
      const requestData = { Lang: this.lang };
      const result = await apiGetPromotionList(requestData);

      if (result.Code == 200) {
        this.promotionList = result.RetObj.PromotionList;
        this.categoryList = result.RetObj.CategoryList;
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
    changeCategory(category) {
      this.category = category;
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
