<template>
  <div class="promotion" :class="{ 'promotion-auth': token }">
    <div class="are-bonus">
      <a href="/Y/StaticPage/NoneLogin/?Tag=PermanentIncome" class="lnk-bonus">
        <i class="icn-bonus"></i> <span class="txt-bonus">Bonus V.I.P</span>
      </a>
    </div>
    <div class="promotion--list">
      <router-link v-for="(promotion, index) in promotions" :key="index" :to="promotion.link">
        <img :src="promotion.img" class="promotion--list--img" alt="" />
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
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
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

.promotion--list {
  text-align: center;
  margin-top: 20px;
}

.promotion--list--img {
  margin-bottom: 20px;
}

.lnk-bonus {
  display: block;
  width: 100%;
  height: 109px;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.icn-bonus {
  display: inline-block;
  width: 70px;
  height: 64px;
  text-indent: -999em;
  vertical-align: top;
}
.txt-bonus {
  display: inline-block;
  width: 82%;
  font-size: 32px;
  line-height: 72px;
  padding-left: 20px;
}
</style>
