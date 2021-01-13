<template>
  <div class="deposit" @click="isShowDepositNotice = false">
    <DepositModeNav :mode="mode" @change-mode="changeMode" />
    <DepositFormBase v-if="mode == 'base'" />
    <DepositFormThirdParty v-else-if="mode == 'thirdParty'" />

    <DepositNotice :isShow="isShowDepositNotice" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDeposit',
  components: {
    DepositModeNav: () => import('@/components/transaction/deposit/DepositModeNav'),
    DepositNotice: () => import('@/components/transaction/deposit/DepositNotice'),
    DepositFormBase: () => import('@/components/transaction/deposit/DepositFormBase'),
    DepositFormThirdParty: () => import('@/components/transaction/deposit/DepositFormThirdParty'),
  },
  computed: {
    ...mapGetters(['siteFullCss', 'siteIsShowDepositNotice']),
  },
  data() {
    return {
      mode: 'base',
      isShowDepositNotice: false,
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/transaction/deposit.scss`);

    //* 是否顯示 DepositNotice
    this.isShowDepositNotice = this.siteIsShowDepositNotice;
  },
};
</script>
