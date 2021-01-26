<template>
  <div class="about" :class="{ 'about-auth': userIsLoggedIn }">
    <div class="about__item">
      <img class="about__item__img" :src="imgSport" alt="" />
      <div class="about__item__title">{{ $t('about.sport.title') }}</div>
      <div class="about__item__content">
        {{ $t('about.sport.content') }}
      </div>
    </div>

    <div class="about__item">
      <img class="about__item__img" :src="imgGClub" alt="" />
      <div class="about__item__title">{{ $t('about.GClub.title') }}</div>
      <div class="about__item__content">
        {{ $t('about.GClub.content') }}
      </div>
    </div>

    <div class="about__item">
      <img class="about__item__img" :src="imgRNG" alt="" />
      <div class="about__item__title">{{ $t('about.RNG.title') }}</div>
      <div class="about__item__content">
        {{ $t('about.RNG.content') }}
      </div>
    </div>
    <div class="about__icon--top" v-scroll-to="{ el: '#app' }"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'About',
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    imgSport() {
      return require('@/assets/common/game/gameIntro-01.jpg');
    },
    imgGClub() {
      return require('@/assets/common/game/gameIntro-02.jpg');
    },
    imgRNG() {
      return require('@/assets/common/game/gameIntro-03.jpg');
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/about.scss`);

    // * 根據 query 移動到該標籤，若不設延遲，重整會停在較上面的位置
    setTimeout(() => {
      this.$scrollTo(this.$route.query.scrollTo);
    }, 100);
  },
};
</script>
