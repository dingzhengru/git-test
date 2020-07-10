<template>
  <footer class="reg-footer">
    <div class="lay-screen">
      <ul class="cpn-boxzero cpn-inBlock-row ul-footer-toolbar">
        <li class="li-footer-toolbar li-toolbar-member" :class="{ 'li-toolbar-active': false }">
          <router-link to="/login" class="lnk-footer-toolbar">Member Center</router-link>
        </li>
        <li
          class="li-footer-toolbar li-toolbar-regist"
          :class="{ 'li-toolbar-active': $route.name == 'Login' ||  $route.name == 'Register' }"
        >
          <router-link to="/login" class="lnk-footer-toolbar">Log in / Register</router-link>
        </li>
        <li
          class="li-footer-toolbar li-toolbar-event"
          :class="{ 'li-toolbar-active': $route.name.includes('Promotion') }"
        >
          <router-link to="/promotion" class="lnk-footer-toolbar">Promotions</router-link>
        </li>
        <li class="li-footer-toolbar li-toolbar-service" :class="{ 'li-toolbar-active': $route.name == 'Contact' }">
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/footer.scss`);
  },
};
</script>

<style scoped>
.reg-footer {
  z-index: 4;
}

.reg-footer {
  width: 100%;
  padding-top: 3px;
  position: fixed;
  left: 0;
  bottom: 0;
}
/*? .reg-footer > */
.li-footer-toolbar {
  width: 25%;
}
.lnk-footer-toolbar {
  display: table-cell;
  width: 25%;
  height: 119px;
  /* padding: 27% 0 0 0; */
  color: #fff;
  /* font-size: 32px; */
  /* line-height: 38px; */
  word-wrap: break-word;
  word-break: keep-all;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
}
.li-footer-toolbar:after {
  display: inline-block;
  content: '';
  width: 4px;
  height: 119px;
  position: absolute;
  top: 0;
}
.li-footer-toolbar:first-child:after {
  background: none;
}
/* .li-toolbar-member > .lnk-footer-toolbar {} */
.li-toolbar-regist > .lnk-footer-toolbar {
  background-position: 24% 6px;
  text-indent: 12px;
}
.li-toolbar-event > .lnk-footer-toolbar {
  background-position: 50% 6px;
}
.li-toolbar-service > .lnk-footer-toolbar {
  background-position: 75% 6px;
}
.li-toolbar-transaction > .lnk-footer-toolbar {
  background-position: 97% 6px;
}
</style>
