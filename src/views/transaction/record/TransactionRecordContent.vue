<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t(`${i18nKey}.title`) }}</h3>

      <form class="record-content__search-form" @submit.prevent="submitSearch" v-if="isSearchActive">
        <div class="record-content__search-form__field">
          <select class="record-content__search-form__field__select--product ui-ddl" v-model="search.product">
            <option value="" selected>{{ $t(`${i18nKey}.placeholder.product`) }}</option>
            <option :value="product.Value" v-for="product in productList" :key="product.Value">
              {{ product.Text }}
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
        <li class="record-content__ul__li theme-li-listView" v-for="item in list" :key="item.id">
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

                    <template v-else-if="key == 'receipt' && item.receiptImageUrl">
                      <a
                        href="javascript:;"
                        :style="{ color: 'blue' }"
                        @click.prevent="imageDialogUrl = item.receiptImageUrl"
                      >
                        {{ value }}
                      </a>
                    </template>

                    <template v-else>
                      {{ value }}
                    </template>

                    <a
                      class="ui-lnk-detail"
                      href="javascript:;"
                      @click="goRecordDetail(item)"
                      v-if="isShowDetailLink(key, value, item)"
                    ></a>
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
      :length="pagination.dataLength"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />

    <RecordImageDialog :imageUrl="imageDialogUrl" @close="imageDialogUrl = ''" v-if="imageDialogUrl" />

    <!-- <RecordImageDialog imageUrl="https://image.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMemberProductList } from '@/api/product';
import {
  getRecordDeposit,
  getRecordWithdrawal,
  getRecordTransfer,
  getRecordBonus,
  getRecordLottery,
  getRecordWithdrawalRestriction,
  getRecordAdjustment,
} from '@/api/transaction-record';

