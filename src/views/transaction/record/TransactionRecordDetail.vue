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
          class="record-detail__button--return ui-btn ui-btn--long"
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
  apiGetRecordDepositDetail,
  apiGetRecordWithdrawalDetail,
  apiGetRecordTransferDetail,
  apiGetRecordDetailWithdrawalRestriction,
} from '@/api/transaction-record';

export default {
  name: 'TransactionRecordDetail',
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
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
  methods: {
    async getRecordDetail() {
      switch (this.$route.params.name) {
        case 'deposit': {
          const result = await apiGetRecordDepositDetail(this.$route.query);

          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.bank = item.Lst_BankName;
            newItem.rollinPoint = item.Lst_Money;
            newItem.createdDate = item.Lst_CreateTime;
            newItem.submitDate = item.Lst_Mtime.split(' ')[0];
            newItem.transactionTime = item.Lst_Mtime.split(' ')[1];
            newItem.paymentMethod = item.Lst_DMTitle;
            newItem.transactionNumber = item.Lst_TransID;
            newItem.activity = item.Lst_ActivityName;
            return newItem;
          });

          break;
        }
        case 'withdrawal': {
          const result = await apiGetRecordWithdrawalDetail(this.$route.query);

          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.amount = item.Lst_MoneyPayment;
            newItem.serviceCharge = item.Lst_Charges;
            newItem.createdDate = item.Lst_CreateTime;
            newItem.submitDate = item.Lst_CasherTime.split(' ')[0];
            newItem.transactionTime = item.Lst_CasherTime.split(' ')[1];
            newItem.transactionNumber = item.Lst_TransID;
            return newItem;
          });
          break;
        }
        case 'transfer': {
          const result = await apiGetRecordTransferDetail(this.$route.query);

          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.game = item.Lst_ProductName;
            newItem.rollinPoint = item.Lst_PointPayment;
            newItem.rolloutPoint = item.Lst_PointIncome;
            newItem.accountingDate = item.Lst_TransTime.split(' ')[0];
            newItem.transactionTime = item.Lst_TransTime.split(' ')[1];
            newItem.beforeWallet = item.Lst_Org_Point;
            newItem.afterWallet = item.Lst_Final_Point;
            newItem.beforeGameAccount = item.Lst_Org_Game_Point;
            newItem.afterGameAccount = item.Lst_Final_Game_Point;
            return newItem;
          });
          break;
        }
        case 'withdrawalRestriction': {
          const result = await apiGetRecordDetailWithdrawalRestriction(this.$route.query);

          this.list = result.RetObj.map(item => {
            const newItem = {};
            newItem.activity = item.Lst_Activty_Name;
            newItem.bonusIssue = item.Lst_Bonus;
            newItem.datetime = item.Lst_Mtime.replace('T', ' ').split('.')[0];

            return newItem;
          });
          break;
        }
        default: {
          this.$router.replace({ name: 'TransactionRecordHome' });
        }
      }
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/transaction/record-detail.scss`);

    this.getRecordDetail();
  },
  watch: {
    lang() {
      this.getRecordDetail();
    },
  },
};
</script>

<style lang="scss" scoped>
.record-detail {
  margin: 30px 0;

  &__ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__table {
    &__th-1st {
      width: 45%;
      word-break: break-word;
    }
    &__td-2nd {
      white-space: nowrap;
      text-align: right;
    }
  }

  &__button-div {
    margin: 40px 0 20px;
    text-align: center;
  }
}
</style>

<style scoped>
/* .record-detail {
  margin: 30px 0;
} */

/* .record-detail__ol {
  padding: 0;
  margin: 0;
  list-style: none;
} */

/* .record-detail__table__th-1st {
  width: 45%;
  word-break: break-word;
} */
/* .record-detail__table__td-2nd {
  white-space: nowrap;
  text-align: right;
} */
/* .record-detail__button-div {
  margin: 40px 0 20px;
  text-align: center;
} */
</style>
