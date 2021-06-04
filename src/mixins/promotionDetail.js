import { mapGetters } from 'vuex';
import { apiGetPromotionDetail, apiGetPromotionDetailAPP } from '@/api/promotion';

export default {
  name: 'MixinPromotionDetail',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn', 'siteIsLandscape']),
    promotionDetailListEnabled() {
      if (!this.promotionDetail.ReturnList) {
        return [];
      }
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

      let result = {};

      if (this.siteIsLandscape) {
        result = await apiGetPromotionDetailAPP(requestData);
      } else {
        result = await apiGetPromotionDetail(requestData);
      }

      if (result.Code == 200) {
        this.promotionDetail = result.RetObj;

        if (this.checkPromotionEnabled() === false) {
          this.$router.replace({ name: 'Home' });
        }
      }
    },
    checkPromotionEnabled() {
      if (this.promotionDetail.Lst_IsPermanent === true || this.promotionDetail.Lst_EndTime === null) {
        return true;
      }
      const datetimeEnd = this.$dayjs(this.promotionDetail.Lst_EndTime);
      const now = this.$dayjs().tz('Africa/Abidjan');
      return now.isBefore(datetimeEnd);
    },
  },
  mounted() {
    this.getPromotionDetail();
  },
  watch: {
    lang() {
      this.getPromotionDetail();
    },
    $route() {
      this.getPromotionDetail();
    },
  },
};
