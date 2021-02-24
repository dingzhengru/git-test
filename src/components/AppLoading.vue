<template>
  <div class="loading">
    <img src="@/assets/common/ui/loading.gif" width="200" height="230" />
  </div>
</template>

<script>
export default {
  name: 'AppLoading',
};
</script>

<style lang="scss">
.loading {
  background: black;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.8;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
