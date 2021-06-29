<template>
  <div class="deposit">
    <div class="nav-tab deposit__nav" v-if="depositInfo.IsShowThirdPartyBtn === true">
      <div
        class="nav-tab__item deposit__nav__item"
        :class="{ active: navIsActive(item) }"
        v-for="(item, index) in navList"
        :key="index"
        @click="$router.push({ name: item.route, params: item.params })"
      >
        {{ $te(item.text) ? $t(item.text) : item.text }}
      </div>
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
        // {
        //   route: 'TransactionDepositAutoCash',
        //   text: 'transaction.deposit.nav.autoCash',
        //   params: {},
        // },
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

      if (this.$env === 'development') {
        if (this.depositInfo.AutoCashCount > 0) {
          this.navList.push({
            route: 'TransactionDepositAutoCash',
            text: 'transaction.deposit.nav.autoCash',
            params: {},
          });
        }
      }
    },
  },
};
</script>
