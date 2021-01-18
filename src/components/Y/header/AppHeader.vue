<template>
  <header class="header">
    <img :src="siteLogoUrl" class="header__logo" :id="$idMapper.header.logo" alt="" />

    <template v-if="siteStatus == 0">
      <router-link
        to="/"
        class="header__link header__link--home"
        :id="$idMapper.header.link.home"
        v-if="$route.meta['header-back-icon'] != true"
      ></router-link>
      <a class="header__link header__link--back" href="javascript:;" @click="$router.go(-1)" v-else></a>

      <component :is="AppHeaderMenu" v-if="!userIsLoggedIn" @changeLang="changeLang" />
      <component :is="AppHeaderMenuAuth" v-else @changeLang="changeLang" @logout="logout" />
    </template>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  props: {
    logo: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteLogoUrl', 'siteStatus', 'userIsLoggedIn']),
    AppHeaderMenu() {
      return () => import(`@/${this.siteSetting.components.header.AppHeaderMenu}`);
    },
    AppHeaderMenuAuth() {
      return () => import(`@/${this.siteSetting.components.header.AppHeaderMenuAuth}`);
    },
  },
  methods: {
    changeLang(lang) {
      this.$emit('changeLang', lang);
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 144px;
  &__logo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 425px;
  }

  &__link {
    display: inline-block;
    position: absolute;

    top: 35px;

    &--home {
      width: 77px;
      height: 65px;
      left: 20px;
    }

    &--back {
      width: 48px;
      height: 80px;
      left: 30px;
    }
  }
}
</style>
