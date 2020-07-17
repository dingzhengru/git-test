<template>
  <header class="reg-header">
    <div class="lay-screen">
      <div class="are-header-logo">
        <img :src="logo" class="logo-img" alt="" />
      </div>
      <router-link to="/" class="cpn-inBlock lnk-header-home"></router-link>
      <HeaderMenu v-if="!token" :langList="langList" :lang="lang" @changeLang="changeLang"></HeaderMenu>
      <HeaderMenuAuth
        v-if="token"
        :langList="langList"
        :lang="lang"
        :account="account"
        :pointAmount="pointAmount"
        :level="level"
        :washcodeAmount="washcodeAmount"
        @changeLang="changeLang"
        @logout="logout"
      ></HeaderMenuAuth>
    </div>
  </header>
</template>

<script>
// import HeaderMenu from './HeaderMenu';
// import HeaderMenuAuth from './HeaderMenuAuth';
export default {
  name: 'AppHeader',
  components: {
    HeaderMenu: () => import('@/components/Y/HeaderMenu'),
    HeaderMenuAuth: () => import('@/components/Y/HeaderMenuAuth'),
  },
  props: {
    token: {
      type: String,
      default: () => '',
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
    account: {
      type: String,
      default: () => '',
    },
    pointAmount: {
      type: Number,
      default: () => '',
    },
    level: {
      type: Number,
      default: () => '',
    },
    washcodeAmount: {
      type: Number,
      default: () => '',
    },
  },
  data() {
    return {
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

/*? .reg-header > */
/* .are-header-logo {
  height: 144px;
  padding: 0 117px;
} */

.are-header-logo {
  position: relative;
  height: 144px;
}
.logo-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.lnk-header-home {
  width: 77px;
  height: 65px;
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  left: 20px;
}

.lnk-header-langOpen {
  width: 73px;
  height: 60px;
  position: absolute;
  top: 30%;
  right: 20px;
}
.are-header-langMenu {
  width: 90px;
  /* background: rgba(0, 0, 0, 0.9); */
  overflow: hidden;
  position: absolute;
  top: 141px;
  right: 12px;
  z-index: 2;
}

.ul-lang {
  margin-bottom: 0;
  text-align: center;
}

.li-lang {
  margin: 10px auto;
}

.lnk-lang {
  display: block;
  background: no-repeat center top;
  color: #fff;
  font-size: 2.153em;
  width: 60px;
  padding-top: 65px;
}

.lnk-ilang.tw {
  background-image: url(~@/assets/common/imgs/header/lang_tw_s.png);
}
.lnk-ilang.cn {
  background-image: url(~@/assets/common/imgs/header/lang_cn_s.png);
}
.lnk-ilang.en {
  background-image: url(~@/assets/common/imgs/header/lang_en_s.png);
}
.lnk-ilang.th {
  background-image: url(~@/assets/common/imgs/header/lang_th_s.png);
}
.lnk-lang.mm {
  background-image: url(~@/assets/common/imgs/header/lang_mm_s.png);
}
</style>
