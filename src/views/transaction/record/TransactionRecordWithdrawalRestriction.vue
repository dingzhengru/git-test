<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionRecordWithdrawalRestriction',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionRecordWithdrawalRestriction}`);
    },
  },
};
</script>
