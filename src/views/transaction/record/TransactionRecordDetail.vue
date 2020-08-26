<template>
  <div>
    <div class="record-detail">
      <div class="theme-content-box">
        <h3 class="theme-h3-boxTitle">{{ $t(`${i18nKey}.title`) }}</h3>

        <ul class="record-detail__ol theme-ul-listView">
          <li class="record-detail__ol__li theme-li-listView" v-for="item in list" :key="item.id">
            <table class="record-detail__table ui-table02">
              <tbody>
                <tr v-for="(value, key, index) in item" :key="index">
                  <template v-if="!notShowKeyList.includes(key)">
                    <th class="record-detail__table__th-1st th-1st">
                      {{ $t(`${i18nKey}.table.${key}`) }}
                    </th>
                    <td
                      class="record-detail__table__td-2nd td-2nd"
                      :class="{
                        'ui-txt-positive': isPositive(key, value, item),
                        'ui-txt-negative': isNegative(key, value, item),
                      }"
                    >
                      <template v-if="typeof value == 'number'">
                        {{ numeral(value).format('0,0.00') }}
                      </template>

                      <template v-else>
                        {{ value }}
                      </template>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
      <div class="record-detail__button-div">
        <button
          type="button"
          class="record-detail__button--return ui-btn ui-btn-long"
          @click="$router.push({ name: 'TransactionRecordContent', params: { name: $route.params.name } })"
        >
          {{ $t('transaction.recordDetail.button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';

import {
  getRecordWithdrawalDetail,
  getRecordTransferDetail,
  getRecordDetailWithdrawalRestriction,
} from '@/api/transaction-record';

export default {
  name: 'TransactionRecordDetail',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    i18nKey() {
      return `transaction.recordDetail.${this.$route.params.name}`;
    },
    isPositive: app => (key, value) => {
      const routeName = app.$route.params.name;
      return (
        (routeName == 'deposit' && key == 'rollinPoint' && value > 0) ||
        (routeName == 'withdrawal' && key == 'amount' && value > 0) ||
        (routeName == 'transfer' && key == 'rollinPoint') ||
        (routeName == 'withdrawalRestriction' && key == 'bonusIssue')
      );
    },
    isNegative: app => (key, value) => {
      const routeName = app.$route.params.name;
      return (
        (routeName == 'deposit' && key == 'rollinPoint' && value < 0) ||
        (routeName == 'withdrawal' && key == 'amount' && value < 0) ||
        (routeName == 'transfer' && key == 'rolloutPoint')
      );
    },
  },
  data() {
    return {
      numeral: numeral,
      list: [],
      title: '',
      notShowKeyList: ['id'],
    };
  },
  mounted() {
    switch (this.$route.params.name) {
      case 'deposit': {
        this.list = [
          {
            bank: 'SCB-VIP',
            rollinPoint: 1000,
            createdDate: '2020-07-21',
            submitDate: '2020-07-21',
            transactionTime: '11:41:26',
            paymentMethod: 'WebATM',
            transactionNumber: this.$route.query.TransID,
            activity: '輪盤測試',
          },
        ];
        this.title = 'Deposit Details';
        break;
      }
      case 'withdrawal': {
        this.list = [
          {
            amount: -500,
            serviceCharge: '5',
            createdDate: '2020-07-21',
            submitDate: '2020-07-21',
            transactionTime: '11:41:26',
            transactionNumber: this.$route.query.TransID,
          },
        ];

        getRecordWithdrawalDetail(this.$route.query).then(result => {
          console.log('[RecordWithdrawalDetail]', result);

          // this.list = result.RetObj.map(item => {
          //   const newItem = {};
          //   newItem.amount = item.Lst_Activty_Name;
          //   newItem.serviceCharge = item.Lst_Bonus;
          //   newItem.createdDate = item.Lst_CreateTime;
          //   newItem.submitDate = item.Lst_CasherTime.split(' ')[0];
          //   newItem.transactionTime = item.Lst_CasherTime.split(' ')[1];
          //   newItem.transactionNumber = item.Lst_TransID;
          //   return newItem;
          // });
        });
        break;
      }
      case 'transfer': {
        this.list = [
          {
            game: 'Royal Gaming',
            rollinPoint: 0,
            rolloutPoint: -767,
            accountingDate: '2020-07-21',
            transactionTime: '11:05:38',
            beforeWallet: 8933,
            afterWallet: 9700,
            beforeGameAccount: 767,
            afterGameAccount: 0,
          },
        ];

        getRecordTransferDetail(this.$route.query).then(result => {
          console.log('[RecordTransferDetail]', result);

          // this.list = result.RetObj.map(item => {
          //   const newItem = {};
          //   newItem.game = item.Lst_ProductName;
          //   newItem.rollinPoint = item.Lst_PointIncome;
          //   newItem.rolloutPoint = item.Lst_PointPayment;
          //   newItem.accountingDate = item.Lst_TransTime.split(' ')[0];
          //   newItem.transactionTime = item.Lst_TransTime.split(' ')[1];
          //   newItem.beforeWallet = item.Lst_Org_Point;
          //   newItem.afterWallet = item.Lst_Final_Point;
          //   newItem.beforeGameAccount = item.Lst_Org_Game_Point;
          //   newItem.afterGameAccount = item.Lst_Final_Game_Point;
          //   return newItem;
          // });
        });
        break;
      }
      // case 'bonus': {
      //   break;
      // }
      // case 'lottery': {
      //   this.list = [];
      //   break;
      // }
      case 'withdrawalRestriction': {
        getRecordDetailWithdrawalRestriction(this.$route.query).then(result => {
          console.log('[RecordDetailWithdrawalRestriction]', result);

          this.list = result.RetObj.map(item => {
            const newItem = {};
            newItem.activity = item.Lst_Activty_Name;
            newItem.bonusIssue = item.Lst_Bonus;
            newItem.datetime = item.Lst_Mtime.replace('T', ' ').split('.')[0];

            return newItem;
          });
        });

        // const responseList = [
        //   {
        //     Lst_Activty_Name: '測試紅利100R50',
        //     Lst_Bonus: 10.0,
        //     Lst_Mtime: '2020-08-17T14:10:49.517',
        //   },
        // ];

        // this.list = [
        //   {
        //     id: '000',
        //     activity: 'Cash Flow',
        //     bonusIssue: 0,
        //     datetime: '2020-07-21 11:41:35',
        //   },
        // ];
        break;
      }
      // case 'adjustment': {
      //   this.list = [];
      //   this.title = 'Adjustment Details';
      //   break;
      // }
    }
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/record-detail.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.record-detail {
  margin: 30px 0;
}

.record-detail__ol {
  padding: 0;
  margin: 0;
  list-style: none;
}

.record-detail__table__th-1st {
  width: 45%;
  word-break: break-word;
}
.record-detail__table__td-2nd {
  white-space: nowrap;
  text-align: right;
}
.record-detail__button-div {
  margin: 40px 0 20px;
  text-align: center;
}
</style>
