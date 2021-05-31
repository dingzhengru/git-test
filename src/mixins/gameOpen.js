import { mapGetters } from 'vuex';
import { apiGetGameUrl } from '@/api/game';
import { openNewWindowURL } from '@/utils/device';

export default {
  name: 'MixinGameOpen',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn', 'siteIsLandscape', 'siteIsWalletTypeNoTransfer']),
  },
  methods: {
    async openGame(game) {
      if (!this.userIsLoggedIn) {
        if (this.siteIsLandscape) {
          return this.$store.dispatch('openModalAuth');
        }
        return this.$router.push({ name: 'Login' });
      }
      const requestData = {
        Tag: game.Tag || this.productTag,
        Gameid: game.Lst_GameID,
        Freeplay: 0,
        GameClassify: this.productClassify,
      };

      const newWindow = window.open('/loading.html');

      const result = await apiGetGameUrl(requestData);

      if (result.Code == 200) {
        if (this.siteIsWalletTypeNoTransfer) {
          //* 免轉錢包的話，要更新錢包、於新視窗顯示轉移訊息

          if (result.RetObj.GameSitePoints.length > 0) {
            this.$store.commit('user/setPointInfo', result.RetObj);
          }

          if (result.RetObj.MsgString) {
            newWindow.alert(result.RetObj.MsgString);
          }
        }

        openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
      } else {
        newWindow.close();
        window.setTimeout(() => window.alert(result.ErrMsg), 500);
      }
    },
  },
};
