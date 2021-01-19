<template>
  <div class="forget-password">
    <h1 class="forget-password__title">{{ $t('forgetPassword.title') }}</h1>
    <img class="forget-password__icon" :src="forgetIcon" />
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
    forgetIcon() {
      return require(`@/assets/${this.siteFullCss}/main/forgetDescBg.png`);
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/forget-password.scss`);
  },
};
</script>
