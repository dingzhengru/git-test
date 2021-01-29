<template>
  <div class="record">
    <div class="ui-field">
      <select class="ui-field__select" v-model="route">
        <option :value="{}">{{ $t('ui.label.pleaseSelect') }}</option>
        <option :value="item" v-for="item in routeList" :key="item.name">
          {{ $t(item.text) }}
        </option>
      </select>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionRecordHome',
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
  },
  data() {
    return {
      route: {},
      routeList: [
        {
          name: 'deposit',
          text: 'transaction.record.deposit',
          link: 'TransactionRecordDeposit',
        },
        {
          name: 'withdrawal',
          text: 'transaction.record.withdrawal',
          link: 'TransactionRecordWithdrawal',
        },
        {
          name: 'transfer',
          text: 'transaction.record.transfer',
          link: 'TransactionRecordTransfer',
        },
        {
          name: 'bonus',
          text: 'transaction.record.bonus',
          link: 'TransactionRecordBonus',
        },
        {
          name: 'lottery',
          text: 'transaction.record.lottery',
          link: 'TransactionRecordLottery',
        },
        {
          name: 'withdrawalRestriction',
          text: 'transaction.record.withdrawalRestriction',
          link: 'withdrawalRestriction',
        },
        {
          name: 'adjustment',
          text: 'transaction.record.adjustment',
          link: 'TransactionRecordAdjustment',
        },
        {
          name: 'bet',
          text: 'transaction.record.bet',
          link: 'TransactionRecordBet',
        },
      ],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-record.scss`);
  },
  watch: {
    route() {
      this.$router.push({ name: this.route.link });
    },
  },
};
</script>
