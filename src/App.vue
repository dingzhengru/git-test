<template>
  <div id="app" :class="lang">
    <AppHeader
      :isLoggedIn="isLoggedIn"
      :langList="langList"
      :lang="lang"
      :logo="logo"
      :username="username"
      :total="total"
      :vip="vip"
      :roll="roll"
      @changeLang="changeLang"
      @logout="logout"
    ></AppHeader>

    <div class="main">
      <router-view />
    </div>

    <AppFooter :isLoggedIn="isLoggedIn"></AppFooter>

    <div class="Box" id="alertbox" v-if="isShowAlertBox && alertMessageList">
      <div class="Boxinner">
        <h1 class="h1-tit">
          <p v-for="(message, index) in alertMessageList" :key="index">
            {{ message.Lst_Content }}
          </p>
        </h1>
        <button id="CloseAlert" class="lnk-boxSubmit" @click="isShowAlertBox = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLangList, changeLang } from '@/api/lang';
import { getMessageList } from '@/api/alert';
export default {
  name: 'App',
  components: {
    AppHeader: () => import('@/components/AppHeader'),
    AppFooter: () => import('@/components/AppFooter'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'isLoggedIn',
      'siteID',
      'siteFullCss',
      'resourceUrl',
      'username',
      'total',
      'vip',
      'roll',
    ]),
  },
  data() {
    return {
      isShowAlertBox: false,
      alertMessageList: [],
      logo: '',
      langList: [],
      swiperList: [],
    };
  },
  mounted() {
    // * 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', '/manifest01.json');

    setTimeout(() => {
      this.$store.commit('user/setRoll', 444444);
    }, 5000);
  },
  methods: {
    changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      const requestDataChangeLang = { Lang: lang };
      changeLang(requestDataChangeLang).then(result => {
        if (result.Code == 200) {
          this.$store.commit('setLang', lang);
          console.log('[Lang]', 'changeLang:', result.RetObj);
        }
      });
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

        const faviconUrl = `${this.resourceUrl}/imgs/favicon/favicon.ico`;
        document.querySelector('#favicon').setAttribute('href', faviconUrl);

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/layout.scss`);
        import(`@/styles/${this.siteFullCss}/lang/zh-cn.scss`);
        import(`@/styles/${this.siteFullCss}/lang/en-us.scss`);
        import(`@/styles/${this.siteFullCss}/lang/th-th.scss`);

        // * header css
        import(`@/styles/${this.siteFullCss}/header.scss`);

        // * footer css
        import(`@/styles/${this.siteFullCss}/footer.scss`);

        // * 使用 siteInfo 拼湊 logo url
        this.logo = `${this.resourceUrl}/imgs/header/logo.png`;

        // * 取得語系列表
        getLangList().then(result => {
          if (result.Code == 200) {
            this.langList = result.RetObj;
            console.log('[Lang]', this.langList);
          }
        });

        // * 取得訊息列表(msgtype: C 彈出)
        const requestDataMessageList = { msgtype: 'C' };
        getMessageList(requestDataMessageList).then(result => {
          if (result.Code == 200) {
            this.alertMessageList = result.RetObj;
            console.log('[Message]', this.alertMessageList);
          }
        });
      },
    },
    lang() {
      // * 取得訊息列表(msgtype: C 彈出)
      const requestDataMessageList = { msgtype: 'C' };
      getMessageList(requestDataMessageList).then(result => {
        if (result.Code == 200) {
          this.alertMessageList = result.RetObj;
          console.log('[Message]', this.alertMessageList);
        }
      });
    },
  },
};
</script>

<style>

</style>
