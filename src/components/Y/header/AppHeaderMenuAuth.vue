<template>
  <div class="header-menu-auth">
    <a
      href="javascript:;"
      class="header-menu-auth__button"
      :class="{ 'header-menu-auth__button--open': !isShowMenu, 'header-menu-auth__button--close': isShowMenu }"
      :id="$idMapper.header.link.menu"
      @click="isShowMenu = !isShowMenu"
    ></a>
    <transition name="slide">
      <div class="header-menu-auth__menu" v-if="isShowMenu">
        <ul class="header-menu-auth__menu__route">
          <li
            class="header-menu-auth__menu__route__item"
            :id="$idMapper.header.menu[item.name]"
            v-for="item in routeList"
            :key="item.name"
            @click="isShowMenu = false"
          >
            <router-link class="header-menu-auth__menu__route__item__link" :to="{ name: item.link }">
              {{ $t(item.name) }}
            </router-link>
          </li>
        </ul>
        <div class="header-menu-auth__menu__lang">
          <template v-for="item in langList">
            <div
              class="header-menu-auth__menu__lang__item"
              @click="changeLang(item.Lst_Locales_Code)"
              :key="item.Lst_Locales_Code"
              :class="item.Lst_Locales_Code"
              :id="$idMapper.header[item.Lst_Locales_Code]"
              v-if="item.Lst_Is_Enable"
            >
              {{ item.Lst_Locales_Name }}
            </div>
          </template>
        </div>
        <button
          type="button"
          class="header-menu-auth__menu__logout"
          :id="$idMapper.header.button.logout"
          @click="logout"
        >
          {{ $t('header.button.logout') }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeaderMenuAuth',
  computed: {
    ...mapGetters(['langList']),
  },
  data() {
    return {
      isShowMenu: false,
      routeList: [
        {
          name: 'header.menu.profile',
          link: 'UserProfile',
        },
        {
          name: 'header.menu.transaction',
          link: 'TransactionDeposit',
        },
        {
          name: 'header.menu.report',
          link: 'ReportHome',
        },
        {
          name: 'header.menu.notification',
          link: 'NotificationHome',
        },
        {
          name: 'header.menu.promotion',
          link: 'Promotion',
        },
        {
          name: 'header.menu.about',
          link: 'About',
        },
      ],
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

<style lang="scss" scoped>
//* 語系下拉動畫
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
</style>
