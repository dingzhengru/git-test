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
            transactionNumber: this.$route.params.id,
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
            transactionNumber: this.$route.params.id,
          },
        ];
        this.title = 'Withdrawals Record';
        break;
      }
      case 'transfer': {
        this.list = [
          {
            id: '000',
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
        this.title = 'Transfer Details';
        break;
      }
      case 'bonus': {
        break;
      }
      case 'lottery': {
        this.list = [];
        this.title = 'Lottery Details';
        break;
      }
      case 'withdrawalRestriction': {
        this.list = [
          {
            id: '000',
            activity: 'Cash Flow',
            bonusIssue: 0,
            datetime: '2020-07-21 11:41:35',
          },
          {
            id: '111',
            activity: 'Cash Flow',
            bonusIssue: 10,
            datetime: '2020-07-21 11:41:35',
          },
        ];
        this.title = 'Withdrawal Restriction Details';
        break;
      }
      case 'adjustment': {
        this.list = [];
        this.title = 'Adjustment Details';
        break;
      }
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
