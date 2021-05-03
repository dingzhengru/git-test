import { mapGetters } from 'vuex';
import { apiGetPromotionDetail } from '@/api/promotion';

export default {
  name: 'MixinPromotionDetail',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    promotionDetailListEnabled() {
      return this.promotionDetail.ReturnList.filter(item => item.Enable);
    },
    promotionDetailStartTimeFormatted() {
      return this.$dayjs(this.promotionDetail.StartTime).format('YYYY/MM/DD HH:mm:ss');
    },
    promotionDetailEndTimeFormatted() {
      return this.$dayjs(this.promotionDetail.EndTime).format('YYYY/MM/DD HH:mm:ss');
    },
    promotionDetailDateContent() {
      if (this.promotionDetail.IsPermanent || this.promotionDetail.EndTime === null) {
        return `${this.promotionDetailStartTimeFormatted} ~`;
      }
      return `${this.promotionDetailStartTimeFormatted} ~ ${this.promotionDetailEndTimeFormatted}`;
    },
  },
  data() {
    return {
      promotionDetail: {},
    };
  },
  methods: {
    async getPromotionDetail() {
      const requestData = { PromotionId: Number(this.$route.params.id), Lang: this.lang };
      const result = await apiGetPromotionDetail(requestData);

      if (result.Code == 200) {
        this.promotionDetail = result.RetObj;
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
