<template>
  <div class="home-swiper">
    <swiper class="swiper" :options="swiperOption">
      <!-- <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <router-link :to="slide.link">
          <img :src="slide.img" alt="" />
        </router-link>
      </swiper-slide> -->
      <swiper-slide v-for="slide in list" :key="slide.Lst_Nonelogin_url">
        <router-link :to="slide.Lst_Nonelogin_url">
          <img :src="slide.ImageUrl" alt="" />
        </router-link>
      </swiper-slide>
      <a class="lnk-banner-prev" slot="button-prev"></a>
      <a class="lnk-banner-next" slot="button-next"></a>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

// import banner16 from '@/assets/Y/01/01/imgs/banner/banner16.jpg';
// import banner17 from '@/assets/Y/01/01/imgs/banner/banner17.jpg';
// import banner18 from '@/assets/Y/01/01/imgs/banner/banner18.jpg';

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        lazy: true,
        touchRatio: 0.5,
        keyboard: {
          enabled: true,
        },
        navigation: {
          prevEl: '.lnk-banner-prev',
          nextEl: '.lnk-banner-next',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      },
    };
  },
  mounted() {},
};
</script>

<style scoped>
.home-swiper {
  height: 431px;
}

.lnk-banner-prev,
.lnk-banner-next {
  display: inline-block;
  position: absolute;
  top: 40%;
  width: 100px;
  height: 100px;
  z-index: 1;
}
.lnk-banner-prev {
  background: url(~@/assets/common/imgs/banner/prev.png) no-repeat center center;
  left: 0;
}
.lnk-banner-next {
  background: url(~@/assets/common/imgs/banner/next.png) no-repeat center center;
  right: 0;
}
</style>
