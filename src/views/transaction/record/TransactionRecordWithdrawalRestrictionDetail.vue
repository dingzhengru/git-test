<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionRecordWithdrawalRestrictionDetail',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionRecordWithdrawalRestrictionDetail}`);
    },
  },
};
</script>
