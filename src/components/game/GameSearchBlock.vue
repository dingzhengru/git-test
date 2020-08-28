<template>
  <div class="game-lobby__inquire">
    <form class="game-lobby__inquire-form" @submit.prevent="submitSearchForm">
      <input
        class="game-lobby__inquire__search"
        type="search"
        v-model="cloneSearch.text"
        :placeholder="$t('game.placeholder.search')"
        @input="inputSearchText"
      />
      <button class="game-lobby__inquire__search-icon" type="submit"></button>
    </form>
    <button class="game-lobby__inquire__favorites" @click="changeSearchIsLike" v-if="$route.params.type == 2"></button>
    <button class="game-lobby__inquire__button--transfer-now" @click="openTransferDialog">
      {{ $t('game.button.transferNow') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'GameSearchBlock',
  props: {
    search: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      cloneSearch: this.search,
    };
  },
  methods: {
    inputSearchText() {
      this.$emit('change-search', this.cloneSearch);
    },
    changeSearchIsLike() {
      this.cloneSearch.isLike = !this.cloneSearch.isLike;
      this.$emit('change-search', this.cloneSearch);
      this.$emit('submit-search-form', this.cloneSearch);
    },
    openTransferDialog() {
      this.$emit('open-transfer-dialog');
    },
    submitSearchForm() {
      this.$emit('submit-search-form', this.cloneSearch);
    },
  },
};
</script>

<style scoped>
.game-lobby__inquire {
  position: relative;
}

.game-lobby__inquire-form {
  display: inline-block;
  position: relative;
}

.game-lobby__inquire__search {
  width: 302px;
  background-size: cover;
  -webkit-background-size: cover;
  background-attachment: fixed;
  height: 59px;
  margin: 25px 0 31px 34px;
  font-size: 24px;
  border: 0;
  text-indent: 20px;
  outline: none;
}

.game-lobby__inquire__search-icon {
  top: 19px;
  /* left: 280px; */
  right: 0;
  position: absolute;
  width: 53px;
  height: 71px;
  border: 0;
}

.game-lobby__inquire__favorites {
  width: 85px;
  height: 65px;
  margin: 0 0 16px 85px;
  font-size: 24px;
  border: 0;
  vertical-align: middle;
}

.game-lobby__inquire__button--transfer-now {
  display: inline-block;
  width: 187px;
  height: 65px;
  /* font-size: 21px; */
  padding: 10px 10px 10px 48px;
  margin: 22px 10px 0 0;
  color: #fedebe;
  vertical-align: top;
  background: url(~@/assets/common/imgs/ui/btn_transferNow.png) left center no-repeat;
  border: none;
  float: right;
}

/*
 * 語系
*/

.en-us .game-lobby__inquire__button--transfer-now {
  font-size: 1.5rem;
}

.th-th .game-lobby__inquire__button--transfer-now {
  font-size: 1.5rem;
}

.zh-cn .game-lobby__inquire__button--transfer-now {
  font-size: 2.4rem;
}
</style>