import numeral from 'numeral';
import dayjs from 'dayjs';
export default {
  name: 'TransactionRecordContent',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
    RecordImageDialog: () => import('@/components/transaction/record/RecordImageDialog'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang']),
    i18nKey() {
      return `transaction.recordContent.${this.$route.params.name}`;
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
      notShowKeyList: ['id', 'isSuccess', 'Procudtid', 'BonusCode', 'WashCodeType', 'receiptImageUrl'],
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
        pagesize: 10,
        dataLength: 0,
      },
      imageDialogUrl: '', //* 匯款收據的圖片視窗，空值就不顯示
    };
  },
  methods: {
    async getRecord() {
      //* 因換頁都會用到，所以放 methods
      this.$store.commit('setIsLoading', true);
      switch (this.$route.params.name) {
        case 'deposit': {
          const result = await getRecordDeposit();
          console.log('[RecordDeposit]', result.RetObj);

          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.id = item.Lst_TransID;
            newItem.isSuccess = item.Lst_Status == 2;
            newItem.date = item.Lst_CreateTime.split('T')[0];
            newItem.bank = item.Lst_MemberBankName;
            newItem.amount = item.Lst_MoneyIncome;
            newItem.receipt = item.Lst_Receipt;
            newItem.receiptImageUrl = item.Lst_ImageUrl;
            newItem.detail = item.Lst_StatusName;

            // if (item.Lst_Status == 1) {
            //   newItem.detail = this.$t('transaction.recordContent.statusText.underReview');
            // } else if (item.Lst_Status == 2) {
            //   newItem.detail = this.$t('transaction.recordContent.statusText.success');
            // } else if (item.Lst_Status == 3) {
            //   newItem.detail = this.$t('transaction.recordContent.statusText.failure');
            // }
            return newItem;
          });
          break;
        }
        case 'withdrawal': {
          const result = await getRecordWithdrawal();
          console.log('[RecordWithdrawal]', result.RetObj);

          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.id = item.Lst_TransID;
            newItem.isSuccess = item.Lst_Status == 2;
            newItem.date = item.Lst_CreateTime.split('T')[0];
            newItem.bank = item.Lst_MemberBankName;
            newItem.amount = item.Lst_MoneyPayment;

            if (item.Lst_Status == 1) {
              newItem.detail = this.$t('transaction.recordContent.statusText.underReview');
            } else if (item.Lst_Status == 2) {
              newItem.detail = this.$t('transaction.recordContent.statusText.success');
            } else if (item.Lst_Status == 3) {
              newItem.detail = this.$t('transaction.recordContent.statusText.failure');
            }
            return newItem;
          });
          break;
        }
        case 'transfer': {
          const requestDataTransfer = {
            Page: this.pagination.page,
            ProductID: this.search.product,
            StartTime: this.search.dateFrom == '' ? '' : `${this.search.dateFrom} 00:00:00`,
            EndTime: this.search.dateTo == '' ? '' : `${this.search.dateTo} 23:59:59`,
          };
          const result = await getRecordTransfer(requestDataTransfer);
          console.log('[RecordTransfer]', result.RetObj);

          this.pagination.dataLength = result.RetObj.Records;
          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.id = item.Lst_TransID;
            newItem.date = item.Lst_TransDate;
            newItem.game = item.Lst_ProductName;
            newItem.type = item.Lst_TransType;
            newItem.amount = item.Lst_Point;
            return newItem;
          });
          break;
        }
        case 'bonus': {
          const requestDataRecordBonus = { Page: this.pagination.page };

          const result = await getRecordBonus(requestDataRecordBonus);
          console.log('[RecordBonus]', result.RetObj);

          this.pagination.dataLength = result.RetObj.Records;
          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            // newItem.id = item.Lst_TransID;
            newItem.activity = item.Lst_Name;
            newItem.bindWallet = item.Lst_WalletLimit;
            newItem.issue = item.Lst_Bonus;
            newItem.datetime = item.Lst_MTime.replace('T', ' ').split('.')[0];
            return newItem;
          });
          break;
        }
        case 'lottery': {
          const requestDataRecordLottery = { Page: this.pagination.page };

          const result = await getRecordLottery(requestDataRecordLottery);
          console.log('[RecordLottery]', result.RetObj);

          this.pagination.dataLength = result.RetObj.Records;
          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.prize = item.Lst_PrizeName;
            newItem.status = item.Lst_GiveoutStatus;
            newItem.type = item.Lst_PrizeType;
            newItem.datetime = item.Lst_CTime.replace('T', ' ').split('.')[0];
            return newItem;
          });
          break;
        }
        case 'withdrawalRestriction': {
          const requestDataRecordWithdrawalRestriction = { Page: this.pagination.page };

          const result = await getRecordWithdrawalRestriction(requestDataRecordWithdrawalRestriction);
          console.log('[RecordWithdrawalRestriction]', result.RetObj);
          this.pagination.dataLength = result.RetObj.Records;
          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.Procudtid = item.Lst_Procudt_id;
            newItem.BonusCode = item.Lst_Bonus_Code;
            newItem.WashCodeType = item.Lst_WashCodeType;
            newItem.type = item.Lst_WashCodeTypeStr;
            newItem.restriction = item.Lst_Procudt_Name;
            newItem.notRolloverExchange = item.Lst_Need_Washcode;
            newItem.rolloverDeadline = item.Lst_Ctime.split('T')[0];
            return newItem;
          });
          break;
        }
        case 'adjustment': {
          const requestDataRecordAdjustment = { Page: this.pagination.page };

          const result = await getRecordAdjustment(requestDataRecordAdjustment);
          console.log('[RecordAdjustment]', result.RetObj);
          this.pagination.dataLength = result.RetObj.Records;
          this.list = result.RetObj.Rows.map(item => {
            const newItem = {};
            newItem.status = item.Lst_PaymentType;
            newItem.description = item.Lst_Memo;
            newItem.point = item.Lst_Amount;
            newItem.datetime = item.Lst_TransTime.replace('T', ' ').split('.')[0];
            return newItem;
          });
          break;
        }
      }
      this.$store.commit('setIsLoading', false);
    },
    changeSearchDateRange() {
      this.search.dateTo = dayjs().format('YYYY-MM-DD');
      this.search.dateFrom = dayjs()
        .subtract(this.searchDateRange, 'day')
        .format('YYYY-MM-DD');
    },
    goRecordDetail(record) {
      let query = {};
      if (this.$route.params.name == 'withdrawalRestriction') {
        query = {
          Procudtid: record.Procudtid,
          BonusCode: record.BonusCode,
          WashCodeType: record.WashCodeType,
        };
      } else {
        query = { TransID: record.id };
      }
      this.$router.push({ name: 'TransactionRecordDetail', query });
    },
    submitSearch() {
      console.log('submitSearch', this.search);
      this.pagination.page = 1;
      this.getRecord();
    },
    changePage(page) {
      this.pagination.page = page;
      this.getRecord();
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
        // this.$store.commit('setIsLoading', false);

        this.getRecord();

        switch (this.$route.params.name) {
          case 'deposit': {
            this.detailKey = 'detail';
            break;
          }
          case 'withdrawal': {
            this.detailKey = 'detail';
            break;
          }
          case 'transfer': {
            this.detailKey = 'amount';
            this.isSearchActive = true;
            this.isPageActive = true;

            // * 取得遊戲館列表
            getMemberProductList().then(result => {
              if (result.Code == 200) {
                this.productList = result.RetObj;
                console.log('[Product]', this.productList);
              }
            });
            break;
          }
          case 'bonus': {
            this.isPageActive = true;
            break;
          }
          case 'lottery': {
            this.isPageActive = true;
            break;
          }
          case 'withdrawalRestriction': {
            this.detailKey = 'restriction';
            this.isPageActive = true;
            break;
          }
          case 'adjustment': {
            this.isPageActive = true;
            break;
          }
          default: {
            this.$router.replace({ name: 'TransactionRecordHome' });
          }
        }
        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    lang() {
      this.getRecord();
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
