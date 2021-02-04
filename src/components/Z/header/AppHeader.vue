<template>
  <header class="header">
    <img :src="siteLogoUrl" class="header__logo" :id="$idMapper.header.logo" alt="" v-show="!pageTitle" />
    <div class="header__title" v-show="pageTitle">{{ $t(pageTitle) }}</div>

    <template v-if="siteIsActive">
      <router-link
        to="/"
        class="header__link header__link--home"
        :id="$idMapper.header.link.home"
        v-if="$route.meta['header-back-icon'] != true"
      ></router-link>
      <a class="header__link header__link--back" href="javascript:;" @click="$router.go(-1)" v-else></a>

      <!-- <component :is="AppHeaderMenu" v-if="!userIsLoggedIn" @changeLang="changeLang" /> -->
      <!-- <component :is="AppHeaderMenuAuth" v-if="userIsLoggedIn" @changeLang="changeLang" @logout="logout" /> -->
      <component :is="AppHeaderMenu" @changeLang="changeLang" @logout="logout" />
      <component :is="AppHeaderSub" v-show="(!userIsLoggedIn && this.$route.name == 'Home') || userIsLoggedIn" />
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
    ...mapGetters(['pageTitle', 'siteSetting', 'siteLogoUrl', 'siteIsActive', 'userIsLoggedIn']),
    AppHeaderMenu() {
      return () => import(`@/${this.siteSetting.components.header.AppHeaderMenu}`);
    },
    AppHeaderMenuAuth() {
      return () => import(`@/${this.siteSetting.components.header.AppHeaderMenuAuth}`);
    },
    AppHeaderSub() {
      return () => import(`@/${this.siteSetting.components.header.AppHeaderSub}`);
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
