<template>
  <div class="header-menu-auth">
    <div class="header-menu-auth__member">
      <div class="header-menu-auth__member__block" v-for="infoKey in userInfoKeyList" :key="infoKey">
        {{ $t(infoKey) }}：
        <template v-if="infoKey == 'header.user.username'">{{ username }}</template>
        <template v-else-if="infoKey == 'header.user.total'">{{ numeral(totalBalance).format('0,0.00') }}</template>
        <template v-else-if="infoKey == 'header.user.vip'">{{ PILevel }}</template>
        <template v-else-if="infoKey == 'header.user.roll'">{{ numeral(PIBetAmount).format('0,0.00') }}</template>
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
              {{ $t(route.name) }}
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
                :class="langItem.Lst_Locales_Code"
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
    totalBalance: {
      type: Number,
      default: () => 0,
    },
    PILevel: {
      type: Number,
      default: () => 0,
    },
    PIBetAmount: {
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
    width: 100%;
    min-height: 50px;
    padding: 0 15px;
    margin-bottom: 30px;
    font-size: 1.846em;
    line-height: 40px;
    position: absolute;
    top: 144px;
    left: 0;
    z-index: 2;

    &__block {
      width: 50%;
      display: inline-block;
    }

    &__block:nth-child(even) {
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

    &__route-ul {
      margin: 0;
      padding: 20px 0;

      &__li {
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

    &__lang-ul {
      padding: 0;
      margin: 0 0 60px 0;
      text-align: center;
      list-style-type: none;

      &__div {
        display: inline-block;
      }

      &__li {
        margin: 0 30px;

        &__link {
          display: block;
          width: 116px;
          background-repeat: no-repeat;
          background-position: center top;
          padding-top: 71px;
          color: #fff;
          font-size: 2.153em;

          &.zh-tw {
            background-image: url(~@/assets/common/imgs/lang/lang_zh-tw.png);
          }
          &.zh-cn {
            background-image: url(~@/assets/common/imgs/lang/lang_zh-cn.png);
          }
          &.en-us {
            background-image: url(~@/assets/common/imgs/lang/lang_en-us.png);
          }
          &.th-th {
            background-image: url(~@/assets/common/imgs/lang/lang_th-th.png);
          }
          &.my-mm {
            background-image: url(~@/assets/common/imgs/lang/lang_my-mm.png);
          }
        }
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
</style>
