<template>
  <div class="about" :class="{ 'about-auth': isLoggedIn }">
    <h2 class="about__title">{{ $t('about.title') }}</h2>
    <div class="about__intro" :id="item.id" v-for="item in aboutList" :key="item.id">
      <img class="about__intro__img" :src="item.img" alt="" />
      <h2 class="about__intro__title">{{ $t(item.title) }}</h2>
      <span class="about__intro__content">{{ $t(item.content) }}</span>
    </div>

    <ul class="about__toolbar">
      <li class="about__toolbar__li" :class="[tool.class]" v-for="tool in toolList" :key="tool.scrollTo">
        <a class="about__toolbar__li__link" v-scroll-to="{ el: tool.scrollTo }"></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imgSport from '@/assets/common/imgs/game/gameIntro-01.jpg';
import imgGClub from '@/assets/common/imgs/game/gameIntro-02.jpg';
import imgRNG from '@/assets/common/imgs/game/gameIntro-03.jpg';

export default {
  name: 'About',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      imgSport: imgSport,
      imgGClub: imgGClub,
      imgRNG: imgRNG,
      aboutList: [
        {
          id: 'gameSport',
          img: imgSport,
          title: 'about.sport.title',
          content: 'about.sport.content',
        },
        {
          id: 'gameGclub',
          img: imgGClub,
          title: 'about.GClub.title',
          content: 'about.GClub.content',
        },
        {
          id: 'gameRNG',
          img: imgRNG,
          title: 'about.RNG.title',
          content: 'about.RNG.content',
        },
      ],
      toolList: [
        {
          scrollTo: '#gameSport',
          class: 'about__toolbar__li-01',
        },
        {
          scrollTo: '#gameGclub',
          class: 'about__toolbar__li-02',
        },
        {
          scrollTo: '#gameRNG',
          class: 'about__toolbar__li-03',
        },
      ],
    };
  },
  mounted() {
    // * 根據 query 移動到該標籤，若不設延遲，重整會停在較上面的位置
    setTimeout(() => {
      this.$scrollTo(this.$route.query.scrollTo);
    }, 100);
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/about.scss`);
      },
    },
  },
};
</script>

<style scoped>
.about {
  margin-bottom: 160px;
}

.about-auth {
  padding-top: 88px;
}

.about__title {
  font-size: 40px;
  margin: 0;
  padding: 45px 0 10px 0;
  text-align: center;
}

.about__intro {
  width: 96%;
  margin: 0 auto;
}

.about__intro__title {
  text-align: left;
  font-size: 40px;
  margin: 20px 0 24px 15px;
}
.about__intro__content {
  display: block;
  margin: 0 2%;
  text-align: left;
  font-size: 32px;
  line-height: 50px;
  padding-bottom: 80px;
  word-break: break-word;
}

.about__toolbar {
  position: fixed;
  right: 10px;
  bottom: 145px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.about__toolbar__li {
  width: 70px;
  height: 70px;
  background: url(~@/assets/common/imgs/ui/gameIntro_sort.png) center top no-repeat;
}
.about__toolbar__li__link {
  display: block;
  height: 70px;
}

.about__toolbar__li-01 {
  background-position: center top;
}
.about__toolbar__li-02 {
  background-position: center center;
}
.about__toolbar__li-03 {
  background-position: center bottom;
}
</style>
