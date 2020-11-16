import Vue from 'vue';
import VueRouter from 'vue-router';
import BlankLayout from '@/components/layout/BlankLayout';

Vue.use(VueRouter);

/**
 * NoneLogin/MainPage | AlreadyLogin/MainPage
 */

/* jshint ignore:start */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/sign-in',
    alias: ['/SignIn'],
    name: 'SignIn',
    component: () => import('@/views/SignIn'),
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
    path: '/game',
    component: () => import('@/views/game/GameHome'),
    children: [
      {
        path: '',
        name: 'GameHome',
        redirect: { name: 'GameList' },
      },
      {
        path: 'slot/:id/:key',
        name: 'GameLobbySlot',
        component: () => import('@/views/game/GameLobbySlot'),
      },

      {
        path: 'live/:id/:key',
        name: 'GameLobbyLive',
        component: () => import('@/views/game/GameLobbyLive'),
      },
    ],
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
        path: 'withdrawal',
        name: 'TransactionWithdrawal',
        component: () => import('@/views/transaction/TransactionWithdrawal'),
      },
      {
        path: 'transfer',
        name: 'TransactionTransfer',
        component: () => import('@/views/transaction/TransactionTransfer'),
      },
      {
        path: 'record',
        component: BlankLayout,
        children: [
          {
            path: '',
            name: 'TransactionRecordHome',
            component: () => import('@/views/transaction/record/TransactionRecordHome'),
          },
          {
            path: ':name',
            name: 'TransactionRecordContent',
            component: () => import('@/views/transaction/record/TransactionRecordContent'),
          },
          {
            //* 因提取限制的詳細資料，需要多個參數，所以改成一律用 query
            //* 其他: id
            //* 提取限制: productId, bonusCode, typeCode
            path: ':name/detail',
            name: 'TransactionRecordDetail',
            component: () => import('@/views/transaction/record/TransactionRecordDetail'),
          },
        ],
      },
    ],
  },
  {
    path: '/report',
    component: () => import('@/views/report/ReportHome'),
    children: [
      {
        path: '',
        name: 'ReportHome',
        redirect: { name: 'ReportUnsettleBet' },
      },
      {
        path: 'unsettle-bet',
        name: 'ReportUnsettleBet',
        component: () => import('@/views/report/ReportUnsettleBet'),
      },
      {
        path: 'bet-record',
        name: 'ReportBetRecord',
        component: () => import('@/views/report/ReportBetRecord'),
      },
      {
        path: 'bet-record/:date',
        name: 'ReportBetRecordDetail',
        component: () => import('@/views/report/ReportBetRecordDetail'),
      },
    ],
  },
  {
    path: '/notification',
    component: () => import('@/views/notification/NotificationHome'),
    children: [
      {
        path: '',
        name: 'NotificationHome',
        redirect: { name: 'NotificationNews' },
      },
      {
        path: 'news',
        name: 'NotificationNews',
        component: () => import('@/views/notification/NotificationNews'),
      },
      {
        path: 'inbox',
        name: 'NotificationInbox',
        component: () => import('@/views/notification/NotificationInbox'),
      },
      {
        path: 'inbox/:key',
        name: 'NotificationInboxDetail',
        component: () => import('@/views/notification/NotificationInboxDetail'),
      },
      {
        path: 'outbox',
        name: 'NotificationOutbox',
        component: () => import('@/views/notification/NotificationOutbox'),
      },
    ],
  },
  {
    path: '/promotion',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: 'Promotion',
        component: () => import('@/views/promotion/Promotion'),
      },
      {
        path: ':id',
        name: 'PromotionDetail',
        component: () => import('@/views/promotion/PromotionDetail'),
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
  // {
  //   path: '/agreement',
  //   name: 'Agreement',
  //   component: () => import('@/views/Agreement'),
  // },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('@/views/Maintenance'),
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('@/views/PageNotFound'),
  },
];
/* jshint ignore:end */

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
