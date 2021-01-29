<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionRecordAdjustment',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.transactionRecordAdjustment}`);
    },
  },
};
</script>
