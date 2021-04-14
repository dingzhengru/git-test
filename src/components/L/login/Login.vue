<template>
  <div></div>
</template>

<script>
export default {
  name: 'Login',
  beforeCreate() {
    this.$router.replace({ name: 'Home' });
    this.$store.dispatch('openModalAuth');
  },
};
</script>

<style></style>
