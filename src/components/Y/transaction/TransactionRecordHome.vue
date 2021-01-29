<template>
  <div class="record">
    <component :is="TransactionRecordRouterList" v-show="$route.name == 'TransactionRecordHome'" />

    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionRecordHome',
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
    TransactionRecordRouterList() {
      return () => import(`@/${this.siteSetting.components.transaction.record.TransactionRecordRouterList}`);
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-record.scss`);
  },
};
</script>
