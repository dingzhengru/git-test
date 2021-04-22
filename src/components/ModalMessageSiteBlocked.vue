<template>
  <ModalMessage @close="$emit('close')">
    <div class="modal-message-block">
      <div v-if="$isStandaloneMode()">
        <p class="modal-message-block__text">被封網域訊息(下載 APK)</p>
        <button @click="downloadAPK">Download APK</button>
      </div>

      <div v-else>
        <p class="modal-message-block__text">被封網域訊息(轉址)</p>
        <button @click="redirectDomain">Redirect to {{ siteDomainRedirect }}</button>
      </div>
    </div>
  </ModalMessage>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ModalMessageSiteBlocked',
  components: {
    ModalMessage: () => import('@/components/ModalMessage'),
  },
  computed: {
    ...mapGetters(['siteDomainRedirect', 'siteAPKUrl']),
  },
  methods: {
    redirectDomain() {
      window.location.href = `https://${this.siteDomainRedirect}`;
    },
    downloadAPK() {
      window.open(this.siteAPKUrl(this.siteDomainRedirect));
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-message-block {
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
