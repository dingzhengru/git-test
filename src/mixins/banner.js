import { apiGetBannerListOld, apiGetBannerList } from '@/api/banner';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['lang', 'siteIsNewPromotion', 'siteResourceUrl']),
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
        initialSlide: 1,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        lazy: true,
        touchRatio: 0.5,
        keyboard: {
          enabled: true,
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
      if (this.siteIsNewPromotion) {
        //* 新版，Lst_ImgUrl 會直接是完整圖片網址
        const result = await apiGetBannerList();
        if (result.Code == 200) {
          this.bannerList = result.RetObj;
        }
      } else {
        //* 舊版，只提供檔名，需用組合的方式取得
        const result = await apiGetBannerListOld();
        if (result.Code == 200) {
          this.bannerList = result.RetObj.map(item => {
            item.Lst_ImgUrl = `${this.siteResourceUrl}/imgs/banner/${item.ImageUrl}`;
            return item;
          });
        }
      }
    },
    handleClickSlide(index, reallyIndex) {
      const banner = this.list[reallyIndex];

      const bannerType = this.userIsLoggedIn ? banner.Lst_Login_Type : banner.Lst_Nonelogin_Type;
      const bannerUrl = this.userIsLoggedIn ? banner.Lst_Login_Url : banner.Lst_Nonelogin_Url;

      if (bannerType == 1) {
        window.open(banner.Lst_LinkUrl, banner.Lst_Target);
      } else if (bannerType == 2 || bannerType == 0) {
        if (bannerUrl > 0) {
          this.$router.push({
            name: 'PromotionDetail',
            params: { id: bannerUrl },
          });
        } else {
          this.$router.push({ name: 'Promotion' });
        }
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