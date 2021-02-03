import { mapGetters } from 'vuex';
import { apiGetPromotionDetail } from '@/api/promotion';

export default {
  name: 'MixinPromotionDetail',
  computed: {
    ...mapGetters(['lang']),
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
    this.getPromotionDetail();
  },
  watch: {
    lang() {
      this.getPromotionDetail();
    },
  },
};
