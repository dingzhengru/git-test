<template>
  <AppModal :isShow="isShow" @click.native="$emit('close')">
    <img :src="image" alt="" />
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

<style lang="scss" scoped></style>
