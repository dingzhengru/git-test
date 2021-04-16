import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 ** meta.auth
 **   true: 需"登入後"才能進入的頁面
 **   false: 需"不登入"才能進入的頁面
 **   無設置: 不限制
 **
 ** meta.header、meta.footer，meta.header-back-icon
 **   true: 顯示
 **   false: 不顯示
 **   無設置: 顯示
 */

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
    meta: { auth: false, header: false, footer: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { auth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: { auth: false },
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('@/views/ForgetPassword'),
    meta: { auth: false, 'header-back-icon': true },
  },
  {
    path: '/game',
    component: () => import('@/views/game/GameHome'),
    children: [
      {
        path: '',
        name: 'GameHome',
        redirect: { name: 'Home' },
      },
      {
        path: ':classify/fav',
        name: 'GameLobbyFav',
        component: () => import('@/views/game/GameLobby'),
      },
      {
        path: ':classify/:id/:key',
        name: 'GameLobby',
        component: () => import('@/views/game/GameLobby'),
      },
      // {
      //   path: 'slot/:classify/:id/:key',
      //   name: 'GameLobbySlot',
      //   component: () => import('@/views/game/GameLobbySlot'),
      // },
      // {
      //   path: 'live/:classify/:id/:key',
      //   name: 'GameLobbyLive',
      //   component: () => import('@/views/game/GameLobbyLive'),
      // },
    ],
  },
  {
    path: '/user',
    component: () => import('@/views/user/UserHome'),
    meta: { auth: true },
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
      {
        path: 'change-password-withdrawal',
        name: 'UserChangePasswordWithdrawal',
        component: () => import('@/views/user/UserChangePasswordWithdrawal'),
      },
      {
        path: 'mail',
        name: 'UserMail',
        component: () => import('@/views/user/UserMail'),
        // children: [
        //   {
        //     path: '',
        //     name: 'UserMailHome',
        //     redirect: { name: 'UserMailInbox' },
        //   },
        //   {
        //     path: 'inbox',
        //     name: 'UserMailInbox',
        //     component: () => import('@/views/user/UserMailInbox'),
        //     meta: { 'header-back-icon': true },
        //   },
        //   {
        //     path: 'inbox/:key',
        //     name: 'UserMailDetail',
        //     component: () => import('@/views/user/UserMailDetail'),
        //     meta: { 'header-back-icon': true },
        //   },
        //   {
        //     path: 'send',
        //     name: 'UserMailSend',
        //     component: () => import('@/views/user/UserMailSend'),
        //     meta: { 'header-back-icon': true },
        //   },
        // ],
      },
      {
        path: 'mail/:key',
        name: 'UserMailDetail',
        component: () => import('@/views/user/UserMailDetail'),
        meta: { 'header-back-icon': true },
      },
      {
        path: 'mail-send',
        name: 'UserMailSend',
        component: () => import('@/views/user/UserMailSend'),
        meta: { 'header-back-icon': true },
      },
    ],
  },
  {
    path: '/transaction',
    component: () => import('@/views/transaction/TransactionHome'),
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'TransactionHome',
        redirect: { name: 'TransactionDeposit' },
      },
      {
        path: 'deposit',
        component: () => import('@/views/transaction/deposit/TransactionDepositHome'),
        children: [
          {
            path: '',
            name: 'TransactionDepositHome',
            redirect: { name: 'TransactionDepositBase' },
          },
          {
            path: 'base',
            name: 'TransactionDepositBase',
            component: () => import('@/views/transaction/deposit/TransactionDepositBase'),
          },
          {
            path: 'third-party',
            name: 'TransactionDepositThirdParty',
            component: () => import('@/views/transaction/deposit/TransactionDepositThirdParty'),
          },
        ],
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
        component: () => import('@/views/transaction/record/TransactionRecordHome'),
        children: [
          {
            path: '',
            name: 'TransactionRecordHome',
            component: () => import('@/components/layout/BlankLayout'),
          },
          {
            path: 'deposit',
            name: 'TransactionRecordDeposit',
            component: () => import('@/views/transaction/record/TransactionRecordDeposit'),
          },
          {
            path: 'withdrawal',
            name: 'TransactionRecordWithdrawal',
            component: () => import('@/views/transaction/record/TransactionRecordWithdrawal'),
          },
          {
            path: 'transfer',
            name: 'TransactionRecordTransfer',
            component: () => import('@/views/transaction/record/TransactionRecordTransfer'),
          },
          {
            path: 'bonus',
            name: 'TransactionRecordBonus',
            component: () => import('@/views/transaction/record/TransactionRecordBonus'),
          },
          {
            path: 'lottery',
            name: 'TransactionRecordLottery',
            component: () => import('@/views/transaction/record/TransactionRecordLottery'),
          },
          {
            path: 'withdrawalRestriction',
            name: 'TransactionRecordWithdrawalRestriction',
            component: () => import('@/views/transaction/record/TransactionRecordWithdrawalRestriction'),
          },
          {
            path: 'adjustment',
            name: 'TransactionRecordAdjustment',
            component: () => import('@/views/transaction/record/TransactionRecordAdjustment'),
          },
          {
            path: 'deposit/detail',
            name: 'TransactionRecordDepositDetail',
            component: () => import('@/views/transaction/record/TransactionRecordDepositDetail'),
          },
          {
            path: 'withdrawal/detail',
            name: 'TransactionRecordWithdrawalDetail',
            component: () => import('@/views/transaction/record/TransactionRecordWithdrawalDetail'),
          },
          {
            path: 'transfer/detail',
            name: 'TransactionRecordTransferDetail',
            component: () => import('@/views/transaction/record/TransactionRecordTransferDetail'),
          },
          {
            path: 'withdrawalRestriction/detail',
            name: 'TransactionRecordWithdrawalRestrictionDetail',
            component: () => import('@/views/transaction/record/TransactionRecordWithdrawalRestrictionDetail'),
          },
          {
            path: 'bet',
            component: () => import('@/views/transaction/record/TransactionRecordBetHome'),
            children: [
              {
                path: '',
                name: 'TransactionRecordBetHome',
                component: () => import('@/components/layout/BlankLayout'),
              },
              {
                path: 'unsettle',
                name: 'TransactionRecordBetUnsettle',
                component: () => import('@/views/transaction/record/TransactionRecordBetUnsettle'),
              },
              {
                path: 'day',
                name: 'TransactionRecordBetDay',
                component: () => import('@/views/transaction/record/TransactionRecordBetDay'),
              },
              {
                path: 'week',
                name: 'TransactionRecordBetWeek',
                component: () => import('@/views/transaction/record/TransactionRecordBetWeek'),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/report',
    component: () => import('@/views/report/ReportHome'),
    meta: { auth: true },
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
        component: () => import('@/views/report/ReportBetRecordHome'),
        children: [
          {
            path: '',
            name: 'ReportBetRecordHome',
            redirect: { name: 'ReportBetRecordDay', query: { Tag: 'Today' } },
          },
          {
            path: 'day',
            name: 'ReportBetRecordDay',
            component: () => import('@/views/report/ReportBetRecordDay'),
          },
          {
            path: 'week',
            name: 'ReportBetRecordWeek',
            component: () => import('@/views/report/ReportBetRecordWeek'),
          },
        ],
      },
    ],
  },
  {
    path: '/notification',
    component: () => import('@/views/notification/NotificationHome'),
    meta: { auth: true },
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
    name: 'Promotion',
    component: () => import('@/views/promotion/Promotion'),
  },
  {
    path: '/promotion/:id',
    name: 'PromotionDetail',
    component: () => import('@/views/promotion/PromotionDetail'),
    meta: { 'header-back-icon': true },
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
    path: '/news',
    name: 'News',
    component: () => import('@/views/News'),
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('@/views/Maintenance'),
    meta: { footer: false },
  },
  {
    path: '/deposit/ThirdPartyReturn',
    name: 'DepositThirdPartyReturn',
    component: () => import('@/views/DepositThirdPartyReturn'),
    meta: { header: false, footer: false },
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
