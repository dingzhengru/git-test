<template>
  <ul class="ui-ul-tabs">
    <li
      class="ui-li-tabs"
      :class="[route.class, { 'ui-li-tabsActive': route.link == $route.name || (route.otherActivePath && route.otherActivePath.includes($route.name))  }]"
      v-for="route in list"
      :key="route.name"
    >
      <router-link class="ui-lnk-tabs" :to="{ name: route.link }">{{ route.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppNavigationTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
