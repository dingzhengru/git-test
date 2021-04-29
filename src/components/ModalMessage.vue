<template>
  <AppModal>
    <div class="modal-message" :class="{ landscape: siteIsLandscape }">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <div class="modal-message__container" :class="{ landscape: siteIsLandscape }">
        <img :src="warningIcon" alt="" width="87" height="87" />
        <slot></slot>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ModalMessage',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteIsLandscape']),
    warningIcon() {
      return require('@/assets/common/ui/warning-icon.png');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-message {
  width: 80%;
  background: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: relative;
  z-index: 5;

  &__container {
    width: 100%;
    min-height: 20vh;
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    overflow-y: auto;

    img {
      margin-bottom: 15px;
    }

    &.landscape {
      min-height: 20vw;
      max-height: 80vw;
    }
  }
}
</style>
