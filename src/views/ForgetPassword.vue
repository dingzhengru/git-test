<template>
  <div class="forget-password">
    <h1 class="forget-password__title">Forgotten your account or passwords?</h1>
    <div class="forget-password__desc">
      <span class="txt-note">Notice：</span> <br />
      Please contact with our online service, and submit any information to prove your identification of member.
      <span class="cpn-inBlock bg-forget"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ForgetPassword',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/forget-password.scss`);
      },
    },
  },
};
</script>

<style scoped>
.forget-password__title {
  text-align: center;
  margin-top: 0px;
  padding-top: 20px;
  font-size: 2rem;
}
.forget-password__desc {
  padding-top: 316px;
  font-size: 2.769em;
  text-align: center;
}
</style>
