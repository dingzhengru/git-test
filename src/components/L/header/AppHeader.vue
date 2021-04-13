<template>
  <header class="header">
    <!-- <img :src="siteLogoUrl" class="header__logo" /> -->
    <div>Logo</div>
    <button></button>

    <div class="header__right">
      <button class="header__lang-btn">
        
      </button>
    </div>
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
