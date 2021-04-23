<template>
  <div></div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionWallet',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters([]),
  },
  mounted() {
    this.importStyleByFilename('transaction-wallet');
  },
};
</script>

<style></style>
