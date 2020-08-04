<template>
  <ul class="tabs__ul">
    <li
      class="tabs__ul__li"
      :class="[
        route.class,
        {
          active: route.link == $route.name || (route.otherActivePath && route.otherActivePath.includes($route.name)),
        },
      ]"
      v-for="route in list"
      :key="route.name"
    >
      <router-link class="tabs__ul__li__link" :to="{ name: route.link }">
        {{ $t(route.text) }}
      </router-link>
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

<style scoped>
.tabs__ul {
  margin: 0;
  padding: 0;
  text-align: center;
}
.tabs__ul__li {
  display: inline-block;
  zoom: 1;
  background-repeat: no-repeat;
  background-position: center top;
  border-right: 1px dotted #fff;
  list-style: none;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
}
.tabs__ul__li:last-child {
  border-right: none;
}

.tabs__ul__li__link {
  display: block;
  min-width: 116px;
  max-width: 140px;
  margin: 0 25px;
  padding-top: 102px;
  color: #fff;
  font-size: 2.153em;
  text-align: center;
}
</style>
