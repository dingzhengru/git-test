<template>
  <ModalMessage @close="$emit('close')">
    <div class="modal-message-apk">
      <div class="modal-message-apk__text">
        {{ $t('alert.pwaToApkDownload') }}
      </div>
      <button @click="downloadAPK">{{ $t('ui.button.download') }}</button>
    </div>
  </ModalMessage>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ModalMessageApkDownload',
  components: {
    ModalMessage: () => import('@/components/ModalMessage'),
  },
  computed: {
    ...mapGetters(['siteAPKLink']),
  },
  methods: {
    downloadAPK() {
      window.open(this.siteAPKLink);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-message-apk {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__text {
    font-size: 2rem;
    text-align: center;
    color: #636363;
  }

  button {
    font-size: 1.5rem;
    color: #000;
    border: none;
    margin-top: 15px;
    padding: 15px 30px;
  }
}
</style>
