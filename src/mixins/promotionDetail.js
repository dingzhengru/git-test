import { mapGetters } from 'vuex';
import { apiGetPromotionDetail, apiPostPromotionDetail } from '@/api/promotion';

export default {
  name: 'MixinPromotionDetail',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
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
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostPromotionDetail(requestData);
      } else {
        result = await apiGetPromotionDetail(requestData);
      }

      if (result.Code == 200) {
        this.image = result.RetObj.ImageUrl;
        this.promotionDetailList = result.RetObj.ReturnList;
      }
    },
  },
  mounted() {
    this.getPromotionDetail();
  },
  watch: {
    lang() {
      this.getPromotionDetail();
    },
  },
};
