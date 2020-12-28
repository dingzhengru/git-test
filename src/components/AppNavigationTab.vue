<template>
  <ul class="tabs__ul">
    <li
      class="tabs__ul__li"
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
      <router-link class="tabs__ul__li__link" :to="{ name: item.link }">
        {{ $t(item.text) }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { getObjectValueByDotString } from '@/utils/object';

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
      getObjectValueByDotString: getObjectValueByDotString,
    };
  },
};
</script>

<style lang="scss" scoped>
.tabs__ul {
  margin: 0;
  padding: 0;
  text-align: center;
  /* 避免換行 */
  /* white-space: nowrap; */
  /* word-break: break-word; */

  &__li {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center top;
    border-right: 1px dotted #fff;
    list-style: none;
    vertical-align: top;
    /* word-break: break-word; */
    /* letter-spacing: normal; */
    /* word-spacing: normal; */

    &__link {
      display: block;
      min-width: 160px;
      max-width: 200px;
      margin: 0;
      padding: 102px 20px 0px 20px;
      /* margin: 0 25px; */
      /* padding-top: 102px; */
      color: #fff;
      font-size: 2.153em;
      text-align: center;
    }
  }
  &__li:last-child {
    border-right: none;
  }
}
</style>
