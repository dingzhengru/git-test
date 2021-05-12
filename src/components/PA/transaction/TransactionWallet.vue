<template>
  <div class="transaction-wallet">
    <div class="nav-tab transaction-wallet__wallet">
      <div class="transaction-wallet__wallet__name">{{ $t('ui.label.wallet') }}：</div>
      <div class="ui-field transaction-wallet__wallet__amount">
        <input :value="userGamePointWallet.Point" />
      </div>
      <button class="transaction-wallet__wallet__btn" :disabled="refreshButtonIsLoading" @click="refreshWallet">
        {{ $t('transaction.transfer.button.refresh') }}
        <template v-if="refreshButtonIsLoading">{{ `(${getCountdownTimeoutSecondCurrent}s)` }}</template>
      </button>
      <button class="transaction-wallet__wallet__btn" @click="transferAllPointToMain">
        {{ $t('ui.button.allToMyWallet') }}
      </button>
      <button class="transaction-wallet__wallet__btn" @click="$router.push({ name: 'TransactionTransfer' })">
        {{ $t('transaction.nav.transfer') }}
      </button>
    </div>
    <div class="transaction-wallet__product">
      <div
        class="transaction-wallet__product__item"
        v-for="item in userGamePointListNoWallet"
        :key="item.Product_id"
        @click="$store.dispatch('openModalTransfer', item)"
      >
        <div class="transaction-wallet__product__item__name">{{ item.Product_Name }}</div>
        <div class="transaction-wallet__product__item__amount">{{ $numeral(item.Point).format('0,0.00') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';
import mixinAccountWallet from '@/mixins/accountWallet';

export default {
  name: 'TransactionWallet',
  mixins: [mixinStyleLoader, mixinAccountWallet],
  computed: {
    ...mapGetters(['userGamePointList', 'userGamePointWallet']),
    userGamePointListNoWallet() {
      return this.userGamePointList.filter(item => item.Product_id !== 9999);
    },
  },
  mounted() {
    this.importStyleByFilename('transaction-wallet');
  },
};
</script>

<style></style>
