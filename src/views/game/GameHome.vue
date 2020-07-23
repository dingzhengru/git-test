<template>
  <div class="game-lobby">
    <div class="theme-slotgame">
      <div class="theme-slotgame-jackpot">
        <span id="proValue" class="ui-txt-jackpot-count">218,119,944</span>
      </div>
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
.game-lobby, .ui-txt-jackpot-count {
  padding-top: 88px;
}

</style>
