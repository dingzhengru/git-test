<template>
  <AppModal :isShow="isShow" @click.native="$emit('close')">
    <div class="modal-notice-image">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <img :src="image" alt="" />
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalNoticeImage',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: () => '',
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteDepositNoticeUrl']),
  },
};
</script>

<style lang="scss" scoped>
.modal-notice-image {
  position: relative;
}
</style>
