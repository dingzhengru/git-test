<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      console.log('siteSetting', this.siteSetting);
      console.log('siteSetting home', this.siteSetting.views.home);
      return () => import(`@/${this.siteSetting.views.home}`);
    },
  },
};
</script>
