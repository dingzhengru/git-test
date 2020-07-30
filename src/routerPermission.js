import router from './router';
import store from './store';
import { AUTH_ROUTE_LIST } from './settings';

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (AUTH_ROUTE_LIST.includes(to.name)) {
    if (!isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
