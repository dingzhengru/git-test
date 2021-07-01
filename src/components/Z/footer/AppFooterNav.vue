<template>
  <div class="footer-nav">
    <div
      class="footer-nav__item"
      :class="[
        item.class ? item.class : '',
        { active: $route.name == item.route || item.otherActiveRoute.includes($route.name) },
      ]"
      :id="item.id ? $getObjectValueByDotString($idMapper, item.id) : ''"
      v-for="item in routerList"
      :key="item.route"
    >
      <router-link :to="{ name: item.route }" class="footer-nav__item__link">
        {{ $te(`${item.text}`) ? $t(`${item.text}`) : item.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routerList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
