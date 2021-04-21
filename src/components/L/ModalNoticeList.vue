<template>
  <AppModal @close="closeModal">
    <div class="modal-notice">
      <div class="ui-box-close"></div>

      <div class="modal-notice__container">
        <div class="ui-notice">
          <ul>
            <li v-for="(item, index) in noticeList" :key="index" v-html="$t(item)"></li>
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
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
