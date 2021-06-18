/**
 ** Lst_LinkType int 連結類型(0 : 無、1 : 自定義、2 : 優惠活動、3：遊戲館)
 */

import mixinProductLinkHandler from '@/mixins/productLinkHandler';

export default {
  name: 'MixinLinkUrl',
  mixins: [mixinProductLinkHandler],
  methods: {
    goLinkUrlByTypeAndUrl(type, url, target = '_self') {
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
          const product = { Lst_Game_Classify: classify, Lst_Product_id: id, Lst_Proxy_Product_Key: key };
          return this.goOuterLobby(product);
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
      let routeData = this.$router.resolve(route);
      window.open(routeData.href, '_blank');
    },
  },
};
