<template>
  <div class="game-lobby__inquire">
    <form class="game-lobby__inquire__form" @submit.prevent="submitSearch">
      <input
        class="game-lobby__inquire__form__search"
        type="search"
        v-model="search.text"
        :placeholder="$t('game.placeholder.search')"
      />
      <button class="game-lobby__inquire__form__search-icon" type="submit"></button>
    </form>
    <button class="game-lobby__inquire__favorites" @click="changeIsFav" v-if="isShowLike"></button>
    <button class="game-lobby__inquire__button--transfer-now" @click="openTransferDialog">
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

<style lang="scss" scoped>
.game-lobby {
  &__inquire {
    position: relative;

    &__form {
      display: inline-block;
      position: relative;

      &__search {
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
      &__search-icon {
        top: 19px;
        right: 0;
        position: absolute;
        width: 53px;
        height: 71px;
        border: 0;
      }
    }

    &__favorites {
      width: 85px;
      height: 65px;
      margin: 0 0 16px 85px;
      font-size: 24px;
      border: 0;
      vertical-align: middle;
    }

    &__button--transfer-now {
      display: inline-block;
      width: 187px;
      height: 65px;
      /* font-size: 21px; */
      padding: 10px 10px 10px 48px;
      margin: 22px 10px 0 0;
      color: #fedebe;
      vertical-align: top;
      background: url(~@/assets/common/ui/btn_transferNow.png) left center no-repeat;
      border: none;
      float: right;
    }
  }
}

/*
 * 語系
*/

.en-us {
  .game-lobby__inquire__button--transfer-now {
    font-size: 1.5rem;
  }
}

.th-th {
  .game-lobby__inquire__button--transfer-now {
    font-size: 1.5rem;
  }
}

.zh-cn {
  .game-lobby__inquire__button--transfer-now {
    font-size: 2.4rem;
  }
}
</style>

<style scoped>
/* .game-lobby__inquire {
  position: relative;
} */

/* .game-lobby__inquire__form {
  display: inline-block;
  position: relative;
} */

/* .game-lobby__inquire__form__search {
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
} */

/* .game-lobby__inquire__form__search-icon {
  top: 19px;
  right: 0;
  position: absolute;
  width: 53px;
  height: 71px;
  border: 0;
} */

/* .game-lobby__inquire__favorites {
  width: 85px;
  height: 65px;
  margin: 0 0 16px 85px;
  font-size: 24px;
  border: 0;
  vertical-align: middle;
} */

/* .game-lobby__inquire__button--transfer-now {
  display: inline-block;
  width: 187px;
  height: 65px;
  padding: 10px 10px 10px 48px;
  margin: 22px 10px 0 0;
  color: #fedebe;
  vertical-align: top;
  background: url(~@/assets/common/ui/btn_transferNow.png) left center no-repeat;
  border: none;
  float: right;
} */
</style>
