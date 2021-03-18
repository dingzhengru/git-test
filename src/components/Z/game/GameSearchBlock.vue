<template>
  <div class="game-lobby-search">
    <form class="game-lobby-search__form" @submit.prevent="submitSearch">
      <template v-if="isShowSearch">
        <input
          class="game-lobby-search__input"
          type="search"
          v-model="search.text"
          :placeholder="$t('game.placeholder.search')"
        />
        <button class="game-lobby-search__btn--submit" type="submit"></button>
      </template>
      <div class="game-lobby-search__right">
        <button class="game-lobby-search__btn--fav" @click="changeIsFav" v-if="isShowFav"></button>
        <button class="game-lobby-search__btn--transfer" @click="openTransferDialog" v-if="isShowTransfer">
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
    isShowSearch: {
      type: Boolean,
      default: false,
    },
    isShowFav: {
      type: Boolean,
      default: false,
    },
    isShowTransfer: {
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
