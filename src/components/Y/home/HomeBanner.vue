<template>
  <swiper class="home-banner" :options="swiperOption" @click-slide="handleClickSlide">
    <swiper-slide v-for="(item, index) in banner" :key="index">
      <a class="home-banner__link" href="javascript:;">
        <img class="swiper-lazy" :data-src="item.Lst_ImgUrl" width="720" height="431" />
        <div class="swiper-lazy-preloader"></div>
      </a>
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
