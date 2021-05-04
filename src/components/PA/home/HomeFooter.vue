<template>
  <div class="home-footer">
    <div class="home-footer__left" @click="$router.push({ name: 'TransactionDepositHome' })">
      {{ $t('transaction.title') }}
    </div>
    <div class="home-footer__center">
      <div class="home-footer__icon home-footer__icon--promotion" @click="$router.push({ name: 'Promotion' })"></div>
      <div class="home-footer__icon home-footer__icon--mail" @click="$router.push({ name: 'UserMail' })">
        <span class="home-footer__icon__count" v-show="userIsLoggedIn && userNewMailCount > 0">
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
      <button
        class="home-footer__btn home-footer__btn--deposit"
        @click="$router.push({ name: 'TransactionDepositHome' })"
      >
        {{ $t('transaction.nav.deposit') }}
      </button>
      <button
        class="home-footer__btn home-footer__btn--withdrawal"
        @click="$router.push({ name: 'TransactionWithdrawal' })"
      >
        {{ $t('transaction.nav.withdrawal') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeFooter',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn', 'userNewMailCount']),
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

<style></style>
