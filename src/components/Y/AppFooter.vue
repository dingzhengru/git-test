<template>
  <footer class="reg-footer">
    <div class="lay-screen">
      <ul class="cpn-boxzero cpn-inBlock-row ul-footer-toolbar">
        <li class="li-footer-toolbar li-toolbar-member">
          <router-link to="/login" class="lnk-footer-toolbar">Member Center</router-link>
        </li>
        <li class="li-footer-toolbar li-toolbar-regist">
          <router-link to="/login" class="lnk-footer-toolbar">Log in / Register</router-link>
        </li>
        <li class="li-footer-toolbar li-toolbar-event">
          <router-link to="/promotion" class="lnk-footer-toolbar">Promotions</router-link>
        </li>
        <li class="li-footer-toolbar li-toolbar-service">
          <router-link to="/contact" class="lnk-footer-toolbar">Online Customer</router-link>
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
