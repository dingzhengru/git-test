<template>
  <AppModal @close="closeModal">
    <div class="modal-transfer">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="modal-transfer__container"></div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalTransfer',
  components: {
    AppModal: () => import('@/components/AppModal'),
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
