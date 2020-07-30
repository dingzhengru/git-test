<template>
  <div class="promotion" :class="{ 'promotion-auth': isLoggedIn }">
    <div class="promotion__bonus">
      <a class="promotion__bonus__link" href="/Y/StaticPage/NoneLogin/?Tag=PermanentIncome">
        <i class="promotion__bonus__link__icon"></i>
        <span class="promotion__bonus__link__text">Bonus V.I.P</span>
      </a>
    </div>
    <div class="promotion__list">
      <router-link v-for="(promotion, index) in promotions" :key="index" :to="promotion.link">
        <img :src="promotion.img" class="promotion__list__img" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import event01 from '@/assets/Y/01/01/imgs/promotion/event01.jpg';
export default {
  name: 'Promotion',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      promotions: [
        {
          img: event01,
          link: '/promotion/Ann01',
        },
        {
          img: event01,
          link: '/promotion/Ann01',
        },
        {
          img: event01,
          link: '/promotion/Ann01',
        },
        {
          img: event01,
          link: '/promotion/Ann01',
        },
        {
          img: event01,
          link: '/promotion/Ann01',
        },
      ],
    };
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/promotion.scss`);
      },
    },
  },
};
</script>

<style scoped>
.promotion {
  padding-bottom: 160px;
}

.promotion-auth {
  padding-top: 88px;
}

.promotion__list {
  text-align: center;
  margin-top: 20px;
}

.promotion__list__img {
  margin-bottom: 20px;
}

.promotion__bonus__link {
  display: block;
  width: 100%;
  height: 109px;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.promotion__bonus__link__icon {
  display: inline-block;
  width: 70px;
  height: 64px;
  text-indent: -999em;
  vertical-align: top;
}
.promotion__bonus__link__text {
  display: inline-block;
  width: 82%;
  font-size: 32px;
  line-height: 72px;
  padding-left: 20px;
}
</style>
