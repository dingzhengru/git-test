import { apiGetBannerList, apiPostBannerList } from '@/api/banner';
import { mapGetters } from 'vuex';

export default {
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

      const bannerType = this.userIsLoggedIn ? banner.Lst_Login_Type : banner.Lst_Nonelogin_Type;
      const bannerUrl = this.userIsLoggedIn ? banner.Lst_Login_Url : banner.Lst_Nonelogin_Url;

      if (bannerType === 1) {
        window.open(bannerUrl, banner.Lst_Target);
      } else if (bannerType === 2) {
        this.$router.push({ name: 'PromotionDetail', params: { id: bannerUrl } });
      } else if (bannerType === 3) {
        const [classify, id, key] = bannerUrl.split('/');
        this.$router.push({ name: 'GameLobby', params: { classify, id, key } });
      }
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
