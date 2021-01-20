<template>
  <div class="game-lobby-search">
    <form class="game-lobby-search__form" @submit.prevent="submitSearch">
      <input
        class="game-lobby-search__form__search"
        type="search"
        v-model="search.text"
        :placeholder="$t('game.placeholder.search')"
      />
      <button class="game-lobby-search__form__search-icon" type="submit"></button>
    </form>
    <button class="game-lobby-search__favorites" @click="changeIsFav" v-if="isShowLike"></button>
    <button class="game-lobby-search__button--transfer-now" @click="openTransferDialog">
      {{ $t('game.button.transferNow') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameSearchBlock',
  props: {
    isShowLike: {
      type: Boolean,
      default: false,
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
    openTransferDialog() {
      this.$emit('open-transfer-dialog');
    },
    changeIsFav() {
      this.search.isFav = !this.search.isFav;
      this.$emit('submit-search', this.search);
    },
    submitSearch() {
      this.$emit('submit-search', this.search);
    },
  },
};
</script>
