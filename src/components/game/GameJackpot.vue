<template>
  <div class="game-jackpot">
    <span class="game-jackpot__text">{{ numeral(jackpot).format('0,0') }}</span>
  </div>
</template>

<script>
import numeral from 'numeral';
export default {
  props: {
    jackpot: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      numeral: numeral,
    };
  },
};
</script>

<style lang="scss" scoped>
.game-jackpot {
  position: relative;
  height: 71px;
  margin-bottom: 28px;
  background-repeat: no-repeat;
  background-position: center;

  &__text {
    position: absolute;
    left: 246px;
    top: 3px;
    font-size: 42px;
    font-family: Arial Black, sans-serif;
    font-weight: bold;
    color: #fffefe;
    background: linear-gradient(to bottom, #989898 0%, #ffffff 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
