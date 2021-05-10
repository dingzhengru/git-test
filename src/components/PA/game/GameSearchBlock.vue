<template>
  <div class="game-lobby-search">
    <form class="game-lobby-search__form" @submit.prevent="submitSearch">
      <button class="game-lobby-search__btn--submit" type="submit">
        <img :src="imgSearchIcon" alt="" />
      </button>
      <input
        class="game-lobby-search__input"
        type="text"
        v-model="search.text"
        :placeholder="$t('game.placeholder.search')"
      />
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'GameSearchBlock',
  computed: {
    ...mapGetters(['siteFullCss']),
    imgSearchIcon() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/search-icon.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      search: {
        text: '',
        isFav: false,
      },
    };
  },
  methods: {
    submitSearch() {
      this.$emit('submit-search', this.search);
    },
  },
};
</script>
