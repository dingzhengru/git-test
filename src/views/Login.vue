<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Login',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      console.log('siteSetting', this.siteSetting);
      console.log('siteSetting login', this.siteSetting.views.login);
      return () => import(`@/${this.siteSetting.views.login}`);
    },
  },
};
</script>
