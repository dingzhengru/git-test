<template>
  <div class="header-menu-auth">
    <div class="header-menu-auth__member">
      <div class="header-menu-auth__member__item">{{ $t('header.user.username') }}：{{ userAccount }}</div>
      <div class="header-menu-auth__member__item">
        {{ $t('header.user.total') }}：{{ $numeral(userTotalBalance).format('0,0.00') }}
      </div>
      <div class="header-menu-auth__member__item">{{ $t('header.user.vip') }}：{{ userPILevel }}</div>
      <div class="header-menu-auth__member__item">
        {{ $t('header.user.roll') }}：{{ $numeral(userPIBetAmount).format('0,0.00') }}
      </div>
    </div>
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
    ...mapGetters(['langList', 'userTotalBalance', 'userAccount', 'userPILevel', 'userPIBetAmount']),
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

.header-menu-auth {
  &__member {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 144px;
    left: 0;
    font-size: 1.846em;
    z-index: 2;

    &__item {
      width: 50%;
      padding: 3px 10px;
    }

    &__item:nth-child(even) {
      text-align: right;
    }

    &__text--vip {
      color: #d2ac3e;
    }
  }
  &__button {
    display: inline-block;

    &--open {
      width: 70px;
      height: 58px;
      margin-top: -29px;
      position: absolute;
      top: 50%;
      right: 20px;
    }

    &--close {
      width: 70px;
      height: 58px;
      margin-top: -29px;
      position: absolute;
      top: 50%;
      right: 20px;
    }
  }

  &__menu {
    width: 100%;
    height: 85vh;
    overflow: hidden;
    position: absolute;
    top: 144px;
    left: 0;
    z-index: 3;

    &__route {
      margin: 0;
      padding: 20px 0;

      &__item {
        margin: 35px 0;

        &__link {
          display: block;
          color: #d2bd7c;
          font-size: 2.923em;
          text-align: center;
          line-height: 48px;
        }

        &__link:active {
          color: #fff;
        }
      }
    }

    &__lang {
      margin: 0 0 60px 0;
      text-align: center;

      &__item {
        display: inline-block;
        width: 116px;
        height: 108px;
        line-height: 170px;
        color: #fff;
        font-size: 2.153em;
        margin: 0 30px;

        &.zh-tw {
          background: url(~@/assets/common/lang/lang_zh-tw.png) top center no-repeat;
        }
        &.zh-cn {
          background: url(~@/assets/common/lang/lang_zh-cn.png) top center no-repeat;
        }
        &.en-us {
          background: url(~@/assets/common/lang/lang_en-us.png) top center no-repeat;
        }
        &.th-th {
          background: url(~@/assets/common/lang/lang_th-th.png) top center no-repeat;
        }
        &.my-mm {
          background: url(~@/assets/common/lang/lang_my-mm.png) top center no-repeat;
        }
      }
    }
    &__logout {
      display: block;
      width: 80%;
      margin: 0 10%;
      color: #000;
      font-size: 2.923em;
      line-height: 87px;
    }
  }
}
</style>
