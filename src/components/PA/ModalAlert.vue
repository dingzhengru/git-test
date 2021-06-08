<template>
  <transition name="fade" mode="out-in">
    <div class="modal-alert">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalAlert',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
