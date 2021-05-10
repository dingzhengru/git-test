<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo__icon" :src="imgLogo" v-show="isShowLogo" />
      <img class="header__logo__back" :src="imgBack" @click="goRoutePrevious" v-show="isShowLogoBack" />
    </div>

    <div class="header__login" @click="$store.dispatch('openModalAuth')" v-if="isShowLogin">
      {{ `${$t('ui.button.login')}\\${$t('ui.button.register')}` }}
    </div>

    <div class="header__user" @click="$router.push({ name: 'UserProfile' }).catch(() => {})" v-show="isShowUser">
      <div class="header__user__account">
        <img class="header__user__account__icon" :src="imgUserAccount" />
        <div class="header__user__account__content">{{ userAccount }}</div>
      </div>
      <div class="header__user__vip">
        <img class="header__user__vip__icon" :src="imgUserVip" />
        <div class="header__user__vip__content">vip123</div>
      </div>
    </div>

    <div
      class="header__wallet"
      @click="$router.push({ name: 'TransactionTransfer' }).catch(() => {})"
      v-show="isShowWallet"
    >
      <img class="header__wallet__icon" :src="imgWalletIcon" alt="" />
      <span class="header__wallet__text" v-if="userIsLoggedIn">
        {{ $numeral(userGamePointWallet.Point).format('0,0.00') }}
      </span>
      <img class="header__wallet__arrow" :src="imgWalletArrow" alt="" />
    </div>

    <div class="header__right">
      <div
        class="header__lottery header__lottery--win-wheel"
        @click="$store.commit('setModalWinWheelIsShow', true)"
        v-if="isShowLottery"
      >
        <img class="header__lottery__text header__lottery__text--win-wheel" :src="imgLotteryIconWinWheelText" alt="" />
        <img class="header__lottery__icon header__lottery__icon--win-wheel" :src="imgLotteryIconWinWheel" alt="" />
      </div>
      <div
        class="header__lottery header__lottery--red-envelope"
        @click="$store.commit('setModalRedEnvelopeIsShow', true)"
        v-if="isShowLottery"
      >
        <img class="header__lottery__text header__lottery__text--red-envelope" :src="imgLotteryIconRedEnvelopeText" />
        <img class="header__lottery__icon header__lottery__icon--red-envelope" :src="imgLotteryIconRedEnvelope" />
      </div>
      <div class="header__lang" @click="$store.dispatch('openModalLang')" v-if="isShowLang"></div>
    </div>

    <component :is="ModalAuth" @close="$store.dispatch('closeModalAuth')" v-if="modalAuthIsShow" />
    <component :is="ModalLang" @close="$store.dispatch('closeModalLang')" v-if="modalLangIsShow" />
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
    ...mapGetters([
      'siteSetting',
      'lang',
      'siteLogoUrl',
      'userIsLoggedIn',
      'userAccount',
      'userGamePointWallet',
      'modalLangIsShow',
      'modalAuthIsShow',
      'siteFullCss',
    ]),
    ModalAuth() {
      return () => import(`@/${this.siteSetting.components.header.ModalAuth}`);
    },
    ModalLang() {
      return () => import(`@/${this.siteSetting.components.header.ModalLang}`);
    },
    isShowLogo() {
      return this.$route.name === 'Home';
    },
    isShowLogoBack() {
      return this.$route.name !== 'Home';
    },
    isShowLang() {
      return this.$route.name === 'Home';
    },
    isShowLogin() {
      return !this.userIsLoggedIn && this.$route.name === 'Home';
    },
    isShowUser() {
      return this.userIsLoggedIn && this.$route.name === 'Home';
    },
    isShowWallet() {
      return this.userIsLoggedIn && this.$route.name === 'Home';
    },
    isShowLottery() {
      return this.userIsLoggedIn && this.$route.name === 'Home';
    },
    imgLogo() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/logo.png`);
      } catch {
        return '';
      }
    },
    imgBack() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-back.png`);
      } catch {
        return '';
      }
    },
    imgWalletIcon() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-money-icon.png`);
      } catch {
        return '';
      }
    },
    imgWalletArrow() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-arrow-down.png`);
      } catch {
        return '';
      }
    },
    imgLangIcon() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-lang-icon.png`);
      } catch {
        return '';
      }
    },
    imgUserAccount() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-user-account.png`);
      } catch {
        return '';
      }
    },
    imgUserVip() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-user-vip.png`);
      } catch {
        return '';
      }
    },
    imgLotteryIconWinWheel() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-lottery-win-wheel-bg.png`);
      } catch {
        return '';
      }
    },
    imgLotteryIconWinWheelText() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-lottery-win-wheel-${this.lang}.png`);
      } catch {
        return '';
      }
    },
    imgLotteryIconRedEnvelope() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-lottery-red-envelope-bg.png`);
      } catch {
        return '';
      }
    },
    imgLotteryIconRedEnvelopeText() {
      try {
        return require(`@/assets/${this.siteFullCss}/header/header-lottery-red-envelope-${this.lang}.png`);
      } catch {
        return '';
      }
    },
  },
  methods: {
    goRoutePrevious() {
      if (this.$route.name === 'PromotionDetail') {
        return this.$router.push({ name: 'Promotion' });
      }
      this.$router.push({ name: 'Home' });
    },
    changeLang(lang) {
      this.$emit('changeLang', lang);
    },
    logout() {
      this.$emit('logout');
    },
  },
  watch: {
    userIsLoggedIn() {
      this.$store.dispatch('closeModalAuth');
    },
  },
};
</script>
