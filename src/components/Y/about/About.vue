<template>
  <div class="about" :class="{ 'about-auth': userIsLoggedIn }">
    <h2 class="about__title">{{ $t('about.title') }}</h2>
    <div class="about__intro" :id="item.id" v-for="item in aboutList" :key="item.id">
      <img class="about__intro__img" :src="item.img" alt="" />
      <h2 class="about__intro__title">{{ $t(item.title) }}</h2>
      <span class="about__intro__content">{{ $t(item.content) }}</span>
    </div>

    <ul class="about__toolbar">
      <li class="about__toolbar__li" :class="[item.class]" v-for="item in toolList" :key="item.scrollTo">
        <a class="about__toolbar__li__link" v-scroll-to="{ el: item.scrollTo }"></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imgSport from '@/assets/common/game/gameIntro-01.jpg';
import imgGClub from '@/assets/common/game/gameIntro-02.jpg';
import imgRNG from '@/assets/common/game/gameIntro-03.jpg';

export default {
  name: 'About',
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
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
    import(`@/styles/${this.siteFullCss}/about.scss`);

    // * 根據 query 移動到該標籤，若不設延遲，重整會停在較上面的位置
    setTimeout(() => {
      this.$scrollTo(this.$route.query.scrollTo);
    }, 100);
  },
};
</script>
