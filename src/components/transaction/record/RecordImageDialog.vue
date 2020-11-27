<template>
  <AppModal :isShow="!!imageUrl" @close="$emit('close')">
    <div class="record-image-dialog">
      <div class="ui-box-close" @click="$emit('close')"></div>

      <img :src="imageUrl" width="100%" />

      <div class="record-image-dialog__title">汇款收据</div>
    </div>
  </AppModal>
</template>

<script>
export default {
  name: 'RecordImageDialog',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    imageUrl: {
      type: String,
      default: () => '',
    },
    isShow: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped>
/* .record-image-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
} */
.record-image-dialog {
  width: 80%;
  /* height: 628px; */
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  overflow: auto;
  z-index: 9999;
  font-size: 2rem;
  padding: 60px 30px 30px 30px;
}

.record-image-dialog__title {
  font-size: 2.5rem;
  margin-top: 20px;
  text-align: center;
  color: #fee0a4 !important;
}
</style>
