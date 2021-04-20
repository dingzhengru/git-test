<template>
  <AppModal v-if="!!imageUrl" @close="$emit('close')">
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
  },
};
</script>
