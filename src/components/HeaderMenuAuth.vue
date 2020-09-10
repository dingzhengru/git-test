<template>
  <div class="header-menu-auth">
    <div class="header-menu-auth__member">
      <div class="header-menu-auth__member__block" v-for="infoKey in userInfoKeyList" :key="infoKey">
        {{ $t(infoKey) }}：
        <template v-if="infoKey == 'header.user.username'">{{ username }}</template>
        <template v-else-if="infoKey == 'header.user.total'">{{ numeral(total).format('0,0.00') }}</template>
        <template v-else-if="infoKey == 'header.user.vip'">{{ vip }}</template>
        <template v-else-if="infoKey == 'header.user.roll'">{{ numeral(roll).format('0,0.00') }}</template>
      </div>
    </div>
    <a
      href="javascript:;"
      class="header-menu-auth__button"
      :class="{ 'header-menu-auth__button--open': !isShowMenu, 'header-menu-auth__button--close': isShowMenu }"
      :id="idMapper.header.link.menu"
      @click="isShowMenu = !isShowMenu"
    ></a>
    <transition name="slide">
      <div class="header-menu-auth__menu" v-if="isShowMenu">
        <ul class="header-menu-auth__menu__route-ul">
          <li
            class="header-menu-auth__menu__route-ul__li"
            :id="idMapper.header.menu[route.name]"
            v-for="route in routeList"
            :key="route.name"
            @click="isShowMenu = false"
          >
            <router-link class="header-menu-auth__menu__route-ul__li__link" :to="{ name: route.link }">
              {{ $t(`header.menu.${route.name}`) }}
            </router-link>
          </li>
        </ul>
        <ul class="header-menu-auth__menu__lang-ul">
          <div
            class="header-menu-auth__menu__lang-ul__div"
            v-for="langItem in langList"
            :key="langItem.Lst_Locales_Code"
          >
            <li
              class="header-menu-auth__menu__lang-ul__li"
              @click="changeLang(langItem.Lst_Locales_Code)"
              v-if="langItem.Lst_Is_Enable"
            >
              <a
                href="javascript:;"
                class="header-menu-auth__menu__lang-ul__li__link"
                :id="idMapper.header[langItem.Lst_Locales_Code]"
                :class="{
                  tw: langItem.Lst_Locales_Code == 'zh-cn',
                  cn: langItem.Lst_Locales_Code == 'zh-cn',
                  th: langItem.Lst_Locales_Code == 'th-th',
                  en: langItem.Lst_Locales_Code == 'en-us',
                  mm: langItem.Lst_Locales_Code == 'my-mm',
                }"
                @click="isShowMenu = false"
              >
                {{ langItem.Lst_Locales_Name }}
              </a>
            </li>
          </div>
        </ul>
        <button type="button" class="header-menu-auth__logout" :id="idMapper.header.button.logout" @click="logout">
          {{ $t('header.button.logout') }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import idMapper from '@/idMapper';
import numeral from 'numeral';
export default {
  name: 'HeaderMenuAuth',
  props: {
    langList: {
      type: Array,
      default: () => [],
    },
    lang: {
      type: String,
      default: () => '',
    },
    username: {
      type: String,
      default: () => '',
    },
    total: {
      type: String,
      default: () => '',
    },
    vip: {
      type: String,
      default: () => '',
    },
    roll: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      numeral: numeral,
      idMapper: idMapper,
      isShowMenu: false,
      routeList: [
        {
          name: 'profile',
          link: 'UserProfile',
        },
        {
          name: 'transaction',
          link: 'TransactionDeposit',
        },
        {
          name: 'report',
          link: 'ReportHome',
        },
        {
          name: 'notification',
          link: 'NotificationHome',
        },
        {
          name: 'promotion',
          link: 'Promotion',
        },
        {
          name: 'about',
          link: 'About',
        },
      ],
      userInfoKeyList: ['header.user.username', 'header.user.total', 'header.user.vip', 'header.user.roll'],
    };
  },
  methods: {
    changeLang(lang) {
      this.$emit('changeLang', lang);
      this.isShowMenu = false;
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
/**
 ** 語系下拉動畫
 */
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave {
  max-height: 1000px;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
}

/*
  * memberInfo
*/

.header-menu-auth__member {
  width: 96%;
  min-height: 50px;
  padding: 0 15px;
  margin-bottom: 30px;
  font-size: 1.846em;
  line-height: 40px;
  position: absolute;
  top: 144px;
  left: 0;
  z-index: 2;
}

.header-menu-auth__member__block {
  width: 50%;
  display: inline-block;
}

.header-menu-auth__member__block:nth-child(even) {
  text-align: right;
}

/* .header-menu-auth__member__div {
  max-width: 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
} */

/* .header-menu-auth__member__div--left {
  float: left;
} */
/* .header-menu-auth__member__div--right {
  float: right;
} */

.header-menu-auth__member__text--vip {
  color: #d2ac3e;
}

/*
  * menu
*/

.header-menu-auth__button {
  display: inline-block;
}

.header-menu-auth__button--open {
  width: 70px;
  height: 58px;
  margin-top: -29px;
  position: absolute;
  top: 50%;
  right: 20px;
}

.header-menu-auth__button--close {
  width: 70px;
  height: 58px;
  margin-top: -29px;
  position: absolute;
  top: 50%;
  right: 20px;
}

.header-menu-auth__menu {
  width: 100%;
  height: 85vh;
  overflow: hidden;
  position: absolute;
  top: 144px;
  left: 0;
  z-index: 3;
  /* z-index: 6; */
}

.header-menu-auth__menu__route-ul {
  margin: 0;
  padding: 20px 0;
}
.header-menu-auth__menu__route-ul__li {
  margin: 35px 0;
}
.header-menu-auth__menu__route-ul__li__link {
  display: block;
  color: #d2bd7c;
  font-size: 2.923em;
  text-align: center;
  line-height: 48px;
}
.header-menu-auth__menu__route-ul__li__link:active {
  color: #fff;
}

.header-menu-auth__menu__lang-ul {
  padding: 0;
  margin: 0 0 60px 0;
  text-align: center;
  list-style-type: none;
}

.header-menu-auth__menu__lang-ul__div {
  display: inline-block;
}

.header-menu-auth__menu__lang-ul__li {
  margin: 0 30px;
}
.header-menu-auth__menu__lang-ul__li__link {
  display: block;
  width: 116px;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 71px;
  color: #fff;
  font-size: 2.153em;
}
.header-menu-auth__logout {
  display: block;
  width: 80%;
  margin: 0 10%;
  color: #000;
  font-size: 2.923em;
  line-height: 87px;
}

.tw.header-menu-auth__menu__lang-ul__li__link {
  background-image: url(~@/assets/common/imgs/header/lang_tw.png);
}
.cn.header-menu-auth__menu__lang-ul__li__link {
  background-image: url(~@/assets/common/imgs/header/lang_cn.png);
}
.en.header-menu-auth__menu__lang-ul__li__link {
  background-image: url(~@/assets/common/imgs/header/lang_en.png);
}
.th.header-menu-auth__menu__lang-ul__li__link {
  background-image: url(~@/assets/common/imgs/header/lang_th.png);
}
.mm.header-menu-auth__menu__lang-ul__li__link {
  background-image: url(~@/assets/common/imgs/header/lang_mm.png);
}
</style>
