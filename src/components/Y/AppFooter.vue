<template>
  <footer class="reg-footer">
    <div class="lay-screen">
      <ul class="cpn-boxzero cpn-inBlock-row ul-footer-toolbar">
        <li class="li-footer-toolbar li-toolbar-member">
          <a href="/Y/NoneLogin/LoginIn" class="lnk-footer-toolbar">Member Center</a>
        </li>
        <li class="li-footer-toolbar li-toolbar-regist">
          <a href="/Y/NoneLogin/LoginIn" class="lnk-footer-toolbar">Log in / Register</a>
        </li>
        <li class="li-footer-toolbar li-toolbar-event">
          <a href="/Y/Promotion/NoneLogin" class="lnk-footer-toolbar">Promotions</a>
        </li>
        <li class="li-footer-toolbar li-toolbar-service">
          <a href="/Y/StaticPage/NoneLogin?Tag=Service" class="lnk-footer-toolbar">Online Customer</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TypeYAppFooter',
  computed: {
    ...mapGetters(['type']),
  },
  mounted() {
    import(`@/styles/${this.type}/footer.scss`);
  },
};
</script>

<style scoped>
.reg-footer { z-index: 4;}
</style>
