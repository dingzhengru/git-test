import router from './router';
import store from './store';
import { AUTH_ROUTE_LIST } from './settings';

router.beforeEach((to, from, next) => {
  const token = store.getters.token;
  if (AUTH_ROUTE_LIST.includes(to.name)) {
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});
