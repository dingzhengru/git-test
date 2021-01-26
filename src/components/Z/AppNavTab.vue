<template>
  <div class="nav-tab">
    <div
      class="nav-tab__item"
      :class="[
        item.class,
        {
          active: item.link == $route.name || (item.otherActivePath && item.otherActivePath.includes($route.name)),
        },
      ]"
      :id="item.id ? getObjectValueByDotString($idMapper, item.id) : ''"
      v-for="item in list"
      :key="item.name"
    >
      <router-link class="nav-tab__item__link" :to="{ name: item.link }">
        {{ $t(item.text) }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { getObjectValueByDotString } from '@/utils/object';
export default {
  name: 'AppNavTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      getObjectValueByDotString: getObjectValueByDotString,
    };
  },
};
</script>
