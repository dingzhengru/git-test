<template>
  <div class="game-lobby-search">
    <form class="game-lobby-search__form" @submit.prevent="submitSearch">
      <input
        class="game-lobby-search__input"
        type="text"
        v-model="search.text"
        :placeholder="$t('game.placeholder.search')"
      />
      <button class="game-lobby-search__btn--submit" type="submit"></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'GameSearchBlock',
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
