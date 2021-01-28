<template>
  <div class="deposit">
    <component :is="DepositModeNav" />

    <router-view />

    <!-- <ModalNoticeImage
      :isShow="isShowDepositNotice"
      :image="siteDepositNoticeUrl"
      @close="isShowDepositNotice = false"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDeposit',
  components: {
    // ModalNoticeImage: () => import('@/components/ModalNoticeImage'),
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteIsShowDepositNotice', 'siteDepositNoticeUrl']),
    DepositModeNav() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositModeNav}`);
    },
  },
  data() {
    return {
      isShowDepositNotice: false,
    };
  },
  methods: {
    uploadReceipt() {
      this.$refs.receipt.click();
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);

    //* 是否顯示 DepositNotice
    this.isShowDepositNotice = this.siteIsShowDepositNotice;
  },
};
</script>
