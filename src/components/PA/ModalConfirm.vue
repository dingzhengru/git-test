<template>
  <AppModal @close="closeModal">
    <div class="ui-modal modal-confirm">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__content no-title modal-confirm__container">
        <div></div>
        <div class="modal-confirm__text">{{ text }}</div>
        <div class="modal-confirm__btn">
          <button class="ui-btn ui-btn--lg modal-confirm__btn--close" @click="closeModal">
            {{ $t('ui.button.cancel') }}
          </button>
          <button class="ui-btn ui-btn--lg modal-confirm__btn--ok" @click="$emit('ok')">
            {{ $t('ui.button.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModalConfirm',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    text: {
      type: String,
      default: '',
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
