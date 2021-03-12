<template>
  <ModalMessage :isShow="isShow">
    <div class="modal-message-c">
      <div v-if="isStandaloneMode">
        <p class="modal-message-c__text">被封網域訊息(下載 APK)</p>
        <button @click="downloadAPK">Download APK</button>
      </div>

      <div v-else>
        <p class="modal-message-c__text">被封網域訊息(轉址)</p>
        <button @click="redirectDomain">Redirect to {{ siteDomainRedirect }}</button>
      </div>
    </div>
  </ModalMessage>
</template>

<script>
import { mapGetters } from 'vuex';
import { isStandaloneMode } from '@/utils/device';
export default {
  name: 'ModalSiteBlockedMessage',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ModalMessage: () => import('@/components/ModalMessage'),
  },
  computed: {
    ...mapGetters(['siteDomainRedirect', 'siteAPKUrl']),
    isStandaloneMode() {
      return isStandaloneMode();
    },
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
.modal-message-c {
  button {
    display: block;
    margin: 35px 0 0 auto;
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
