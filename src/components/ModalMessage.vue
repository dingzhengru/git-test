<template>
  <AppModal :isShow="isShow">
    <div class="modal-message">
      <div class="modal-message__inner">
        <slot></slot>
      </div>
    </div>
  </AppModal>
</template>

<script>
export default {
  name: 'ModalMessage',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
};
</script>

<style lang="scss" scoped>
.modal-message {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 5;

  &__inner {
    width: 80%;
    padding: 25px;
    margin: 0 auto;
    background-color: #fff;
  }
}
</style>
