<template>
  <div></div>
</template>

<script>
export default {
  name: 'PageNotFound',
  beforeCreate() {
    this.$router.replace({ name: 'Home' });
  },
};
</script>

<style></style>
