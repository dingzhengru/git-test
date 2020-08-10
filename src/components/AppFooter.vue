<template>
  <footer class="footer" v-if="!isHideFooter">
    <ul class="footer__ul">
      <li
        class="footer__ul__li"
        :class="[
          { 'footer__ul__li--active': $route.name == item.link || item.otherActivePath.includes($route.name) },
          item.class,
        ]"
        :id="item.id"
        v-for="item in list"
        :key="item.name"
      >
        <router-link :to="{ name: item.link }" class="footer__ul__li__link">
          {{ $t(item.name) }}
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
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
          id: 'member',
          name: 'footer.member',
          link: 'UserProfile',
          class: 'footer__ul__li--member',
          otherActivePath: [],
        },
        {
          id: 'login',
          name: 'footer.login',
          link: 'Login',
          class: 'footer__ul__li--regist',
          otherActivePath: ['Register'],
        },
        {
          id: 'event',
          name: 'footer.promotion',
          link: 'Promotion',
          class: 'footer__ul__li--event',
          otherActivePath: ['PromotionContent'],
        },
        {
          id: 'service',
          name: 'footer.contact',
          link: 'Contact',
          class: 'footer__ul__li--service',
          otherActivePath: [],
        },
      ],
      authList: [
        {
          id: 'member',
          name: 'footer.member',
          link: 'UserProfile',
          class: 'footer__ul__li--member',
          otherActivePath: ['UserChangePassword'],
        },
        {
          id: 'transaction',
          name: 'footer.transaction',
          link: 'TransactionDeposit',
          class: 'footer__ul__li--transaction',
          otherActivePath: [
            'TransactionWithdrawal',
            'TransactionTransfer',
            'TransactionRecord',
            'TransactionRecordContent',
            'TransactionRecordDetail',
          ],
        },
        {
          id: 'event',
          name: 'footer.promotion',
          link: 'Promotion',
          class: 'footer__ul__li--event',
          otherActivePath: ['PromotionContent'],
        },
        {
          id: 'service',
          name: 'footer.contact',
          link: 'Contact',
          class: 'footer__ul__li--service',
          otherActivePath: [],
        },
      ],
    };
  },
  watch: {
    isLoggedIn: {
      immediate: true,
      handler() {
        if (this.isLoggedIn) {
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
.footer {
  width: 100%;
  padding-top: 3px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 4;
}

.footer__ul {
  padding: 0;
  margin: 0;
}

.footer__ul__li {
  width: 25%;
  display: inline-block;
  vertical-align: top;
}
.footer__ul__li__link {
  display: table-cell;
  width: 25%;
  height: 119px;
  color: #fff;
  word-wrap: break-word;
  word-break: keep-all;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
}
.footer__ul__li:after {
  display: inline-block;
  content: '';
  width: 4px;
  height: 119px;
  position: absolute;
  top: 0;
}
.footer__ul__li:first-child:after {
  background: none;
}
.footer__ul__li--regist > .footer__ul__li__link {
  background-position: 24% 6px;
  text-indent: 12px;
}
.footer__ul__li--event > .footer__ul__li__link {
  background-position: 50% 6px;
}
.footer__ul__li--service > .footer__ul__li__link {
  background-position: 75% 6px;
}
.footer__ul__li--transaction > .footer__ul__li__link {
  background-position: 97% 6px;
}

/*
 * 語系
*/

.en-us .footer__ul__li__link {
  padding: 30% 0 0 0;
  font-size: 26px;
  line-height: 27px;
}

.th-th .footer__ul__li__link {
  padding: 24% 0 0 0;
  font-size: 30px;
  line-height: 28px;
}

.zh-cn .footer__ul__li__link {
  padding: 27% 0 0 0;
  font-size: 32px;
  line-height: 38px;
}
</style>
