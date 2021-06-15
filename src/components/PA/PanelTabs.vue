<template>
  <div class="ui-panel-tab__tabs">
    <slot name="before"></slot>
    <div
      class="ui-panel-tab__tabs__item"
      :class="{ active: item.route === $route.name || item.otherActiveRoute.includes($route.name) }"
      v-for="(item, index) in list"
      :key="index"
      @click="$router.push({ name: item.route }).catch(() => {})"
    >
      {{ $t(item.text) }}
    </div>

    <slot name="after"></slot>
  </div>
</template>

<script>
export default {
  name: 'PanelTabs',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
