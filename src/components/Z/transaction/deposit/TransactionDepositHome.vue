<template>
  <div class="deposit">
    <div class="deposit__nav" v-if="depositInfo.IsShowThirdPartyBtn === true">
      <button
        class="ui-btn ui-btn--block deposit__nav--base"
        :class="{ active: $route.name == 'TransactionDepositBase' }"
        @click="$router.push({ name: 'TransactionDepositBase' }).catch(() => {})"
      >
        {{ $t('transaction.deposit.nav.base') }}
      </button>
      <button
        class="ui-btn ui-btn--block deposit__nav--third-party"
        :class="{ active: $route.name == 'TransactionDepositThirdParty' }"
        @click="$router.push({ name: 'TransactionDepositThirdParty' }).catch(() => {})"
      >
        {{ $t('transaction.deposit.nav.thirdParty') }}
      </button>
    </div>

    <router-view :depositInfo="depositInfo" />

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
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);
    this.importStyleByFilename('transaction-deposit');
  },
};
</script>
