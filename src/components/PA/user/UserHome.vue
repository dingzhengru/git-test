<template>
  <div class="user">
    <router-view />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';
export default {
  name: 'UserHome',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
  },
  mounted() {
    this.importStyleByFilename('user');
  },
};
</script>
