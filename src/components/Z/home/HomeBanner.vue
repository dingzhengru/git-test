<template>
  <swiper
    class="home-banner"
    ref="bannerSwiper"
    :options="swiperOption"
    @click-slide="handleClickSlide"
    v-if="bannerList.length > 0"
  >
    <swiper-slide v-for="(item, index) in bannerList" :key="index">
      <!-- <img class="swiper-lazy" :src="item.Lst_ImgUrl" width="720" height="432" /> -->
      <img class="swiper-lazy" :data-src="item.Lst_ImgUrl" width="720" height="432" />
      <div class="swiper-lazy-preloader"></div>
    </swiper-slide>
    <a class="home-banner__button home-banner__button--previous" slot="button-prev"></a>
    <a class="home-banner__button home-banner__button--next" slot="button-next"></a>
  </swiper>
</template>

<script>
import mixinBanner from '@/mixins/banner';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeBanner',
  mixins: [mixinBanner],
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(['siteResourceUrl']),
  },
};
</script>
