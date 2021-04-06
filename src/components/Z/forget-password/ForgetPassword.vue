<template>
  <div class="forget-password">
    <i class="forget-password__icon"></i>
    <div class="forget-password__desc">
      <span class="txt-note">{{ $t('forgetPassword.notice.title') }}</span> <br />
      {{ $t('forgetPassword.notice.content') }}
    </div>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'ForgetPassword',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/forget-password.scss`);
    this.importStyleByFilename('forget-password');

    this.$store.commit('setPageTitle', 'forgetPassword.title');
  },
};
</script>
