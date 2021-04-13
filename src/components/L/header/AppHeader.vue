<template>
  <header class="header">
    <!-- <img :src="siteLogoUrl" class="header__logo" /> -->
    <div class="header__logo"></div>
    <button class="header__btn header__btn--login">登入\註冊</button>
    <button class="header__btn header__btn--wallet">
      <span class="header__btn--wallet__icon">$</span>
      1,000.00
    </button>

    <div class="header__right">
      <button class="header__lang-btn" @click="isShowModalLangMenu = true"></button>
    </div>

    <component :is="ModalLangMenu" :isShow="isShowModalLangMenu" @close="isShowModalLangMenu = false" />
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
  data() {
    return {
      isShowModalLangMenu: false,
    };
  },
  computed: {
    ...mapGetters(['pageTitle', 'siteSetting', 'siteLogoUrl', 'siteIsActive', 'userIsLoggedIn']),
    ModalLangMenu() {
      return () => import(`@/${this.siteSetting.components.header.ModalLangMenu}`);
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
