<template>
  <header class="header">
    <div class="header__logo">
      <img :src="logo" class="header__logo__img" :id="idMapper.header.logo" alt="" />
    </div>
    <router-link to="/" class="header__link--home" :id="idMapper.header.link.home"></router-link>
    <HeaderMenu v-if="!isLoggedIn" :langList="langList" :lang="lang" @changeLang="changeLang"></HeaderMenu>
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
  max-height: 250px;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
}

/*
  * 刪除了登入後的 header 樣式，只留非登入時的樣式
  * 可於 common/header.css 或原專案的 layout 與 index2 中取得
*/

.header {
  position: relative;
}

.header__logo {
  position: relative;
  height: 144px;
}
.header__logo__img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.header__link--home {
  display: inline-block;
  width: 77px;
  height: 65px;
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  left: 20px;
}
</style>
