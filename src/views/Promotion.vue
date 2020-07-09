<template>
  <div class="lay-are-pageContent">
    <div class="are-bonus">
      <a href="/Y/StaticPage/NoneLogin/?Tag=PermanentIncome" class="lnk-bonus">
        <i class="icn-bonus"></i> <span class="txt-bonus">Bonus V.I.P</span>
      </a>
    </div>
    <div class="promotions">
      <router-link 
        v-for="(promotion, index) in promotions"
        :key="index"
        :to="promotion.link"
      >
        <img :src="promotion.img" alt="" />
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      promotions: [
        {
          img: event01,
          link: '/promotion/Ann01'
        },
        {
          img: event01,
          link: '/promotion/Ann01'
        },
        {
          img: event01,
          link: '/promotion/Ann01'
        },
        {
          img: event01,
          link: '/promotion/Ann01'
        },
        {
          img: event01,
          link: '/promotion/Ann01'
        },
      ],
    };
  },
  mounted() {
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    // import(`@/styles/${this.templateType}/common/promotion.css`);
    import(`@/styles/${templatePath}/promotion.scss`);
  },
};
</script>

<style lang="scss" scoped>

.promotions {
  width: 600px;
  margin: 30px auto;
  text-align: center;
  img {
    margin-bottom: 20px;
  }
}

.lay-are-pageContent {
  width: 100%;
  padding: 0;
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