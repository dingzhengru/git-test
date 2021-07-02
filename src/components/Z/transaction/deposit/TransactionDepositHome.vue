<template>
  <div class="deposit">
    <div class="deposit__nav" v-if="depositInfo.IsShowThirdPartyBtn === true">
      <button
        class="ui-btn ui-btn--block deposit__nav__item"
        :class="{ active: navIsActive(item) }"
        v-for="(item, index) in navList"
        :key="index"
        @click="$router.push({ name: item.route, params: item.params }).catch(() => {})"
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
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);
    this.importStyleByFilename('transaction-deposit');
  },
};
</script>
