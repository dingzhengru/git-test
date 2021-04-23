import router from '.';
import store from '@/store';

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters.userIsLoggedIn;

  //* Z 版 Logo 處的標題
  if (to.matched[0] != from.matched[0]) {
    store.commit('setPageTitle', '');
  }
  if (to.matched.some(item => item.meta.auth === true) && !isLoggedIn) {
    if (store.getters.siteIsLandscape) {
      return store.dispatch('openModalAuth');
    }
    next({ name: 'Login' });
  } else if (to.matched.some(item => item.meta.auth === false) && isLoggedIn) {
    next({ name: 'Home' });
  } else {
    // store.commit('pushLoading', 'change-route');
    next();
  }
});

router.afterEach(() => {
  //* 清除所有 change-route
  // store.commit('popLoadingAllChangeRoute');
});
