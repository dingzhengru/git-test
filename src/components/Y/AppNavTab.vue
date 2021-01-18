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
import { mapGetters } from 'vuex';

export default {
  name: 'AppNavTab',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  data() {
    return {
      getObjectValueByDotString: getObjectValueByDotString,
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/nav-tab.scss`);
  },
};
</script>
