<template>
  <div class="game">
    <div class="game-jackpot theme-slotgame-jackpot">
      <span id="proValue" class="ui-txt-jackpot-count">218,119,944</span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GameHome',
};
</script>

<style>
.game {
  padding-top: 88px;
  padding-bottom: 119px;
}

.game-jackpot {
  position: relative;
}


</style>
