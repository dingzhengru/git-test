<template>
  <div class="deposit" @click="isShowDepositNotice = false">
    <component :is="DepositModeNav" :mode="mode" @change-mode="changeMode" />
    <component :is="DepositFormBase" v-if="mode == 'base'" />
    <component :is="DepositFormThirdParty" v-else-if="mode == 'thirdParty'" />

    <DepositNotice :isShow="isShowDepositNotice" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDeposit',
  components: {
    DepositNotice: () => import('@/components/transaction/deposit/DepositNotice'),
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteIsShowDepositNotice']),
    DepositModeNav() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositModeNav}`);
    },
    DepositFormBase() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositFormBase}`);
    },
    DepositFormThirdParty() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositFormThirdParty}`);
    },
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
