<template>
  <transition name="fade">
    <div class="modal" @click.self="$emit('close')">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  left: 0;
  top: 0;
  margin: 0;
  background-color: rgba(#000, 0.6);
  z-index: 999;
}
</style>
