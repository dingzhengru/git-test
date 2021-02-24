<template>
  <div class="about" :class="{ 'about-auth': userIsLoggedIn }">
    <h2 class="about__title">{{ $t('about.title') }}</h2>

    <div class="about__intro" id="gameSport">
      <img class="about__intro__img" :src="imgSport" />
      <h2 class="about__intro__title">{{ $t('about.sport.title') }}</h2>
      <span class="about__intro__content">{{ $t('about.sport.content') }}</span>
    </div>

    <div class="about__intro" id="gameGclub">
      <img class="about__intro__img" :src="imgGClub" />
      <h2 class="about__intro__title">{{ $t('about.GClub.title') }}</h2>
      <span class="about__intro__content">{{ $t('about.GClub.content') }}</span>
    </div>

    <div class="about__intro" id="gameRNG">
      <img class="about__intro__img" :src="imgRNG" />
      <h2 class="about__intro__title">{{ $t('about.RNG.title') }}</h2>
      <span class="about__intro__content">{{ $t('about.RNG.content') }}</span>
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

export default {
  name: 'About',
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    imgSport() {
      return require('@/assets/common/about/gameIntro-01.jpg');
    },
    imgGClub() {
      return require('@/assets/common/about/gameIntro-02.jpg');
    },
    imgRNG() {
      return require('@/assets/common/about/gameIntro-03.jpg');
    },
  },
  data() {
    return {
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
