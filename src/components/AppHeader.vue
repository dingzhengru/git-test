<template>
  <header class="header">
    <div class="header__logo">
      <img :src="logo" class="header__logo__img" :id="idMapper.header.logo" alt="" />
    </div>

    <template v-if="siteStatus == 0">
      <router-link
        to="/"
        class="header__link header__link--home"
        :id="idMapper.header.link.home"
        v-if="!backIconRouteList.includes($route.name)"
      ></router-link>

      <a class="header__link header__link--back" href="javascript:;" @click="$router.go(-1)" v-else></a>

      <HeaderMenu v-if="!isLoggedIn" :langList="langList" :lang="lang" @changeLang="changeLang" />
      <HeaderMenuAuth
        v-if="isLoggedIn"
        :langList="langList"
        :lang="lang"
        :username="username"
        :total="total"
        :vip="vip"
        :roll="roll"
        @changeLang="changeLang"
        @logout="logout"
      ></HeaderMenuAuth>
    </template>
  </header>
</template>

<script>
// import HeaderMenu from './HeaderMenu';
// import HeaderMenuAuth from './HeaderMenuAuth';
import idMapper from '@/idMapper';

export default {
  name: 'AppHeader',
  components: {
    HeaderMenu: () => import('@/components/HeaderMenu'),
    HeaderMenuAuth: () => import('@/components/HeaderMenuAuth'),
  },
  props: {
    siteStatus: {
      type: Number,
      default: () => 0,
    },
    isLoggedIn: {
      type: Boolean,
      default: () => false,
    },
    langList: {
      type: Array,
      default: () => [],
    },
    lang: {
      type: String,
      default: () => '',
    },
    logo: {
      type: String,
      default: () => '',
    },
    username: {
      type: String,
      default: () => '',
    },
    total: {
      type: Number,
      default: () => 0,
    },
    vip: {
      type: Number,
      default: () => 0,
    },
    roll: {
      type: Number,
      default: () => 0,
    },
    backIconRouteList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      idMapper: idMapper,
      logoUrl: '',
    };
  },
  methods: {
    changeLang(lang) {
      this.$emit('changeLang', lang);
      this.isShowLangList = false;
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  &__logo {
    position: relative;
    height: 144px;

    &__img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
  }

  &__link {
    display: inline-block;
    margin-top: -32.5px;
    position: absolute;

    &--home {
      width: 77px;
      height: 65px;
      top: 50%;
      left: 20px;
    }

    &--back {
      width: 48px;
      height: 80px;
      top: 45%;
      left: 30px;
    }
  }
}
</style>

<style scoped>
/* .header {
  position: relative;
} */

/* .header__logo {
  position: relative;
  height: 144px;
} */
/* .header__logo__img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
} */

/* .header__link {
  display: inline-block;
  margin-top: -32.5px;
  position: absolute;
} */

/* .header__link--home {
  width: 77px;
  height: 65px;
  top: 50%;
  left: 20px;
} */

/* .header__link--back {
  width: 48px;
  height: 80px;
  top: 45%;
  left: 30px;
} */
</style>
