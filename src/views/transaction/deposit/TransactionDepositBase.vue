<template>
  <component :is="settingComponent" :depositInfo="depositInfo" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionDepositBase',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionDepositBase}`);
    },
  },
};
</script>
