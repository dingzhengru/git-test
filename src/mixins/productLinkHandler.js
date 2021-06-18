import { mapGetters } from 'vuex';
import { apiGetGameRedirectUrl } from '@/api/game';
import { openNewWindowURL, openNewWindowHTML } from '@/utils/device';

export default {
  name: 'MixinGameLinkHandler',
  computed: {
    ...mapGetters(['userIsLoggedIn', 'siteIsWalletTypeNoTransfer']),
  },
  methods: {
    goInnerLobby(product) {
      this.$router.push({
        name: 'GameLobby',
        params: {
          classify: product.Lst_Game_Classify,
          id: product.Lst_Product_id,
          key: product.Lst_Proxy_Product_Key,
        },
        query: { category: '' },
      });
    },
    async goOuterLobby(product, target = '_blank') {
      if (!this.userIsLoggedIn) {
        return this.$router.push({ name: 'Register' });
      }

      const requestDataGameRedirectUrl = {
        Pid: product.Lst_Product_id,
        gameclassify: product.Lst_Game_Classify,
        proxypid: product.Lst_Proxy_Product_Key,
      };

      //* 因瀏覽器預設會擋非同步後開啟的視窗，所以需於送出請求前打開
      let newWindow = null;
      if (target === '_blank') {
        newWindow = window.open('/loading.html');
      }

      const result = await apiGetGameRedirectUrl(requestDataGameRedirectUrl);

      if (result.Code == 200) {
        //* iGameOpenType: 判斷回傳內容類型，1: 一般URL，2: HTML

        if (this.siteIsWalletTypeNoTransfer) {
          //* 免轉錢包的話，要更新錢包、於新視窗顯示轉移訊息

          if (result.RetObj.GameSitePoints.length > 0) {
            this.$store.commit('user/setPointInfo', result.RetObj);
          }

          if (result.RetObj.MsgString) {
            if (newWindow) {
              newWindow.alert(result.RetObj.MsgString);
            } else {
              window.alert(result.RetObj.MsgString);
            }
          }
        }

        if (result.RetObj.iGameOpenType == 1) {
          openNewWindowURL(newWindow, result.RetObj.RedirectUrl, target);
        } else if (result.RetObj.iGameOpenType == 2) {
          openNewWindowHTML(newWindow, result.RetObj.RedirectUrl, product.Lst_Name);
        }
      } else {
        newWindow.close();
        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
    handleProductLink(product) {
      /*
       * Lst_Game_Classify 分類分別是
       * 1: 真人(站內大廳)，2: 電子(站內大廳)，3: 運動(站外大廳)，4: 皇家彩票(站外大廳)
       */

      if (product.Lst_Site_Product_Status != 0) {
        window.alert(this.$t('alert.gameMaintenance'));
        return;
      }

      //* GetGameRedirectUrl，true: 外部連結
      if (product.GetGameRedirectUrl === true) {
        this.goOuterLobby(product);
      } else {
        this.goInnerLobby(product);
      }
    },
  },
};
