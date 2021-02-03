<template>
  <div class="header-menu">
    <button class="header-menu__toggle" @click="isShowMenu = !isShowMenu" :class="{ open: isShowMenu }">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <transition name="slide-dropdown">
      <div class="header-menu__dropdown" v-show="isShowMenu">
        <div class="header-menu__dropdown__route">
          <div class="header-menu__dropdown__route__item" @click="changeRoute('About')">
            <i class="header-menu__dropdown__route__item__icon icon-about"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.menu.about') }}
            </a>
          </div>
          <div class="header-menu__dropdown__route__item" @click="changeRoute('News')">
            <i class="header-menu__dropdown__route__item__icon icon-news"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.menu.notification') }}
            </a>
          </div>
          <div class="header-menu__dropdown__route__item" v-if="userIsLoggedIn" @click="changeRoute('UserProfile')">
            <i class="header-menu__dropdown__route__item__icon icon-profile"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.menu.personalInfo') }}
            </a>
          </div>
          <div
            class="header-menu__dropdown__route__item"
            v-if="userIsLoggedIn"
            @click="changeRoute('NotificationInbox')"
          >
            <i class="header-menu__dropdown__route__item__icon icon-mail"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.menu.mail') }}
            </a>
          </div>
          <div
            class="header-menu__dropdown__route__item"
            v-if="userIsLoggedIn"
            @click="changeRoute('TransactionDepositBase')"
          >
            <i class="header-menu__dropdown__route__item__icon icon-transaction"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.menu.transaction') }}
            </a>
          </div>
          <div class="header-menu__dropdown__route__item" v-if="userIsLoggedIn" @click="logout">
            <i class="header-menu__dropdown__route__item__icon icon-logout"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t('header.button.logout') }}
            </a>
          </div>
        </div>
        <div class="header-menu__dropdown__lang">
          <button class="header-menu__dropdown__lang__toggle ui-btn" @click="isShowLangList = !isShowLangList">
            {{ langName }} <i class="header-menu__dropdown__lang__toggle__icon" :class="{ open: isShowLangList }"></i>
          </button>
          <transition name="slide-dropdown">
            <div class="header-menu__dropdown__lang__dropdown" v-show="isShowLangList">
              <template v-for="item in langList">
                <button
                  class="header-menu__dropdown__lang__dropdown__item ui-btn"
                  :key="item.Lst_Locales_Code"
                  :id="$idMapper.header[item.Lst_Locales_Code]"
                  @click="changeLang(item.Lst_Locales_Code)"
                  v-if="lang != item.Lst_Locales_Code && item.Lst_Is_Enable"
                >
                  {{ item.Lst_Locales_Name }}
                </button>
              </template>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeaderMenu',
  computed: {
    ...mapGetters(['lang', 'langList', 'langName', 'userIsLoggedIn']),
  },
  data() {
    return {
      isShowMenu: false,
      isShowLangList: false,
    };
  },
  methods: {
    changeRoute(name) {
      this.$router.push({ name });
      this.isShowMenu = false;
    },
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
