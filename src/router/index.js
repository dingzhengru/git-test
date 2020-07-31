import Vue from 'vue';
import VueRouter from 'vue-router';
import BlankLayout from '@/components/layout/BlankLayout';

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
    path: '/game',
    component: () => import('@/views/game/GameHome'),
    children: [
      {
        path: '',
        name: 'GameHome',
        redirect: { name: 'GameList' },
      },
      {
        path: ':type', //* query: { category } => 篩選類別 (ex: Hot Games)
        name: 'GameLobby',
        component: () => import('@/views/game/GameLobby'),
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
            path: ':name/detail/:id',
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
        path: 'chat',
        name: 'NotificationChat',
        component: () => import('@/views/notification/NotificationChat'),
      },
      {
        path: 'chat/group/:group',
        name: 'NotificationChatDetail',
        component: () => import('@/views/notification/NotificationChatDetail'),
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
