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
import { getUserInfo } from '@/api/user';
import numeral from 'numeral';

// import { getGameUrl } from '@/api/game';

export default {
  name: 'App',
  components: {
    AppHeader: () => import('@/components/AppHeader'),
    AppFooter: () => import('@/components/AppFooter'),
  },
  computed: {
    ...mapGetters([
      'siteID',
      'siteFullCss',
      'token',
      'lang',
      'pwaInstallStatus',
      'pwaPrompt',
      'isLoggedIn',
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

    //* 一秒後沒觸發 beforeinstallprompt 的話，就視為已下載
    setTimeout(() => {
      if (this.pwaInstallStatus == null) {
        this.$store.commit('pwa/setStatus', 'installed');
      }
    }, 3000);

    //* PWA
    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallprompt event');

      //* 能進來此事件代表: 未安裝 pwa
      this.$store.commit('pwa/setStatus', 'notInstalled');

      event.preventDefault();
      this.$store.commit('pwa/setPrompt', event);

      // pwa下載視窗的選擇處理
      this.pwaPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          this.$store.commit('pwa/setStatus', 'installing');

          //* 五秒後設為已下載，因目前無事件可以確認是否安裝完成
          setTimeout(() => {
            this.$store.commit('pwa/setStatus', 'installed');
          }, 5000);
        }
      });
    });
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(result => {
        console.log('[UserInfo]', result);
        this.$store.commit('user/setUsername', result.RetObj.Lst_Account);
        this.$store.commit('user/setTotal', numeral(result.RetObj.Lst_TotalDeposit).format('0,0.00'));
        this.$store.commit('user/setRoll', result.RetObj.Lst_PI_BetAmount);
        this.$store.commit('user/setVip', result.RetObj.Lst_PI_Level);
        this.$store.commit('user/setIsAccessed', result.RetObj.Lst_Account_Open); // * 設置是否已開通
      });
    },
    changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      const requestDataChangeLang = { Lang: lang };
      changeLang(requestDataChangeLang).then(result => {
        if (result.Code == 200) {
          this.$store.commit('setLang', lang);
          console.log('[Lang]', 'changeLang:', lang, result.RetObj);
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

            this.langList = this.langList.map(item => {
              if (item.Lst_Locales_Code == 'th-th') {
                item.id = 'thTh';
              } else if (item.Lst_Locales_Code == 'en-us') {
                item.id = 'enUs';
              } else if (item.Lst_Locales_Code == 'zh-cn') {
                item.id = 'zhCn';
              } else if (item.Lst_Locales_Code == 'my-mm') {
                item.id = 'myMm';
              }

              return item;
            });

            console.log(this.langList);

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
    token: {
      immediate: true,
      handler() {
        /*
         * 這裡放需要 token 且是僅進入頁面才發需求的 API
         * ex: 使用者的上方資訊欄位
         */
        if (!this.token) {
          return;
        }

        if (this.isLoggedIn) {
          this.getUserInfo();

          // const requestDataGetGameUrl = { Tag: '1180-701', Gameid: '9008', Freeplay: '0' };

          // getGameUrl(requestDataGetGameUrl).then(result => {
          //   console.log('[Game]', result);
          // });
        }
      },
    },
    isLoggedIn() {
      /*
       * 這裡放登入後，馬上需要更新的 API
       */
      if (this.isLoggedIn) {
        this.getUserInfo();
      }
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

<style></style>
