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
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/game.scss`);
  },
};
</script>

<style lang="scss" scoped>
.game {
  padding-top: 88px;
  padding-bottom: 119px;
  min-height: 65vh;
}
</style>
