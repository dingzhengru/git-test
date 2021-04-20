<template>
  <div class="footer-nav">
    <div
      class="footer-nav__item"
      :class="[
        { active: $route.name == item.link || item.otherActiveRoute.includes($route.name) },
        `footer-nav__item--${item.name}`,
      ]"
      :id="$idMapper.footer[item.name]"
      v-for="item in routerList"
      :key="item.name"
    >
      <router-link :to="{ name: item.link }" class="footer-nav__item__link">
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
