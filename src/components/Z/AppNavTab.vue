<template>
  <div class="nav-tab">
    <slot name="before"></slot>
    <div
      class="nav-tab__item"
      :class="[
        item.class ? item.class : '',
        {
          active: item.route == $route.name || (item.otherActiveRoute && item.otherActiveRoute.includes($route.name)),
        },
      ]"
      :id="item.id ? $getObjectValueByDotString($idMapper, item.id) : ''"
      v-for="item in list"
      :key="item.route"
    >
      <router-link class="nav-tab__item__link" :to="{ name: item.route }">
        {{ $t(item.text) }}
      </router-link>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppNavTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
