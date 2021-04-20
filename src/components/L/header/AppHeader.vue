<template>
  <header class="header">
    <!-- <img :src="siteLogoUrl" class="header__logo" /> -->
    <div class="header__logo" v-show="$route.name === 'Home'"></div>
    <div class="header__back" v-show="$route.name !== 'Home'" @click="goRoutePrevious"></div>

    <button class="header__btn header__btn--login" @click="$store.dispatch('openModalAuth')" v-if="!userIsLoggedIn">
      {{ `${$t('ui.button.login')}/${$t('ui.button.register')}` }}
    </button>

    <div class="header__user" v-if="userIsLoggedIn" @click="$router.push({ name: 'UserProfile' }).catch(() => {})">
      <div class="header__user__account">
        <span class="header__user__account__icon"></span>
        <div class="header__user__account__content">{{ userAccount }}</div>
      </div>
      <div class="header__user__vip">
        <span class="header__user__vip__icon"></span>
        <div class="header__user__vip__content">vip</div>
      </div>
    </div>

    <button
      class="header__btn header__btn--wallet"
      @click="$router.push({ name: 'TransactionTransfer' }).catch(() => {})"
    >
      <span class="header__btn--wallet__icon">$</span>
      <template v-if="userIsLoggedIn">
        {{ $numeral(userGamePointWallet.Point).format('0,0.00') }}
      </template>
    </button>

    <div class="header__right">
      <button
        class="header__lottery-btn--win-wheel"
        @click="$store.commit('setModalWinWheelIsShow', true)"
        v-if="userIsLoggedIn"
      ></button>
      <button
        class="header__lottery-btn--red-envelope"
        @click="$store.commit('setModalRedEnvelopeIsShow', true)"
        v-if="userIsLoggedIn"
      ></button>
      <button class="header__lang-btn" @click="$store.dispatch('openModalLang')"></button>
    </div>

    <component :is="ModalAuth" v-if="modalAuthIsShow" @close="$store.dispatch('closeModalAuth')" />
    <component :is="ModalLangMenu" v-if="modalLangIsShow" @close="$store.dispatch('closeModalLang')" />
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
      'siteLogoUrl',
      'userIsLoggedIn',
      'userAccount',
      'userGamePointWallet',
      'modalLangIsShow',
      'modalAuthIsShow',
    ]),
    ModalAuth() {
      return () => import(`@/${this.siteSetting.components.header.ModalAuth}`);
    },
    ModalLangMenu() {
      return () => import(`@/${this.siteSetting.components.header.ModalLangMenu}`);
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
};
</script>
