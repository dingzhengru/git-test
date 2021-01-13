import { apiGetGameRedirectUrl } from '@/api/game';
import { isIos, openNewWindowURL, openNewWindowHTML } from '@/utils/device';

export default {
  name: 'MixinGameLinkHandler',
  methods: {
    goInnerLobby(product) {
      let gameLobby = 'GameLobbySlot';

      if (product.Lst_Game_Classify == 1) {
        gameLobby = 'GameLobbyLive';
      } else if (product.Lst_Game_Classify == 2) {
        gameLobby = 'GameLobbySlot';
      }

      this.$router.push({
        name: gameLobby,
        params: {
          id: product.Lst_Product_id,
          key: product.Lst_Proxy_Product_Key,
        },
        query: { category: '' },
      });
    },
    async goOuterLobby(product) {
      const requestDataGameRedirectUrl = {
        Pid: product.Lst_Product_id,
        gameclassify: product.Lst_Game_Classify,
        proxypid: product.Lst_Proxy_Product_Key,
      };

      //* 因 IOS 預設會擋非同步後開啟的視窗，所以需於送出請求前打開
      let newWindow = null;
      if (isIos()) {
        newWindow = window.open('/loading.html');
      }

      const result = await apiGetGameRedirectUrl(requestDataGameRedirectUrl);

      if (result.Code == 200) {
        //* iGameOpenType: 判斷回傳內容類型，1: 一般URL，2: HTML

        if (result.RetObj.iGameOpenType == 1) {
          openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
        } else if (result.RetObj.iGameOpenType == 2) {
          openNewWindowHTML(newWindow, result.RetObj.RedirectUrl, product.Lst_Name);
        }
      } else {
        if (isIos()) {
          newWindow.close();
        }
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
