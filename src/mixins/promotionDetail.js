import { mapGetters } from 'vuex';
import {
  apiGetPromotionDetail,
  apiPostPromotionDetail,
  apiGetPromotionDetailAPP,
  apiPostPromotionDetailAPP,
} from '@/api/promotion';

export default {
  name: 'MixinPromotionDetail',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn', 'siteIsLandscape', 'siteIsPreview']),
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
      return `${this.promotionDetailStartTimeFormatted} ~ ${this.promotionDetailEndTimeFormatted} (${this.$t(
        'ui.label.thailandTime'
      )})`;
    },
  },
  data() {
    return {
      promotionDetail: {},
    };
  },
  methods: {
    async getPromotionDetail() {
      const requestData = { PromotionId: Number(this.$route.params.id) };

      let result = {};

      if (this.userIsLoggedIn || this.siteIsPreview) {
        if (this.siteIsLandscape) {
          result = await apiPostPromotionDetailAPP(requestData);
        } else {
          result = await apiPostPromotionDetail(requestData);
        }
      } else {
        requestData.Lang = this.lang;
        if (this.siteIsLandscape) {
          result = await apiGetPromotionDetailAPP(requestData);
        } else {
          result = await apiGetPromotionDetail(requestData);
        }
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
