import router from '.';
import store from '@/store';
import { ROUTE_AUTH_LIST, ROUTE_NO_AUTH_LIST } from '@/settings';

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters.userIsLoggedIn;

  if (!isLoggedIn && ROUTE_AUTH_LIST.includes(to.name)) {
    //* 未登入 && 需登入才能進入的頁面
    next({ name: 'Login' });
  } else if (isLoggedIn && ROUTE_NO_AUTH_LIST.includes(to.name)) {
    //* 已登入 && 非登入才能進入的頁面
    next({ name: 'Home' });
  } else {
    if (to.name != from.name) {
      store.commit('pushLoadingRequest', 'change-route');
    }
    next();
  }
});

router.afterEach(() => {
  //* 清除所有 change-route
  store.commit('popAllChangeRouteLoadingRequest');
});
