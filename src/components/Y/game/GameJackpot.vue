<template>
  <div class="game-lobby-jackpot">
    <span class="game-lobby-jackpot__text">{{ $numeral(jackpot).format('0,0') }}</span>
  </div>
</template>

<script>
export default {
  props: {
    jackpot: {
      type: Number,
      default: () => 0,
    },
  },
};
</script>
