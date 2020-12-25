<template>
  <AppModal>
    <transition name="fade">
      <div
        :id="idMapper.home.MainNotice"
        class="main-notice"
        :style="{ 'background-image': `url(${siteMainPageNoticeUrl})` }"
      ></div>
    </transition>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import idMapper from '@/idMapper';

export default {
  name: 'ModalMessage',
  props: {
    messageList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteMainPageNoticeUrl']),
  },
  data() {
    return {
      idMapper: idMapper,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-notice {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 4;
}
</style>
