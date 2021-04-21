<template>
  <AppModal @close="closeModal">
    <div class="modal-notice">
      <div class="ui-notice">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
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
