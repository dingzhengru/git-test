<template>
  <div class="about">
    <h2 class="about__title">ABOUT US</h2>
    <div class="about__intro" :id="item.id" v-for="item in aboutList" :key="item.id">
      <img class="about__intro__img" :src="item.img" alt="" />
      <h2 class="about__intro__title">{{ item.title }}</h2>
      <span class="about__intro__content">{{ item.content }}</span>
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
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      imgSport: imgSport,
      imgGClub: imgGClub,
      imgRNG: imgRNG,
      aboutList: [
        {
          id: 'gameSport',
          title: 'Sports',
          img: imgSport,
          content: `Offers a wide range of sporting event bets, including soccer, baseball, basketball and rugby, and other major
          sporting events in the world, offering the most accurate real-time event results and online betting services
          by a professional information management team. In addition to the diversification of events, but also in the
          various events in the design of many games are played, such as the ball and size, audience half, wave, the
          first goal / final goal.`,
        },
        {
          id: 'gameGclub',
          title: 'G-Club',
          img: imgGClub,
          content: `GClub locates in the resort of Cambodia POIPET. It established legally and our online casino is franchised.
        Royal Online has stable financial background and safe information system. Members can fully trust that your
        rights will be guaranteed completely. GClub is a casino which is licensed and ruled by the local laws of
        Cambodia and managed by local administration. GClub is a live and open casino. Member can trust in any
        circumstances, because the financial system is supervised by the rules and ruled by public. The information
        system is the same level with the bank's. It is highly reliable and safe.`,
        },
        {
          id: 'gameRNG',
          title: 'RNG',
          img: imgRNG,
          content: `Slot game ... provide more than 100 probability games, including slot machines, table games, arcade games,
        scratch music and other projects, in recent years more active development of multiplayer online game, wish you
        all the good luck, visual and acoustical effects Top-level entertainment, 4 level of gold pool and bonus game
        like a movie, unique style characters with current events, festivals and other topics, just want to give you a
        fun to enjoy the game experience`,
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
