<template>
  <AppModal>
    <div class="modal-message">
      <div class="modal-message__inner">
        <div class="ui-box-close" @click="$emit('close')"></div>
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
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 5;

  &__inner {
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
    width: 80%;
    min-height: 15vh;
    padding: 75px 25px;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
