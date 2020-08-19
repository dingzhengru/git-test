<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t(`${i18nKey}.title`) }}</h3>

      <form class="record-content__search-form" @submit.prevent="submitSearchRecordList" v-if="isSearchActive">
        <div class="record-content__search-form__field">
          <select class="record-content__search-form__field__select--product ui-ddl" v-model="search.product">
            <option value="" selected>{{ $t(`${i18nKey}.placeholder.product`) }}</option>
            <option :value="product.value" v-for="product in productList" :key="product.sGameID">
              {{ product.Lst_Name }}
            </option>
          </select>
          <select
            class="record-content__search-form__field__select--date-range ui-ddl"
            v-model="searchDateRange"
            @change="changeSearchDateRange"
          >
            <option value="" selected>{{ $t(`${i18nKey}.placeholder.dateRange`) }}</option>
            <option :value="range.value" v-for="range in searchDateRangeList" :key="range.name">
              {{ $t(`${i18nKey}.dateRange.${range.name}`) }}
            </option>
          </select>
        </div>
        <div class="record-content__search-form__field">
          <span class="txt-inquire">{{ $t(`${i18nKey}.field.from`) }}</span>
          <input
            class="record-content__search-form__field__input--date-from ui-ipt"
            type="date"
            v-model="search.dateFrom"
            @change="searchDateRange = ''"
          />
        </div>
        <div class="record-content__search-form__field">
          <span class="txt-inquire">{{ $t(`${i18nKey}.field.to`) }}</span>
          <input
            class="record-content__search-form__field__input--date-to ui-ipt"
            type="date"
            v-model="search.dateTo"
            :max="dayjs().format('YYYY-MM-DD')"
          />
        </div>
        <div class="record-content__search-form__button-div">
          <button class="record-content__search-form__button--search ui-btn ui-btn-long" type="submit">
            {{ $t(`${i18nKey}.button.search`) }}
          </button>
        </div>
      </form>

      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in pageData" :key="item.id">
          <table class="record-content__ul__li__table ui-table01">
            <tbody>
              <tr v-for="(value, key, index) in item" :key="index">
                <template v-if="!notShowKeyList.includes(key)">
                  <th class="record-content__ul__li__table__th-1st th-1st">
                    {{ $t(`${i18nKey}.table.${key}`) }}
                  </th>
                  <td
                    class="record-content__ul__li__table__td-2nd td-2nd"
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

                    <router-link
                      class="ui-lnk-detail"
                      :to="{ name: 'TransactionRecordDetail', params: { name: $route.params.name, id: item.id } }"
                      v-if="isShowDetailLink(key, value, item)"
                    ></router-link>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
    <p class="record-content__notice">{{ $t(`${i18nKey}.notice`) }}</p>
    <AppPagination
      v-if="isPageActive"
      :length="list.length"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProductList } from '@/api/product';
