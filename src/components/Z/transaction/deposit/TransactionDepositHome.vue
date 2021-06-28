<template>
  <div class="deposit">
    <div class="deposit__nav" v-if="depositInfo.IsShowThirdPartyBtn === true">
      <button
        class="ui-btn ui-btn--block deposit__nav__item"
        :class="{ active: navIsActive(item) }"
        v-for="(item, index) in navList"
        :key="index"
        @click="$router.push({ name: item.route, params: item.params })"
      >
        {{ $te(item.text) ? $t(item.text) : item.text }}
      </button>
    </div>

    <router-view :depositInfo="depositInfo" v-if="isDepositInfoLoaded" />

    <ModalNoticeImage
      :image="siteDepositNoticeUrl"
      type="deposit"
      @close="isShowDepositNotice = false"
      v-if="isShowDepositNotice"
    />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinTransactionDepositHome from '@/mixins/transactionDepositHome';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDepositHome',
  mixins: [mixinStyleLoader, mixinTransactionDepositHome],
  components: {
    ModalNoticeImage: () => import('@/components/ModalNoticeImage'),
  },
  computed: {
    ...mapGetters(['siteSetting']),
  },
  data() {
    return {
      navList: [
        {
          route: 'TransactionDepositBase',
          text: 'transaction.deposit.nav.base',
          params: {},
        },
      ],
    };
  },
  methods: {
    navIsActive(nav) {
      if (this.$isObjEmpty(nav.params)) {
        return this.$route.name === nav.route;
      }

      const payment = nav.params.payment;
      return this.$route.name === nav.route && this.$route.params.payment === payment;
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);
    this.importStyleByFilename('transaction-deposit');
  },
  watch: {
    depositInfo() {
      // let index = 1;
      // this.depositInfo.paymentSelect.forEach(item => {
      //   this.navList.splice(index, 0, {
      //     route: 'TransactionDepositThirdPartyPayment',
      //     params: { payment: item.Value },
      //     text: item.Text,
      //   });
      //   index = index + 1;
      // });

      this.depositInfo.paymentSelect.forEach(item => {
        this.navList.push({
          route: 'TransactionDepositThirdPartyPayment',
          params: { payment: item.Value },
          text: item.Text,
        });
      });

      if (this.depositInfo.AutoCashCount > 0) {
        this.navList.push({
          route: 'TransactionDepositAutoCash',
          text: 'transaction.deposit.nav.autoCash',
          params: {},
        });
      }
    },
  },
};
</script>
