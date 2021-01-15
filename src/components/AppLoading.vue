<template>
  <div class="container">
    <div class="img-loading">
      <img src="@/assets/common/ui/loading.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoading',
};
</script>

<style>
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000;
  opacity: 0.8;
  z-index: 9999;
}
.img-loading {
  width: 200px;
  height: 230px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
