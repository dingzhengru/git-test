<template>
  <div class="forget-password">
    <div class="are-title"><h1 class="h1-title">Forgotten your account or passwords?</h1></div>
    <div class="are-desc">
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
    ...mapGetters(['lang', 'token', 'siteID', 'siteCssClass', 'siteCssVersion', 'siteCssType', 'siteCssFestival']),
  },
  mounted() {
    // * 根據版型引入 css
    const cssPath = `${this.siteCssClass}/${this.siteCssVersion}/${this.siteCssType}`;
    import(`@/styles/${cssPath}/forget-password.scss`);
  },
};
</script>

<style scoped>
.are-desc {
  padding-top: 316px;
  font-size: 2.769em;
  text-align: center;
}
</style>
