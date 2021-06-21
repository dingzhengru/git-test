import mixinLinkUrl from '@/mixins/linkUrl';
import { mapGetters } from 'vuex';
import {
  apiGetPromotionList,
  apiPostPromotionList,
  apiGetPromotionListAPP,
  apiPostPromotionListAPP,
} from '@/api/promotion';

export default {
  name: 'MixinPromotion',
  mixins: [mixinLinkUrl],
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn', 'siteIsPreview', 'siteIsLandscape']),
    promotionListByCategory() {
      if (this.category == 0) {
        return this.promotionList;
      }

      return this.promotionList.filter(item => item.Lst_CategoryTag.includes(this.category));
    },
    promotionListHasDetail() {
      return this.promotionList.filter(item => item.Lst_LinkType === 0 || item.Lst_LinkType === 2);
    },
    promotionListFiltered() {
      return this.promotionListByCategory.filter(item => {
        if (item.Lst_IsPermanent === true || item.Lst_EndTime === null) {
          return true;
        }
        const datetimeEnd = this.$dayjs(item.Lst_EndTime);
        const now = this.$dayjs().tz('Africa/Abidjan');
        return now.isBefore(datetimeEnd);
      });
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
      let result = {};
      if (this.userIsLoggedIn || this.siteIsPreview) {
        if (this.siteIsLandscape) {
          result = await apiPostPromotionListAPP();
        } else {
          result = await apiPostPromotionList();
        }
      } else {
        const requestData = { Lang: this.lang };
        if (this.siteIsLandscape) {
          result = await apiGetPromotionListAPP(requestData);
        } else {
          result = await apiGetPromotionList(requestData);
        }
      }

      if (result.Code == 200) {
        this.promotionList = result.RetObj.PromotionList;
        this.categoryList = result.RetObj.CategoryList;
      }
    },
    async goPromotionDetail(promotion) {
      this.goLinkUrlByPromotion(promotion);
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
