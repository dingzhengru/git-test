<template>
  <component :is="settingComponent" :depositInfo="depositInfo" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionDepositAutoCash',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionDepositAutoCash}`);
    },
  },
};
</script>
