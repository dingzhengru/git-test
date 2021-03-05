<template>
  <div class="home-product-nav nav-tab">
    <div
      class="nav-tab__item"
      :class="{ active: item.Lst_Game_Classify === classify }"
      v-for="item in productClassifyList"
      :key="item.Lst_Game_Classify"
      @click="$emit('change-product-nav', item.Lst_Game_Classify)"
    >
      {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeProductNav',
  computed: {
    ...mapGetters(['productClassifyList']),
  },
  props: {
    classify: {
      type: Number,
      default: 0,
    },
  },
};
</script>
