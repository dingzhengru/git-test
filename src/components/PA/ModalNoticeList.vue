<template>
  <AppModal @close="closeModal">
    <div class="ui-modal modal-notice">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__content no-title modal-notice__container">
        <div class="ui-notice">
          <ul>
            <slot name="top"></slot>
            <li v-for="(item, index) in noticeList" :key="index" v-html="getNoticeContent(item)"></li>
            <slot name="bottom"></slot>
          </ul>
        </div>

        <!-- <div class="modal-notice__image">
          <img :src="image" v-if="image" />
        </div> -->
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalNoticeList',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    noticeList: {
      type: Array,
      default: () => [],
    },
    image: {
      type: String,
      default: '',
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
