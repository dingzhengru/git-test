<template>
  <footer class="reg-footer" v-if="!isHideFooter">
    <div class="lay-screen">
      <ul class="cpn-boxzero cpn-inBlock-row ul-footer-toolbar">
        <li
          class="li-footer-toolbar li-toolbar-member"
          :class="[
            { 'li-toolbar-active': $route.name == item.link || item.otherActivePath.includes($route.name) },
            item.class,
          ]"
          v-for="item in list"
          :key="item.name"
        >
          <router-link :to="{ name: item.link }" class="lnk-footer-toolbar">{{ item.name }}</router-link>
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
    ...mapGetters(['lang', 'token', 'siteID', 'siteCssClass', 'siteCssVersion', 'siteCssType', 'siteCssFestival']),
    isHideFooter() {
      return this.hideFooterList.includes(this.$route.name);
    },
  },
  data() {
    return {
      hideFooterList: ['Agreement'],
      list: [],
      noAuthList: [
        {
          name: 'Member Center',
          link: 'UserProfile',
          class: 'li-toolbar-member',
          otherActivePath: [],
        },
        {
          name: 'Log in / Register',
          link: 'Login',
          class: 'li-toolbar-regist',
          otherActivePath: ['Register'],
        },
        {
          name: 'Promotions',
          link: 'Promotion',
          class: 'li-toolbar-event',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'Online Customer',
          link: 'Contact',
          class: 'li-toolbar-service',
          otherActivePath: [],
        },
      ],
      authList: [
        {
          name: 'Member Center',
          link: 'UserProfile',
          class: 'li-toolbar-member',
          otherActivePath: [],
        },
        {
          name: 'Cashier',
          link: 'TransactionDeposit',
          class: 'li-toolbar-transaction',
          otherActivePath: [],
        },
        {
          name: 'Promotions',
          link: 'Promotion',
          class: 'li-toolbar-event',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'Online Customer',
          link: 'Contact',
          class: 'li-toolbar-service',
          otherActivePath: [],
        },
      ],
    };
  },
  mounted() {
    // * 根據版型引入 css
    const cssPath = `${this.siteCssClass}/${this.siteCssVersion}/${this.siteCssType}`;
    import(`@/styles/${cssPath}/footer.scss`);
  },
  watch: {
    token: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.list = this.authList;
        } else {
          this.list = this.noAuthList;
        }
      },
    },
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
