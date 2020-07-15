<template>
  <header class="reg-header">
    <div class="lay-screen">
      <div class="are-header-logo"></div>
      <div class="are-header-memberInfo">
        <div class="blk-memberInfo-left">
          <span class="txt-memberInfo-username">Username：{{ account || 'ding' }}</span> <br />
          <span class="txt-memberInfo-username">Bonus VIP level：{{ pointAmount || 0 }}</span>
        </div>
        <div class="blk-memberInfo-right">
          <span class="txt-memberInfo-cash">Total：{{ level || '0.00' }}</span> <br />
          <span class="txt-memberInfo-cash">Rolling：{{ washcodeAmount || '0.00' }}</span>
        </div>
      </div>
      <router-link to="/" class="cpn-inBlock lnk-header-home"></router-link>
      <a
        href="javascript:;"
        class="cpn-inBlock"
        :class="{ 'lnk-header-menuOpen': !isShowMenu, 'lnk-header-menuClose': isShowMenu }"
        @click="isShowMenu = !isShowMenu"
      ></a>
      <transition name="slide">
        <div class="are-header-menu" v-if="isShowMenu">
          <ul class="cpn-boxzero ul-menu">
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">Profile</router-link>
            </li>
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">Trade Center</router-link>
            </li>
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">Report</router-link>
            </li>
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">Latest News</router-link>
            </li>
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">Promotions</router-link>
            </li>
            <li class="li-menu" @click="isShowMenu = false">
              <router-link to="/" class="lnk-menu">About Us</router-link>
            </li>
          </ul>
          <ul class="cpn-boxzero ul-lang">
            <div class="ul-lang-div" v-for="langItem in langList" :key="langItem.Lst_Locales_Code">
              <li class="li-lang" @click="changeLang(langItem.Lst_Locales_Code)" v-if="langItem.Lst_Is_Enable">
                <a
                  href="javascript:;"
                  class="lnk-lang"
                  :class="{
                    'lnk-lang-cn': langItem.Lst_Locales_Code == 'zh-cn',
                    'lnk-lang-th': langItem.Lst_Locales_Code == 'th-th',
                    'lnk-lang-en': langItem.Lst_Locales_Code == 'en-us',
                    'lnk-lang-mm': langItem.Lst_Locales_Code == 'my-mm',
                  }"
                  @click="isShowMenu = false"
                >
                  {{ langItem.Lst_Locales_Name }}
                </a>
              </li>
            </div>
          </ul>
          <button type="button" class="btn-header-logout" @click="logout">Logout</button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TypeYAppHeaderAuth',
  computed: {
    ...mapGetters([
      'lang',
      'templateType',
      'templateVersion',
      'templateVersionNumber',
      'account',
      'pointAmount',
      'level',
      'washcodeAmount',
    ]),
  },
  props: {
    langList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowMenu: false,
    };
  },
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/header.scss`);
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('setLang', lang);
      this.isShowMenu = false;
    },
    logout() {
      this.$store.dispatch('user/logout');
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
  * 刪除了登入後的 header 樣式，只留非登入時的樣式 
  * 可於 common/header.css 或原專案的 layout 與 index2 中取得
*/

/*? .reg-header > */
.are-header-logo {
  height: 144px;
  padding: 0 117px;
}
.lnk-header-home {
  width: 77px;
  height: 65px;
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  left: 20px;
}

/*
  * menu
*/

.lnk-header-menuOpen {
  width: 70px;
  height: 58px;
  margin-top: -29px;
  position: absolute;
  top: 50%;
  right: 20px;
}

.lnk-header-menuClose {
  width: 70px;
  height: 58px;
  margin-top: -29px;
  position: absolute;
  top: 50%;
  right: 20px;
}

.are-header-memberInfo {
  width: 96%;
  min-height: 50px;
  padding: 0 15px;
  margin-bottom: 30px;
  font-size: 1.846em;
  line-height: 40px;
  position: absolute;
  top: 144px;
  left: 0;
}

.are-header-menu {
  width: 100%;
  height: 85vh;
  overflow: hidden;
  position: absolute;
  top: 144px;
  left: 0;
}

.ul-menu {
  padding: 20px 0;
}
.li-menu {
  margin: 35px 0;
}
.lnk-menu {
  display: block;
  color: #d2bd7c;
  font-size: 2.923em;
  text-align: center;
  line-height: 48px;
}
.lnk-menu:active {
  color: #fff;
}

.ul-lang {
  margin-bottom: 60px;
  text-align: center;
  list-style-type: none;
}

.ul-lang-div {
  display: inline-block;
}

.li-lang {
  margin: 0 30px;
}
.lnk-lang {
  display: block;
  width: 116px;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 71px;
  color: #fff;
  font-size: 2.153em;
}
.btn-header-logout {
  display: block;
  width: 80%;
  margin: 0 10%;
  color: #000;
  font-size: 2.923em;
  line-height: 87px;
}

/*
  * memberInfo
*/

.blk-memberInfo-left {
  float: left;
  max-width: 55%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blk-memberInfo-right {
  float: right;
}
.txt-vip {
  color: #d2ac3e;
}

.lnk-lang-tw {
  background-image: url(~@/assets/common/imgs/header/lang_tw.png);
}
.lnk-lang-cn {
  background-image: url(~@/assets/common/imgs/header/lang_cn.png);
}
.lnk-lang-en {
  background-image: url(~@/assets/common/imgs/header/lang_en.png);
}
.lnk-lang-th {
  background-image: url(~@/assets/common/imgs/header/lang_th.png);
}
.lnk-lang-mm {
  background-image: url(~@/assets/common/imgs/header/lang_mm.png);
}
</style>
