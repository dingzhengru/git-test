<template>
  <div class="game">
    <div class="game__jackpot">
      <span class="game__jackpot__text">218,119,944</span>
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

.game__jackpot {
  position: relative;
  height: 71px;
  margin-bottom: 28px;
  background-repeat: no-repeat;
  background-position: center;
}

.game__jackpot__text {
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
</style>
