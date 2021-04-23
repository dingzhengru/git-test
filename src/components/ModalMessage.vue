<template>
  <AppModal>
    <div class="modal-message">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <div class="modal-message__container">
        <img :src="warningIcon" alt="" width="87" height="87" />
        <slot></slot>
      </div>
    </div>
  </AppModal>
</template>

<script>
export default {
  name: 'ModalMessage',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    warningIcon() {
      return require('@/assets/common/ui/warning-icon.png');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-message {
  width: 80vw;
  background: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: relative;
  z-index: 5;

  &__container {
    width: 100%;
    min-height: 40vh;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    overflow-y: auto;
  }
}
</style>
