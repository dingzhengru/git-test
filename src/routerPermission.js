import router from './router';
import store from './store';
import { AUTH_ROUTE_LIST, NO_AUTH_ROUTE_LIST } from './settings';

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

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
