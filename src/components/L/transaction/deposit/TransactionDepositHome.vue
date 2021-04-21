<template>
  <div class="deposit">
    <div class="deposit__nav" v-if="baseBankInfo.IsShowThirdPartyBtn === true"></div>

    <router-view @baseBankInfo="baseBankInfoHandler"></router-view>

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
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDepositHome',
  mixins: [mixinStyleLoader],
  components: {
    ModalNoticeImage: () => import('@/components/ModalNoticeImage'),
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteIsShowDepositNotice', 'siteDepositNoticeUrl']),
  },
  data() {
    return {
      isShowDepositNotice: false,
      baseBankInfo: {},
    };
  },
  methods: {
    baseBankInfoHandler(bankInfo) {
      this.baseBankInfo = bankInfo;
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);
    this.importStyleByFilename('transaction-deposit');

    //* 是否顯示 DepositNotice
    this.isShowDepositNotice = this.siteIsShowDepositNotice;
  },
};
</script>
