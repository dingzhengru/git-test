<template>
  <div class="game">
    <router-view />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'GameHome',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/game.scss`);
    this.importStyleByFilename('game');
  },
};
</script>
