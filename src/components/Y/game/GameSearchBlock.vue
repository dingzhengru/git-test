<template>
  <div class="game-lobby-search">
    <form class="game-lobby-search__form" @submit.prevent="submitSearch">
      <input
        class="game-lobby-search__input"
        type="search"
        v-model="search.text"
        :placeholder="$t('game.placeholder.search')"
      />
      <button class="game-lobby-search__btn--submit" type="submit"></button>

      <div class="game-lobby-search__right">
        <button class="game-lobby-search__btn--fav" @click="changeIsFav" v-if="isShowLike"></button>
        <button class="game-lobby-search__btn--transfer" @click="openTransferDialog">
          {{ $t('game.button.transferNow') }}
        </button>
      </div>
    </form>
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
