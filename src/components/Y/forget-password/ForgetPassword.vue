<template>
  <div class="forget-password">
    <h1 class="forget-password__title">{{ $t('forgetPassword.title') }}</h1>
    <i class="forget-password__icon"></i>
    <div class="forget-password__desc">
      <span class="txt-note">{{ $t('forgetPassword.notice.title') }}</span> <br />
      {{ $t('forgetPassword.notice.content') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ForgetPassword',
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/forget-password.scss`);
  },
};
</script>
