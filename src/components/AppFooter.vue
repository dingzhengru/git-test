<template>
  <footer class="footer">
    <ul class="footer__ul">
      <li
        class="footer__ul__li"
        :class="[
          { 'footer__ul__li--active': $route.name == item.link || item.otherActivePath.includes($route.name) },
          item.class,
        ]"
        :id="idMapper.footer[item.name]"
        v-for="item in list"
        :key="item.name"
      >
        <router-link :to="{ name: item.link }" class="footer__ul__li__link">
          {{ $te(`footer.${item.name}`) ? $t(`footer.${item.name}`) : item.name }}
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import idMapper from '@/idMapper';
import { mapGetters } from 'vuex';

export default {
  name: 'AppFooter',
  computed: {
    ...mapGetters(['userIsLoggedIn']),
  },
  data() {
    return {
      idMapper: idMapper,
      list: [],
      noAuthList: [
        {
          name: 'member',
          link: 'UserProfile',
          class: 'footer__ul__li--member',
          otherActivePath: [],
        },
        {
          name: 'login',
          link: 'Login',
          class: 'footer__ul__li--regist',
          otherActivePath: ['Register'],
        },
        {
          name: 'promotion',
          link: 'Promotion',
          class: 'footer__ul__li--event',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
          link: 'Contact',
          class: 'footer__ul__li--service',
          otherActivePath: [],
        },
      ],
      authList: [
        {
          name: 'member',
          link: 'UserProfile',
          class: 'footer__ul__li--member',
          otherActivePath: ['UserChangePassword'],
        },
        {
          name: 'transaction',
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
          name: 'promotion',
          link: 'Promotion',
          class: 'footer__ul__li--event',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
          link: 'Contact',
          class: 'footer__ul__li--service',
          otherActivePath: [],
        },
      ],
    };
  },
  watch: {
    userIsLoggedIn: {
      immediate: true,
      handler() {
        if (this.userIsLoggedIn) {
          this.list = this.authList;
        } else {
          this.list = this.noAuthList;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding-top: 3px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 4;

  &__ul {
    padding: 0;
    margin: 0;

    &__li {
      width: 25%;
      display: inline-block;
      vertical-align: top;

      &__link {
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

      &--regist > .footer__ul__li__link {
        background-position: 24% 6px;
        text-indent: 12px;
      }
      &--event > .footer__ul__li__link {
        background-position: 50% 6px;
      }
      &--service > .footer__ul__li__link {
        background-position: 75% 6px;
      }
      &--transaction > .footer__ul__li__link {
        background-position: 97% 6px;
      }
    }
    &__li:after {
      display: inline-block;
      content: '';
      width: 4px;
      height: 119px;
      position: absolute;
      top: 0;
    }
    &__li:first-child:after {
      background: none;
    }
  }
}

//* 語系

.en-us {
  .footer__ul__li__link {
    padding: 30% 0 0 0;
    font-size: 26px;
    line-height: 27px;
  }
}

.th-th {
  .footer__ul__li__link {
    padding: 24% 0 0 0;
    font-size: 30px;
    line-height: 28px;
  }
}

.zh-cn {
  .footer__ul__li__link {
    padding: 27% 0 0 0;
    font-size: 32px;
    line-height: 38px;
  }
}
</style>
