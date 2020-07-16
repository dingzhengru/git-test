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
    path: '/user',
    component: () => import('@/views/user/UserHome'),
    children: [
      {
        path: '',
        name: 'UserHome',
        redirect: { name: 'UserProfile' },
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/user/UserProfile'),
      },
      {
        path: 'change-password',
        name: 'UserChangePassword',
        component: () => import('@/views/user/UserChangePassword'),
      },
    ],
  },
  {
    path: '/transaction',
    component: () => import('@/views/transaction/TransactionHome'),
    children: [
      {
        path: '',
        name: 'TransactionHome',
        redirect: { name: 'TransactionDeposit' },
      },
      {
        path: 'deposit',
        name: 'TransactionDeposit',
        component: () => import('@/views/transaction/TransactionDeposit'),
      },
      {
        path: 'withdraw',
        name: 'TransactionWithdraw',
        component: () => import('@/views/transaction/TransactionWithdraw'),
      },
      {
        path: 'transfer',
        name: 'TransactionTransfer',
        component: () => import('@/views/transaction/TransactionTransfer'),
      },
      {
        path: 'record',
        name: 'TransactionRecord',
        component: () => import('@/views/transaction/TransactionRecord'),
      },
    ],
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
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About'),
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/Agreement'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
