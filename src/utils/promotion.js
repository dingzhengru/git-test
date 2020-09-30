import router from '@/router';

export function handlePromotion(promotion) {
  const type = this.isLoggedIn ? promotion.Lst_Login_Type : promotion.Lst_Nonelogin_Type;
  const url = this.isLoggedIn ? promotion.Lst_Login_Url : promotion.Lst_Nonelogin_Url;
  const target = promotion.Lst_Target;

  if (type == 1) {
    window.open(url, target);
  } else if (type == 2 || type == 0) {
    if (url > 0) {
      router.push({
        name: 'PromotionDetail',
        params: { id: url },
      });
    } else {
      router.push({ name: 'Promotion' });
    }
  }
}
