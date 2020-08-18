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
      :id="
        route.id.split('.').reduce((item, key) => {
          return item[key];
        }, idMapper)
      "
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
import idMapper from '@/idMapper';

export default {
  name: 'AppNavigationTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      idMapper: idMapper,
    };
  },
};
</script>

<style scoped>
.tabs__ul {
  margin: 0;
  padding: 0;
  text-align: center;

  /* 避免換行 */
  /* white-space: nowrap; */
  /* word-break: break-word; */
}
.tabs__ul__li {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center top;
  border-right: 1px dotted #fff;
  list-style: none;
  vertical-align: top;
  /* word-break: break-word; */
  /* letter-spacing: normal; */
  /* word-spacing: normal; */
}
.tabs__ul__li:last-child {
  border-right: none;
}

.tabs__ul__li__link {
  display: block;
  min-width: 116px;
  max-width: 140px;
  margin: 0;
  padding: 102px 20px 0px 20px;
  /* margin: 0 25px; */
  /* padding-top: 102px; */
  color: #fff;
  font-size: 2.153em;
  text-align: center;
}
</style>
