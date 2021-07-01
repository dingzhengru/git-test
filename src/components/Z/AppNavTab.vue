<template>
  <div class="nav-tab">
    <div class="nav-tab__container" ref="navTabContainer" @scroll.passive="handelScrollArrowX($event.target)">
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
    </div>

    <div class="nav-tab__arrow nav-tab__arrow--left" v-show="isShowLeftArrow"></div>
    <div class="nav-tab__arrow nav-tab__arrow--right" v-show="isShowRightArrow"></div>
  </div>
</template>

<script>
import mixinScrollArrow from '@/mixins/_scrollArrow';
export default {
  name: 'AppNavTab',
  mixins: [mixinScrollArrow],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.handelScrollArrowX(this.$refs.navTabContainer);
  },
  watch: {
    list() {
      this.initScrollArrowX(this.$refs.navTabContainer);
    },
  },
};
</script>
