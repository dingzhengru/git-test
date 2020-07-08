<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
        <router-link :to="slide.link">
          <img :src="slide.img" alt="" />
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

import banner16 from '@/assets/Y/01/01/imgs/banner/banner16.jpg';
import banner17 from '@/assets/Y/01/01/imgs/banner/banner17.jpg';
import banner18 from '@/assets/Y/01/01/imgs/banner/banner18.jpg';
// import banner19 from '@/assets/Y/01/01/imgs/banner/banner19.jpg';
// import banner20 from '@/assets/Y/01/01/imgs/banner/banner20.jpg';
// import banner21 from '@/assets/Y/01/01/imgs/banner/banner21.jpg';
// import banner22 from '@/assets/Y/01/01/imgs/banner/banner22.jpg';
// import banner23 from '@/assets/Y/01/01/imgs/banner/banner23.jpg';
// import banner24 from '@/assets/Y/01/01/imgs/banner/banner24.jpg';
// import banner25 from '@/assets/Y/01/01/imgs/banner/banner25.jpg';
// import banner26 from '@/assets/Y/01/01/imgs/banner/banner26.jpg';
// import banner27 from '@/assets/Y/01/01/imgs/banner/banner27.jpg';

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperSlide,
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
      swiperSlides: [],
    };
  },
  mounted() {
    this.swiperSlides = [
      {
        img: banner16,
        link: '/',
      },
      {
        img: banner17,
        link: '/',
      },
      {
        img: banner18,
        link: '/',
      },
    ];
  },
};
</script>

<style scoped>
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
  background: url(~@/assets/Y/01/01/imgs/banner/prev.png) no-repeat center center;
  left: 0;
}
.lnk-banner-next {
  background: url(~@/assets/Y/01/01/imgs/banner/next.png) no-repeat center center;
  right: 0;
}
</style>
