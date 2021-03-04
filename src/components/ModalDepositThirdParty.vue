<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="modal-deposit-third-party" :style="{ width: `${width}px`, height: `${height}px` }">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <iframe id="deposit-iframe" :src="src" width="100%" height="100%"></iframe>
    </div>
  </AppModal>
</template>

<script>
import mixinMessageC from '@/mixins/messageC';
export default {
  name: 'ModalMessage',
  mixins: [mixinMessageC],
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    src: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 720,
    },
    height: {
      type: Number,
      default: 720,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
};
</script>

<style lang="scss" scoped>
.modal-deposit-third-party {
  width: 100%;
  height: 80%;
  position: relative;

  .ui-box-close {
    background: gray;

    &::after,
    &::before {
      background: white;
    }
  }
}
</style>
