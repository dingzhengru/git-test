<template>
  <div class="deposit">
    <div class="nav-tab deposit__nav" v-if="depositInfo.IsShowThirdPartyBtn === true">
      <div
        class="nav-tab__item deposit__nav__item"
        :class="{ active: navIsActive(item) }"
        v-for="(item, index) in navList"
        :key="index"
        @click="$router.push({ name: item.route, params: item.params }).catch(() => {})"
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
  mounted() {
    this.importStyleByFilename('transaction-deposit');
  },
};
</script>
