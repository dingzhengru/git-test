<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionRecordWithdrawal',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionRecordWithdrawal}`);
    },
  },
};
</script>
