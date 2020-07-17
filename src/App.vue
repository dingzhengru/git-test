<template>
  <div id="app" class="lay-container" :class="lang">
    <TypeYAppHeader
      :token="token"
      :langList="langList"
      :lang="lang"
      :logo="logo"
      :account="account"
      :pointAmount="pointAmount"
      :level="level"
      :washcodeAmount="washcodeAmount"
      @changeLang="changeLang"
      @logout="logout"
    ></TypeYAppHeader>

    <div class="reg-main">
      <div class="lay-screen">
        <router-view />
      </div>
    </div>

    <TypeYAppFooter></TypeYAppFooter>

    <div class="Box" id="alertbox" v-if="isShowAlertBox">
      <div class="Boxinner">
        <h1 class="h1-tit">
          ** ประชาสัมพันธ์ : หากลูกค้าไม่ได้เข้าเล่นกับเว็ปเรานานเกิน 7 วัน
          รบกวนให้ติดต่อศูนย์บริการเพื่อติดต่อขอเลขบัญชีทุกครั้งด้วยนะคะ ขอบคุณค่ะ ------------------<br />
          CAESAR88 คาสิโนออนไลน์ บาคาร่า รูเล็ต ไฮโล สล็อตออนไลน์ ยิงปลา หมีแพนด้า ฟรีเกมส์ สมัครฟรี การเงิน มั่นคง
          ปลอดภัย ฝากถอนรวดเร็ว บริการตลอด 24 ชม.
        </h1>
        <button id="CloseAlert" class="lnk-boxSubmit" @click="isShowAlertBox = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLangList } from '@/api/lang';
export default {
  name: 'App',
  components: {
    TypeYAppHeader: () => import('@/components/Y/AppHeader'),
    TypeYAppFooter: () => import('@/components/Y/AppFooter'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'token',
      'siteID',
      'siteCssClass',
      'siteCssVersion',
      'siteCssType',
      'siteCssFestival',
      'siteRemoteCSSUrl',
      'siteMainDomain',
      'account',
      'pointAmount',
      'level',
      'washcodeAmount',
    ]),
  },
  data() {
    return {
      isShowAlertBox: false,
      logo: '',
      langList: [],
      swiperList: [],
    };
  },
  mounted() {
    // * 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', '/manifest01.json');

    // * 跟 siteInfo 有關的，都放到 watch 了，每次 siteInfo 變動就去改
    const staticResourceUrl = `{remoteCSSUrl}/ContentStyle/{mainDomain}/Member/{siteCssClass}/{siteCssVersion}/2/default/css{siteCssType}/common/imgs/favicon/favicon.ico`;
    console.log('靜態資源網址組成(favicon)', staticResourceUrl);
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('setLang', lang);
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        console.log(this.account)

        const faviconUrl = `${this.siteRemoteCSSUrl}/ContentStyle/${this.siteMainDomain}/Member/${this.siteCssClass}/${this.siteCssVersion}/2/default/css${this.siteCssType}/common/imgs/favicon/favicon.ico`;
        document.querySelector('#favicon').setAttribute('href', faviconUrl);

        // * 根據版型引入 css
        const cssPath = `${this.siteCssClass}/${this.siteCssVersion}/${this.siteCssType}`;
        import(`@/styles/${cssPath}/layout.scss`);
        import(`@/styles/${cssPath}/lang/zh-cn.scss`);
        import(`@/styles/${cssPath}/lang/en-us.scss`);
        import(`@/styles/${cssPath}/lang/th-th.scss`);

        // * header css
        import(`@/styles/${cssPath}/header.scss`);

        // * footer css
        import(`@/styles/${cssPath}/footer.scss`);

        // * 使用 siteInfo 拼湊 logo url
        this.logo = `${this.siteRemoteCSSUrl}/ContentStyle/${this.siteMainDomain}/Member/${this.siteCssClass}/${this.siteCssVersion}/2/default/css${this.siteCssType}/common/imgs/header/logo.png`;

        // * 取得語系列表
        const requestData = { siteID: this.siteID };
        getLangList(requestData).then(result => {
          if (result.Code == 200) {
            this.langList = result.RetObj;
            console.log(this.langList);
          }
        });
      },
    },
  },
};
</script>

<style></style>
