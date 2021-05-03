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
          <div
            class="header-menu__dropdown__route__item"
            v-for="item in routeListCurrent"
            :key="item.route"
            @click="$router.push({ name: item.route }).catch(() => {})"
          >
            <i class="header-menu__dropdown__route__item__icon" :class="`header-menu-${item.name}`"></i>
            <a class="header-menu__dropdown__route__item__link" href="javascript:;">
              {{ $t(`header.menu.${item.name}`) }}
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

        <PreviewButton v-if="siteIsPreview" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeaderMenu',
  components: {
    PreviewButton: () => import('@/components/PreviewButton'),
  },
  computed: {
    ...mapGetters(['lang', 'langList', 'langName', 'userIsLoggedIn', 'siteIsPreview']),
    routeListCurrent() {
      if (this.userIsLoggedIn) {
        return this.routeAuthList;
      }
      return this.routeList;
    },
  },
  data() {
    return {
      isShowMenu: false,
      isShowLangList: false,

      routeList: [
        {
          name: 'about',
          route: 'About',
        },
        {
          name: 'news',
          route: 'News',
        },
      ],

      routeAuthList: [
        {
          name: 'about',
          route: 'About',
        },
        {
          name: 'news',
          route: 'News',
        },
        {
          name: 'profile',
          route: 'UserProfile',
        },
        {
          name: 'mail',
          route: 'UserMail',
        },
        {
          name: 'transaction',
          route: 'TransactionDepositBase',
        },
      ],
    };
  },
  methods: {
    changeLang(lang) {
      this.$emit('changeLang', lang);
      this.isShowMenu = false;
      this.isShowLangList = false;
    },
    logout() {
      this.$emit('logout');
    },
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.isShowMenu = false;
      },
    },
  },
};
</script>
