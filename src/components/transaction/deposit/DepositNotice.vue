<template>
  <AppModal :isShow="isShow">
    <img :src="siteDepositNoticeUrl" alt="" />
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DepositNotice',
  props: {
    isShow: {
      type: Boolean,
      default: false,
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
