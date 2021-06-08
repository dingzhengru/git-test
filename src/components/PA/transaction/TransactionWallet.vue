<template>
  <div class="transaction-wallet">
    <div class="nav-tab transaction-wallet__wallet">
      <div class="transaction-wallet__wallet__name">{{ $t('ui.label.wallet') }} :</div>
      <div class="transaction-wallet__wallet__amount">{{ $numeral(userGamePointWallet.Point).format('0,0.00') }}</div>
      <div class="nav-tab__item active" @click="refreshWallet">
        {{ $t('transaction.transfer.button.refresh') }}
        <template v-if="refreshButtonIsLoading">{{ `(${getCountdownTimeoutSecondCurrent}s)` }}</template>
      </div>
      <div class="nav-tab__item active" @click="transferAllPointToMain">
        {{ $t('ui.button.allToMyWallet-2') }}
      </div>
      <div class="nav-tab__item active" @click="$router.push({ name: 'TransactionTransfer' })">
        {{ $t('transaction.nav.transfer') }}
      </div>
    </div>
    <div class="transaction-wallet__product">
      <div
        class="transaction-wallet__product__item"
        v-for="item in userGamePointListNoWallet"
        :key="item.Product_id"
        @click="openTransferModal(item)"
      >
        <div class="transaction-wallet__product__item__name">{{ item.Product_Name }}</div>
        <div class="transaction-wallet__product__item__amount">{{ $numeral(item.Point).format('0,0.00') }}</div>
        <div class="transaction-wallet__product__item__overlay" v-show="!productEnabled(item)">
          {{ $t('ui.label.underMaintenance') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinAccountWallet from '@/mixins/accountWallet';

export default {
  name: 'TransactionWallet',
  mixins: [mixinStyleLoader, mixinAccountWallet],
  computed: {
    ...mapGetters(['userGamePointList', 'userGamePointWallet', 'productById']),
    userGamePointListNoWallet() {
      return this.userGamePointList.filter(item => item.Product_id !== 9999);
    },
  },
  methods: {
    productEnabled(product) {
      return this.productById(product.Product_id).Lst_Site_Product_Status === 0;
    },
    openTransferModal(product) {
      if (this.productEnabled(product) === false) {
        return;
      }
      this.$store.dispatch('openModalTransfer', product);
    },
  },
  mounted() {
    this.importStyleByFilename('transaction-wallet');
  },
};
</script>

<style></style>
