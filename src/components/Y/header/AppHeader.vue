<template>
  <header class="header">
    <div class="header__logo">
      <img :src="siteLogoUrl" class="header__logo__img" :id="$idMapper.header.logo" alt="" />
    </div>

    <template v-if="siteStatus == 0">
      <router-link
        to="/"
        class="header__link header__link--home"
        :id="$idMapper.header.link.home"
        v-if="$route.meta['header-back-icon'] != true"
      ></router-link>
      <a class="header__link header__link--back" href="javascript:;" @click="$router.go(-1)" v-else></a>

      <component :is="HeaderMenu" v-if="!userIsLoggedIn" @changeLang="changeLang" />
      <component :is="HeaderMenuAuth" v-else @changeLang="changeLang" @logout="logout" />
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
    HeaderMenu() {
      return () => import(`@/${this.siteSetting.components.header.HeaderMenu}`);
    },
    HeaderMenuAuth() {
      return () => import(`@/${this.siteSetting.components.header.HeaderMenuAuth}`);
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

  &__logo {
    position: relative;
    height: 144px;

    &__img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 425px;
    }
  }

  &__link {
    display: inline-block;
    margin-top: -32.5px;
    position: absolute;

    &--home {
      width: 77px;
      height: 65px;
      top: 50%;
      left: 20px;
    }

    &--back {
      width: 48px;
      height: 80px;
      top: 45%;
      left: 30px;
    }
  }
}
</style>
