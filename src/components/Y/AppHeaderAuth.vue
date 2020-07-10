<template>
  <header class="reg-header">
    <div class="lay-screen">
      <div class="are-header-logo"></div>
      <router-link to="/" class="cpn-inBlock lnk-header-home"></router-link>
      <a
        href="javascript:;"
        class="cpn-inBlock"
        :class="{ 'lnk-header-menuOpen': !isShowMenu, 'lnk-header-menuClose': isShowMenu }"
        @click="isShowMenu = !isShowMenu"
      ></a>
      <transition name="slide">
        <div class="are-header-menu">
          <ul class="cpn-boxzero ul-menu">
            <li class="li-menu"><a href="/Y/AlreadyLogin/Profile/?Tag=ChangeAdvance" class="lnk-menu">Profile</a></li>
            <li class="li-menu"><a href="/Y/Operator/Deposit/" class="lnk-menu">Trade Center</a></li>
            <li class="li-menu"><a href="/Y/BetHistory/MainPage/?Tag=NoneFinal" class="lnk-menu">Report</a></li>
            <li class="li-menu"><a href="/Y/AlreadyLogin/News" class="lnk-menu">Latest News</a></li>
            <li class="li-menu"><a href="/Y/Promotion/AlreadyLogin/" class="lnk-menu">Promotions</a></li>
            <li class="li-menu"><a href="/Y/StaticPage/AlreadyLogin/?Tag=gameIntro" class="lnk-menu">About Us</a></li>
          </ul>
          <ul class="cpn-boxzero cpn-inBlock-row ul-lang">
            <li class="li-lang">
              <a href="javascript:void(0)" class="lnk-lang lnk-lang-cn"
                >简体中文</a
              >
            </li>
            <li class="li-lang">
              <a href="javascript:void(0)" class="lnk-lang lnk-lang-th"
                >ภาษาไทย</a
              >
            </li>
            <li class="li-lang">
              <a href="javascript:void(0)" class="lnk-lang lnk-lang-en"
                >English</a
              >
            </li>
          </ul>
          <button type="button" class="btn-header-logout" onclick="location.href='/Login/Logout/'">Logout</button>
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      langList: ['zh-cn', 'th-th', 'en-us'],
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
      this.isShowLangList = false;
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
</style>
