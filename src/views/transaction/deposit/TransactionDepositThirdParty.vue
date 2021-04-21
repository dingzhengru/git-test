<template>
  <component :is="settingComponent" :depositInfo="depositInfo" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionDepositThirdParty',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionDepositThirdParty}`);
    },
  },
};
</script>
