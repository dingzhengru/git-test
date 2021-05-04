<template>
  <div class="about" :class="{ 'about-auth': userIsLoggedIn }">
    <div class="ui-panel-tab">
      <component :is="PanelTabs" :list="tabList" />

      <div class="ui-panel-tab__content about__content">
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinStyleLoader from '@/mixins/_styleLoader';

export default {
  name: 'About',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters(['siteSetting', 'userIsLoggedIn']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
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
      tabList: [
        {
          route: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
        {
          route: 'News',
          text: 'news.title',
          otherActiveRoute: [],
        },
        {
          route: 'About',
          text: 'about.title',
          otherActiveRoute: [],
        },
      ],
    };
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/about.scss`);
    this.importStyleByFilename('about');

    this.$store.commit('setPageTitle', 'about.title');
  },
};
</script>
