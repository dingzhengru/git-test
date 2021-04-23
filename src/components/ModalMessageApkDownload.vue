<template>
  <ModalMessage @close="$emit('close')">
    <div class="modal-message-apk">
      <div>
        <p class="modal-message-apk__text"></p>
        <button @click="downloadAPK">Download APK</button>
      </div>
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
  button {
    display: block;
    margin: 30px auto;
    padding: 15px 30px;
    font-size: 1.5rem;
    color: #000;
    border: none;
  }

  &__text {
    text-align: center;
    color: #636363;
    font-size: 2rem;
    margin: 15px 0 15px;
  }
}
</style>
