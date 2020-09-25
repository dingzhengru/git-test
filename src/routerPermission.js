import router from './router';
import store from './store';
import { AUTH_ROUTE_LIST, NO_AUTH_ROUTE_LIST } from './settings';

router.beforeEach((to, from, next) => {
  const siteStatus = store.getters.siteStatus; //* 站台狀態: 0正常 10維護 20停用
  const isLoggedIn = store.getters.isLoggedIn;

  console.log(from.name, to.name);

  //* 當維護時 && 使用者想去其他頁面時
  if (siteStatus == 10 && to.name != 'Maintenance') {
    next({ name: 'Maintenance' });
  }

  if (!isLoggedIn && AUTH_ROUTE_LIST.includes(to.name)) {
    //* 未登入 && 需登入才能進入的頁面
    next({ name: 'Login' });
  } else if (isLoggedIn && NO_AUTH_ROUTE_LIST.includes(to.name)) {
    //* 已登入 && 非登入才能進入的頁面
    next({ name: 'Home' });
  } else {
    if (to.name != from.name) {
      // store.commit('setIsLoading', true);
      store.commit('pushLoadingRequest', 'change-route');
    }
    next();
  }
});

router.afterEach(() => {
  store.commit('popLoadingRequest');
});
