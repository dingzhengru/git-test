<template>
  <swiper class="home-banner" :options="swiperOption" @click-slide="handleClickSlide">
    <swiper-slide v-for="(item, index) in list" :key="index">
      <a class="home-banner__link" href="javascript:;">
        <img
          :src="siteIsNewPromotion ? item.Lst_ImgUrl : `${siteResourceUrl}/banner/${item.ImageUrl}`"
          onerror="this.style.display = 'none'"
        />
      </a>
    </swiper-slide>
    <a class="home-banner__button home-banner__button--previous" slot="button-prev"></a>
    <a class="home-banner__button home-banner__button--next" slot="button-next"></a>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['siteResourceUrl', 'siteIsNewPromotion']),
  },
  data() {
    return {
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
    handleClickSlide(index, reallyIndex) {
      const slide = this.list[reallyIndex];
      this.$emit('open-banner', slide);
    },
  },
};
</script>
