<template>
  <div></div>
</template>

<script>
export default {
  name: 'PageNotFound',
  async beforeCreate() {
    this.$router.replace({ name: 'Home' });
  },
};
</script>

<style></style>