import {
  getRecordDeposit,
  getRecordWithdrawal,
  getRecordTransfer,
  getRecordBonus,
  getRecordLottery,
  getRecordAdjustment,
} from '@/api/record';
import numeral from 'numeral';
import dayjs from 'dayjs';
export default {
  name: 'TransactionRecordContent',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'token']),
    i18nKey() {
      return `transaction.recordContent.${this.$route.params.name}`;
    },
    pageData() {
      if (!this.isPageActive) {
        return this.list;
      }
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.list.slice(startAt, endAt) || [];
    },
    isPositive: app => (key, value, item) => {
      const routeName = app.$route.params.name;
      return (
        (routeName == 'deposit' && key == 'amount' && value > 0) ||
        (routeName == 'deposit' && key == 'detail' && item.isSuccess) ||
        (routeName == 'withdrawal' && key == 'amount' && value > 0) ||
        (routeName == 'withdrawal' && key == 'detail' && item.isSuccess) ||
        (routeName == 'transfer' && key == 'amount' && value > 0) ||
        (routeName == 'bonus' && key == 'issue' && value > 0) ||
        (routeName == 'lottery' && key == 'status' && item.isSuccess) ||
        (routeName == 'adjustment' && key == 'point' && value > 0)
      );
    },
    isNegative: app => (key, value, item) => {
      const routeName = app.$route.params.name;
      return (
        (routeName == 'deposit' && key == 'amount' && value < 0) ||
        (routeName == 'deposit' && key == 'detail' && !item.isSuccess) ||
        (routeName == 'withdrawal' && key == 'amount' && value < 0) ||
        (routeName == 'withdrawal' && key == 'detail' && !item.isSuccess) ||
        (routeName == 'transfer' && key == 'amount' && value < 0) ||
        (routeName == 'bonus' && key == 'issue' && value < 0) ||
        (routeName == 'lottery' && key == 'status' && !item.isSuccess) ||
        (routeName == 'adjustment' && key == 'point' && value < 0)
      );
    },
    isShowDetailLink: app => (key, value, item) => {
      return key == app.detailKey && item.isSuccess != false;
    },
  },
  data() {
    return {
      numeral: numeral,
      dayjs: dayjs,
      list: [],
      detailKey: '', //* 放 detail link 的欄位名稱
      isPageActive: false, //* 是否有分頁
      isSearchActive: false, //* 是否有搜尋
      productList: [],
      notShowKeyList: ['id', 'isSuccess'],
      searchDateRangeList: [
        {
          name: 'lastWeek',
          value: 7,
        },
        {
          name: 'lastTwoWeek',
          value: 14,
        },
        {
          name: 'lastMonth',
          value: 30,
        },
      ],
      searchDateRange: '',
      search: {
        product: '',
        dateFrom: '',
        dateTo: '',
      },
      pagination: {
        page: 1,
        pagesize: 1,
      },
    };
  },
  methods: {
    changeSearchDateRange() {
      this.search.dateTo = dayjs().format('YYYY-MM-DD');
      this.search.dateFrom = dayjs()
        .subtract(this.searchDateRange, 'day')
        .format('YYYY-MM-DD');
    },
    submitSearchRecordList() {
      console.log('submitSearchRecordList', this.search);
    },
    changePage(page) {
      this.pagination.page = page;
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/record-content.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    token: {
      immediate: true,
      handler() {
        if (!this.token) {
          return;
        }
        switch (this.$route.params.name) {
          case 'deposit': {
            getRecordDeposit().then(result => {
              console.log('[RecordDeposit]', result);
            });
            const responseList = [
              {
                Lst_TransID: 'CR200804140218373',
                Lst_CreateTime: '2020-08-04T14:02:18.377',
                Lst_Mtime: '2020-08-04T14:50:02.07',
                Lst_BankName: '７－１１',
                Lst_MemberBankName: 'SCB',
                Lst_Money: 200.0,
                Lst_MoneyIncome: 200.0,
                Lst_Status: 2,
                Lst_ActivityName: '',
                Lst_DMTitle: '网络转账',
                Lst_Receipt: '会员没有上传汇款收据',
              },
            ];

            this.list = responseList.map(item => {
              const newItem = {};
              newItem.id = item.Lst_TransID;
              newItem.isSuccess = item.Lst_Status == 2;
              newItem.date = item.Lst_CreateTime.split('T')[0];
              newItem.bank = item.Lst_BankName;
              newItem.amount = item.Lst_Money;
              newItem.receipt = item.Lst_Receipt;

              if (item.Lst_Status == 1) {
                newItem.detail = this.$t('transaction.recordContent.statusText.underReview');
              } else if (item.Lst_Status == 2) {
                newItem.detail = this.$t('transaction.recordContent.statusText.success');
              } else if (item.Lst_Status == 3) {
                newItem.detail = this.$t('transaction.recordContent.statusText.failure');
              }
              return newItem;
            });

            // this.list = [
            //   {
            //     id: 'DR200721114109903',
            //     isSuccess: true,
            //     date: '2020-07-21',
            //     bank: 'KNANK',
            //     amount: 1000,
            //     receipt: '',
            //     detail: 'Successful',
            //   },
            // ];
            // this.title = 'Deposit Record';
            this.detailKey = 'detail';
            // this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
            break;
          }
          case 'withdrawal': {
            getRecordWithdrawal().then(result => {
              console.log('[RecordWithdrawal]', result);
            });
            const responseList = [
              {
                Lst_TransID: 'CR200805151631650',
                Lst_CreateTime: '2020-08-05T15:16:31.653',
                Lst_CasherTime: '2020-08-05T17:34:17.7310394+08:00',
                Lst_MemberBankName: 'SCB',
                Lst_Money: 400.0,
                Lst_MoneyPayment: -400.0,
                Lst_Status: 2,
                Lst_Charges: 0.0,
              },
            ];

            this.list = responseList.map(item => {
              const newItem = {};
              newItem.id = item.Lst_TransID;
              newItem.isSuccess = item.Lst_Status == 2;
              newItem.date = item.Lst_CreateTime.split('T')[0];
              newItem.bank = item.Lst_MemberBankName;
              newItem.amount = item.Lst_Money;

              if (item.Lst_Status == 1) {
                newItem.detail = this.$t('transaction.recordContent.statusText.underReview');
              } else if (item.Lst_Status == 2) {
                newItem.detail = this.$t('transaction.recordContent.statusText.success');
              } else if (item.Lst_Status == 3) {
                newItem.detail = this.$t('transaction.recordContent.statusText.failure');
              }
              return newItem;
            });
            // this.list = [
            //   {
            //     id: 'SR200721110313463',
            //     isSuccess: true,
            //     date: '2020-07-21',
            //     bank: 'SCB',
            //     amount: 1000,
            //     detail: 'Successful',
            //   },
            // ];
            // this.title = 'Withdrawals Record';
            this.detailKey = 'detail';
            // this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
            break;
          }
          case 'transfer': {
            const requestDataTransfer = {
              Sidx: 'Lst_TransTime',
              Sord: 'DESC',
              Page: '1',
              Rows: '10',
              _Search: 'false',
              Filters: '  ',
            };
            getRecordTransfer(requestDataTransfer).then(result => {
              console.log('[RecordTransfer]', result);
            });

            // const responseList = [
            //   {
            //     Lst_TransTime: '2020-07-01T11:53:59.98',
            //     Lst_ProductName: 'BBIN',
            //     Lst_PointIncome: 20.0,
            //     Lst_PointPayment: 0.0,
            //     Lst_Org_Point: 280429.86,
            //     Lst_Final_Point: 280449.86,
            //     Lst_Org_Game_Point: 20.0,
            //     Lst_Final_Game_Point: 0.0,
            //   },
            // ];

            // this.list = responseList.map(item => {
            //   const newItem = {};
            //   newItem.id = item.Lst_TransID;
            //   newItem.date = item.Lst_TransTime.split('T')[0];
            //   newItem.game = item.Lst_ProductName;
            //   newItem.type = item.Lst_ProductName;
            //   newItem.amount = item.Lst_Final_Point;
            //   return newItem;
            // });

            this.list = [
              {
                id: '000',
                date: '2020-07-21',
                game: 'Royal Gaming',
                type: 'Roll-out of Points',
                amount: -767,
              },
              {
                id: '111',
                date: '2020-07-22',
                game: 'Royal Gaming',
                type: 'Roll-out of Points',
                amount: 1122,
              },
            ];
            // this.title = 'Transfer Record';
            this.detailKey = 'amount';
            this.isSearchActive = true;
            this.isPageActive = true;

            // * 取得遊戲館列表
            const requestDataProductList = { DeviceType: 1 };
            getProductList(requestDataProductList).then(result => {
              if (result.Code == 200) {
                this.productList = result.RetObj;
                console.log('[Product]', this.productList);
              }
            });
            break;
          }
          case 'bonus': {
            const requestDataRecordBonus = { Page: 1 };

            getRecordBonus(requestDataRecordBonus).then(result => {
              console.log('[RecordBonus]', result);
            });

            const responseList = [
              {
                Lst_MTime: '2020-06-05T14:40:59.927',
                Lst_Name: 'QA-轉JDB',
                Lst_WalletLimit: '1180',
                Lst_Bonus: 10.0,
              },
            ];

            this.list = responseList.map(item => {
              const newItem = {};
              // newItem.id = item.Lst_TransID;
              newItem.activity = item.Lst_Name;
              newItem.bindWallet = item.Lst_WalletLimit;
              newItem.issue = item.Lst_Bonus;
              newItem.datetime = item.Lst_MTime.replace('T', ' ').split('.')[0];
              return newItem;
            });

            // this.list = [
            //   {
            //     id: '000',
            //     activity: 'ฝากเพิ่มรับสูงสุด 88,888',
            //     bindWallet: 'Wallet',
            //     issue: 10,
            //     datetime: '2020-07-21 11:13:42',
            //   },
            //   {
            //     id: '111',
            //     activity: 'ฝากเพิ่มรับสูงสุด 88,888',
            //     bindWallet: 'Wallet',
            //     issue: -10,
            //     datetime: '2020-07-22 11:13:42',
            //   },
            // ];
            // this.title = 'Bonus Record';
            this.isSearchActive = false;
            this.isPageActive = true;
            break;
          }
          case 'lottery': {
            const requestDataRecordLottery = { Page: 2, SiteID: 'C', Account: 'test' };

            getRecordLottery(requestDataRecordLottery).then(result => {
              console.log('[RecordLottery]', result);
            });

            const responseList = [
              {
                Lst_CTime: '2020-05-15T10:14:26.427',
                Lst_PrizeName: 'TestPrize5',
                Lst_GiveoutStatus: '已发放',
                Lst_PrizeType: '金额',
              },
            ];

            this.list = responseList.map(item => {
              const newItem = {};
              // newItem.id = item.Lst_TransID;
              // newItem.isSuccess = item.Lst_PrizeName;
              newItem.prize = item.Lst_PrizeName;
              newItem.status = item.Lst_GiveoutStatus;
              newItem.type = item.Lst_PrizeType;
              newItem.datetime = item.Lst_CTime.replace('T', ' ').split('.')[0];
              return newItem;
            });

            // this.list = [
            //   {
            //     id: '000',
            //     isSuccess: false,
            //     prize: '88',
            //     status: 'Undelivered',
            //     type: 'Prize',
            //     datetime: '2020-07-21 11:41:52',
            //   },
            //   {
            //     id: '111',
            //     isSuccess: true,
            //     prize: '8888',
            //     status: 'Successful',
            //     type: 'Prize',
            //     datetime: '2020-07-22 13:41:52',
            //   },
            // ];
            // this.title = 'Lottery Record';
            this.detailKey = 'lotteryStatus';
            this.isSearchActive = false;
            this.isPageActive = true;
            break;
          }
          case 'withdrawalRestriction': {
            this.list = [
              {
                id: '000',
                type: 'General washing code',
                restriction: 'Withdrawal Bouns-Wallet',
                notRolloverExchange: 13120,
                rolloverDeadline: '2021-2-6',
              },
            ];
            // this.title = 'Withdrawal Restriction';
            this.detailKey = 'restriction';
            this.isSearchActive = false;
            this.isPageActive = true;
            break;
          }
          case 'adjustment': {
            const requestDataRecordAdjustment = { Page: 1 };

            getRecordAdjustment(requestDataRecordAdjustment).then(result => {
              console.log('[RecordAdjustment]', result);
            });

            const responseList = [
              {
                Lst_TransTime: '2020-08-14T13:22:52.72',
                Lst_PaymentType: '补点',
                Lst_Memo: 'test',
                Lst_Amount: 50.0,
              },
            ];

            this.list = responseList.map(item => {
              const newItem = {};
              // newItem.id = item.Lst_TransID;
              // newItem.isSuccess = item.Lst_PrizeName;
              newItem.status = item.Lst_PaymentType;
              newItem.description = item.Lst_Memo;
              newItem.point = item.Lst_Amount;
              newItem.datetime = item.Lst_TransTime.replace('T', ' ');
              return newItem;
            });

            // this.list = [
            //   {
            //     id: '000',
            //     status: 'Deduction from Points',
            //     description: 'description',
            //     point: -1000,
            //     datetime: '2020-07-21 11:20:24',
            //   },
            // ];
            // this.title = 'Adjustment Record';
            this.isSearchActive = false;
            this.isPageActive = true;
            break;
          }
        }
      },
    },
  },
};
</script>

<style scoped>
.record-content {
  margin: 30px 0;
}

.record-content__search-form__field {
  margin: 30px 0;
  text-align: center;
}

.record-content__search-form__field select {
  width: 49%;
  display: inline-block;
  padding-left: 1.5%;
}

.record-content__search-form__field__select--product {
  margin-right: 10px;
}
.record-content__search-form__field__select--date-range {
  margin-right: 0;
}

.record-content__search-form__field__input--date-from,
.record-content__search-form__field__input--date-to {
  width: 97%;
}
.txt-inquire {
  display: block;
  font-size: 2.769em;
  text-align: left;
}

.record-content__search-form__button--search {
  display: block;
  margin: 0 auto;
}

.record-content__ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.record-content__ul__li__table {
  text-align: center;
}

.record-content__ul__li__table__th-1st {
  width: 35%;
}
.record-content__ul__li__table__td-2nd {
  position: relative;
}
.record-content__notice {
  font-size: 2em;
}
</style>
