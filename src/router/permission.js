import router from '.';
import store from '@/store';

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters.userIsLoggedIn;

  if (to.matched.some(item => item.meta.auth === true) && !isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.matched.some(item => item.meta.auth === false) && isLoggedIn) {
    next({ name: 'Home' });
  } else {
    store.commit('pushLoading', 'change-route');
    next();
  }
});

router.afterEach(() => {
  //* 清除所有 change-route
  store.commit('popLoadingAllChangeRoute');
});
