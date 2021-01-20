<template>
  <div class="game">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameHome',
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/game.scss`);
  },
};
</script>
