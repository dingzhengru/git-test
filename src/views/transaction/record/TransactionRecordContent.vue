<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t(`${i18nKey}.title`) }}</h3>

      <form class="record-content__search-form" @submit.prevent="submitSearchRecordList" v-if="isSearchActive">
        <div class="record-content__search-form__field">
          <select class="record-content__search-form__field__select--product ui-ddl" v-model="search.product">
            <option :value="{}" selected>{{ $t(`${i18nKey}.placeholder.product`) }}</option>
            <option :value="product" v-for="product in productList" :key="product.sGameID">
              {{ product.Lst_Name }}
            </option>
          </select>
          <select class="record-content__search-form__field__select--date-range ui-ddl">
            <option :value="{}" selected>{{ $t(`${i18nKey}.placeholder.dateRange`) }}</option>
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
          />
        </div>
        <div class="record-content__search-form__field">
          <span class="txt-inquire">{{ $t(`${i18nKey}.field.to`) }}</span>
          <input
            class="record-content__search-form__field__input--date-to ui-ipt"
            type="date"
            v-model="search.dateTo"
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
    <p class="record-content__notice">{{ notice }}</p>
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
import numeral from 'numeral';
export default {
  name: 'TransactionRecordContent',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
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
      list: [],
      title: '',
      detailKey: '', //* 放 detail link 的欄位名稱
      notice: '', //* 最下方的小字
      isSearchActive: false,
      isPageActive: false,
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
      search: {
        product: {},
        dateFrom: '',
        dateTo: '',
      },
      pagination: {
        page: 1,
        pagesize: 1,
      },
    };
  },
  mounted() {
    switch (this.$route.params.name) {
      case 'deposit': {
        this.list = [
          {
            id: 'DR200721114109903',
            isSuccess: true,
            date: '2020-07-21',
            bank: 'KNANK',
            amount: 1000,
            receipt: '',
            detail: 'Successful',
          },
          {
            id: 'DR200721111105963',
            isSuccess: false,
            date: '2020-07-22',
            bank: 'KNANK123',
            amount: 10000,
            receipt: 'Remittance Receipt',
            detail: 'Under review',
          },
        ];
        this.title = 'Deposit Record';
        this.detailKey = 'detail';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      }
      case 'withdrawal': {
        this.list = [
          {
            id: 'SR200721110313463',
            isSuccess: true,
            date: '2020-07-21',
            bank: 'SCB',
            amount: 1000,
            detail: 'Successful',
          },
        ];
        this.title = 'Withdrawals Record';
        this.detailKey = 'detail';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      }
      case 'transfer': {
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
        this.title = 'Transfer Record';
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
        this.list = [
          {
            id: '000',
            activity: 'ฝากเพิ่มรับสูงสุด 88,888',
            bindWallet: 'Wallet',
            issue: 10,
            datetime: '2020-07-21 11:13:42',
          },
          {
            id: '111',
            activity: 'ฝากเพิ่มรับสูงสุด 88,888',
            bindWallet: 'Wallet',
            issue: -10,
            datetime: '2020-07-22 11:13:42',
          },
        ];
        this.title = 'Bonus Record';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
      case 'lottery': {
        this.list = [
          {
            id: '000',
            isSuccess: false,
            prize: '88',
            status: 'Undelivered',
            type: 'Prize',
            datetime: '2020-07-21 11:41:52',
          },
          {
            id: '111',
            isSuccess: true,
            prize: '8888',
            status: 'Successful',
            type: 'Prize',
            datetime: '2020-07-22 13:41:52',
          },
        ];
        this.title = 'Lottery Record';
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
        this.title = 'Withdrawal Restriction';
        this.detailKey = 'restriction';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
      case 'adjustment': {
        this.list = [
          {
            id: '000',
            status: 'Deduction from Points',
            description: 'description',
            point: -1000,
            datetime: '2020-07-21 11:20:24',
          },
        ];
        this.title = 'Adjustment Record';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
    }
  },
  methods: {
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
