<template>
  <div class="home">
    <div class="nav-tab">
      <div class="nav-tab__item" v-for="item in 10" :key="item">
        {{ item }}
      </div>
    </div>

    <div class="home__main"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style></style>
