import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * NoneLogin/MainPage | AlreadyLogin/MainPage
 */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/NoneLogin/MainPage',
    name: 'NoneLoginMainPage',
    component: () => import('@/views/NoneLogin/MainPage'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
