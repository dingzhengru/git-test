/**
 ** Lst_LinkType int 連結類型(0 : 無、1 : 自定義、2 : 優惠活動、3：遊戲館)
 */

export default {
  name: 'MixinLinkUrl',
  methods: {
    goLinkUrlByTypeAndUrl(type, url, target = '_self') {
      if (type === 1) {
        window.open(url, target);
      } else if (type === 2) {
        this.$router.push({ name: 'PromotionDetail', params: { id: url } });
      } else if (type === 3) {
        const [classify, id, key] = url.split('/');
        this.$router.push({ name: 'GameLobby', params: { classify, id, key } });
      }
    },
    goLinkUrlByPromotion(type, url, target = '_self') {
      //* 優惠活動多一個 0 會進 detail
      if (type === 1) {
        window.open(url, target);
      } else if (type === 2 || type === 0) {
        this.$router.push({ name: 'PromotionDetail', params: { id: url } });
      } else if (type === 3) {
        const [classify, id, key] = url.split('/');
        this.$router.push({ name: 'GameLobby', params: { classify, id, key } });
      }
    },
  },
};