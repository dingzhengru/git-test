import mixinLinkUrl from '@/mixins/linkUrl';
import { apiGetBannerList, apiPostBannerList } from '@/api/banner';
import { mapGetters } from 'vuex';

export default {
  mixins: [mixinLinkUrl],
  computed: {
    ...mapGetters(['lang', 'siteResourceUrl', 'userIsLoggedIn', 'siteIsPreview']),
  },
  data() {
    return {
      bannerList: [],
      banner: [
        {
          Lst_ImgUrl: require('@/assets/common/banner/banner16.jpg'),
        },
        {
          Lst_ImgUrl: require('@/assets/common/banner/banner17.jpg'),
        },
        {
          Lst_ImgUrl: require('@/assets/common/banner/banner18.jpg'),
        },
      ],
      swiperOption: {
        initialSlide: 0,
        slidesPerView: 1,
        loop: true,
        // lazy: true,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        },
        navigation: {
          prevEl: '.home-banner__button--previous',
          nextEl: '.home-banner__button--next',
        },
        autoplay: {
          delay: 5000,
        },
        pagination: {
          clickable: true,
        },
      },
    };
  },
  methods: {
    async getBannerList() {
      let result = {};
      if (this.userIsLoggedIn || this.siteIsPreview) {
        result = await apiPostBannerList();
      } else {
        const requestData = { Lang: this.lang };
        result = await apiGetBannerList(requestData);
      }
      if (result.Code === 200) {
        this.bannerList = result.RetObj;
        // this.$refs.bannerSwiper.$swiper.init();
      }
    },
    handleClickSlide(index, reallyIndex) {
      const banner = this.bannerList[reallyIndex];

      const linkType = this.userIsLoggedIn ? banner.Lst_Login_Type : banner.Lst_Nonelogin_Type;
      const linkUrl = this.userIsLoggedIn ? banner.Lst_Login_Url : banner.Lst_Nonelogin_Url;
      const linkTarget = banner.Lst_Target;

      this.goLinkUrlByTypeAndUrl(linkType, linkUrl, linkTarget);
    },
  },
  mounted() {
    this.getBannerList();
  },
  watch: {
    lang() {
      this.getBannerList();
    },
  },
};
