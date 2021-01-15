<template>
  <AppModal>
    <transition name="fade">
      <div
        :id="$idMapper.home.MainNotice"
        class="main-notice"
        :style="{ 'background-image': `url(${siteMainPageNoticeUrl})` }"
      ></div>
    </transition>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import AppModal from '@/components/AppModal';

export default {
  name: 'ModalMessage',
  props: {
    messageList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AppModal,
  },
  computed: {
    ...mapGetters(['siteMainPageNoticeUrl']),
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
