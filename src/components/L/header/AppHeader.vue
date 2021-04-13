<template>
  <header class="header">
    <!-- <img :src="siteLogoUrl" class="header__logo" /> -->
    <div class="header__logo"></div>
    <button class="header__btn header__btn--login" @click="isShowModalAuth = true">登入\註冊</button>
    <button class="header__btn header__btn--wallet" @click="clickWalletHandler">
      <span class="header__btn--wallet__icon">$</span>
      <template v-if="userIsLoggedIn">
        {{ $numeral(userGamePointWallet.Point).format('0,0.00') }}
      </template>
    </button>

    <div class="header__right">
      <button class="header__lang-btn" @click="isShowModalLangMenu = true"></button>
    </div>

    <component :is="ModalAuth" :isShow="isShowModalAuth" @close="isShowModalAuth = false" />
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
      isShowModalAuth: false,
      isShowModalLangMenu: false,
    };
  },
  computed: {
    ...mapGetters(['pageTitle', 'siteSetting', 'siteLogoUrl', 'siteIsActive', 'userIsLoggedIn', 'userGamePointWallet']),
    ModalAuth() {
      return () => import(`@/${this.siteSetting.components.header.ModalAuth}`);
    },
    ModalLangMenu() {
      return () => import(`@/${this.siteSetting.components.header.ModalLangMenu}`);
    },
  },
  methods: {
    clickWalletHandler() {
      if (this.userIsLoggedIn) {
        return this.router.push({ name: 'TransactionTransfer' }).catch(() => {});
      }
      this.isShowModalAuth = true;
    },
    changeLang(lang) {
      this.$emit('changeLang', lang);
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>
