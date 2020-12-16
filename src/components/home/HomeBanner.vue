<template>
  <swiper class="home-swiper" :options="swiperOption" @click-slide="handleClickSlide">
    <swiper-slide v-for="(slide, index) in list" :key="index">
      <a class="home-swiper__link" href="javascript:;">
        <img
          :src="siteIsNewPromotion ? slide.Lst_ImgUrl : `${siteResourceUrl}/banner/${slide.ImageUrl}`"
          onerror="this.style.display = 'none'"
        />
      </a>
    </swiper-slide>
    <a class="home-swiper__button--previous" slot="button-prev"></a>
    <a class="home-swiper__button--next" slot="button-next"></a>
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
          prevEl: '.home-swiper__button--previous',
          nextEl: '.home-swiper__button--next',
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

<style lang="scss" scoped>
.home-swiper {
  height: 431px;

  &__link {
    display: block;
    width: 100%;
    height: 431px;
  }

  img {
    width: 100%;
    height: 431px;
  }
}

.home-swiper__button--previous,
.home-swiper__button--next {
  display: inline-block;
  position: absolute;
  top: 40%;
  width: 100px;
  height: 100px;
  z-index: 1;
}
.home-swiper__button--previous {
  background: url(~@/assets/common/banner/prev.png) no-repeat center center;
  left: 0;
}
.home-swiper__button--next {
  background: url(~@/assets/common/banner/next.png) no-repeat center center;
  right: 0;
}
</style>
