<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionRecordDeposit',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionRecordDeposit}`);
    },
  },
};
</script>
