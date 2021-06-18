/**
 ** Lst_LinkType int 連結類型(0 : 無、1 : 自定義、2 : 優惠活動、3：遊戲館)
 */

import mixinGameOpen from '@/mixins/gameOpen';

export default {
  name: 'MixinLinkUrl',
  mixins: [mixinGameOpen],
  methods: {
    goLinkUrlByTypeAndUrl(type, url, target = '_self') {
      console.log(type, url);

      if (type === 1) {
        window.open(url, target);
      } else if (type === 2) {
        if (target === '_blank') {
          return this.openRouteBlank({ name: 'PromotionDetail', params: { id: url } });
        }
        this.$router.push({ name: 'PromotionDetail', params: { id: url } });
      } else if (type === 3) {
        const [classify, id, key] = url.split('/');

        if (classify === '3') {
          const game = { Tag: `${id}-${key}`, Lst_GameID: id, Lst_Classify: classify };
          return this.openGame(game);
        }

        if (target === '_blank') {
          return this.openRouteBlank({ name: 'GameLobby', params: { classify, id, key } });
        }
        this.$router.push({ name: 'GameLobby', params: { classify, id, key } });
      }
    },
    goLinkUrlByPromotion(promotion) {
      //* 優惠活動多一個 0 會進 detail
      const id = promotion.Lst_PromotionID;
      const type = promotion.Lst_LinkType;
      const url = promotion.Lst_LinkUrl;
      const target = '_blank';
      if (type === 1) {
        window.open(url, target);
      } else if (type === 2 || type === 0) {
        this.$router.push({ name: 'PromotionDetail', params: { id } }).catch(() => {});
      } else if (type === 3) {
        const [classify, id, key] = url.split('/');
        this.$router.push({ name: 'GameLobby', params: { classify, id, key } });
      }
    },
    openRouteBlank(route) {
      console.log(route);
      let routeData = this.$router.resolve(route);
      console.log(routeData.href);
      window.open(routeData.href, '_blank');
    },
  },
};
