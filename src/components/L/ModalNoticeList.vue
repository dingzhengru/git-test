<template>
  <AppModal @close="closeModal">
    <div class="modal-notice">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="modal-notice__container">
        <div class="ui-notice">
          <ul>
            <li v-for="(item, index) in noticeList" :key="index" v-html="getNoticeContent(item)"></li>
          </ul>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalUserChangePassword',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    noticeList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    getNoticeContent(notice) {
      if (typeof notice === 'string') {
        return this.$t(notice);
      }

      if (typeof notice === 'object') {
        return this.$t(notice.text, notice.params);
      }
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
