<template>
  <component :is="settingComponent" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'GameLobby',
  computed: {
    ...mapGetters(['siteSetting']),
    settingComponent() {
      return () => import(`@/${this.siteSetting.views.gameLobby}`);
    },
  },
};
</script>
