<template>
  <div class="home-footer">
    <div class="home-footer__left" @click="$router.push({ name: 'TransactionDepositHome' })">
      {{ $t('transaction.title') }}
    </div>
    <div class="home-footer__center">
      <div class="home-footer__icon home-footer__icon--promotion" @click="$router.push({ name: 'Promotion' })"></div>
      <div class="home-footer__icon home-footer__icon--mail" @click="$router.push({ name: 'UserMail' })">
        <span class="ui-box-count" v-show="userIsLoggedIn && userNewMailCount > 0">
          {{ userNewMailCount }}
        </span>
      </div>
      <div
        class="home-footer__icon home-footer__icon--fav"
        @click="changeRoute({ name: 'GameLobbyFav', params: { classify: 2 } })"
      ></div>
      <div class="home-footer__icon home-footer__icon--contact" @click="$store.dispatch('openModalContact')"></div>
    </div>
    <div class="home-footer__right">
      <div
        class="home-footer__right__block home-footer__deposit"
        @click="$router.push({ name: 'TransactionDepositHome' })"
      >
        <img class="home-footer__right__block__icon home-footer__deposit__icon" :src="imgButtonDeposit" />
      </div>
      <div
        class="home-footer__right__block home-footer__deposit"
        @click="$router.push({ name: 'TransactionWithdrawal' })"
      >
        <img class="home-footer__right__block__icon home-footer__deposit__icon" :src="imgButtonWithdrawal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeFooter',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userIsLoggedIn', 'userNewMailCount']),
    imgButtonDeposit() {
      try {
        return require(`@/assets/${this.siteFullCss}/footer/footer-btn-deposit-${this.lang}.png`);
      } catch {
        return '';
      }
    },
    imgButtonWithdrawal() {
      try {
        return require(`@/assets/${this.siteFullCss}/footer/footer-btn-withdrawal-${this.lang}.png`);
      } catch {
        return '';
      }
    },
  },
  methods: {
    changeRoute(route) {
      if (route.name === 'GameLobbyFav' && !this.userIsLoggedIn) {
        return this.$store.dispatch('openModalAuth');
      }
      this.$router.push(route);
    },
  },
};
</script>
