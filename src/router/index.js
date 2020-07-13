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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('@/views/ForgetPassword'),
  },
  {
    path: '/promotion',
    component: () => import('@/components/BlankLayout'),
    children: [
      {
        path: '',
        name: 'Promotion',
        component: () => import('@/views/Promotion'),
      },
      {
        path: ':id',
        name: 'PromotionContent',
        component: () => import('@/views/PromotionContent'),
      },
    ],
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
