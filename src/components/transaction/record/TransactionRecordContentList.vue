<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ title }}</h3>

      <form class="record-content__search-form" @submit.prevent="submitSearchRecordList" v-if="isSearchActive">
        <div class="record-content__search-form__field">
          <select class="record-content__search-form__field__select--product ui-ddl" v-model="search.product">
            <option :value="{}" selected>Choose the product</option>
            <option :value="product" v-for="product in productList" :key="product.sGameID">
              {{ product.Lst_Name }}
            </option>
          </select>
          <select class="record-content__search-form__field__select--date-range ui-ddl">
            <option :value="{}" selected>Select Date Range</option>
            <option :value="range.value" v-for="range in searchDateRangeList" :key="range.name">
              {{ range.name }}
            </option>
          </select>
        </div>
        <div class="record-content__search-form__field">
          <span class="txt-inquire">From</span>
          <input
            class="record-content__search-form__field__input--date-from ui-ipt"
            type="date"
            v-model="search.dateFrom"
          />
        </div>
        <div class="record-content__search-form__field">
          <span class="txt-inquire">To</span>
          <input
            class="record-content__search-form__field__input--date-to ui-ipt"
            type="date"
            v-model="search.dateTo"
          />
        </div>
        <div class="record-content__search-form__button-div">
          <button class="record-content__search-form__button--search ui-btn ui-btn-long" type="submit">Search</button>
        </div>
      </form>

      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in pageData" :key="item.id">
          <table class="record-content__ul__li__table ui-table01">
            <tbody>
              <tr v-for="(value, key, index) in item" :key="index">
                <template v-if="!notShowKeyList.includes(key)">
                  <th class="record-content__ul__li__table__th-1st th-1st">{{ key }}</th>
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
import numeral from 'numeral';

export default {
  name: 'TransactionRecordContentList',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => '',
    },
    detailKey: {
      type: String,
      default: () => '',
    },
    isSearchActive: {
      type: Boolean,
      default: () => false,
    },
    isPageActive: {
      type: Boolean,
      default: () => false,
    },
    notice: {
      type: String,
      default: () => '',
    },
    productList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    pageData() {
      if (!this.isPageActive) {
        return this.list;
      }
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.list.slice(startAt, endAt) || [];
    },
    isPositive: () => (key, value, item) => {
      return (
        (key == 'depositAmount' && value > 0) ||
        (key == 'depositDetail' && item.isSuccess) ||
        (key == 'withdrawalAmount' && value > 0) ||
        (key == 'transferAmount' && value > 0) ||
        (key == 'bonusIssue' && value > 0) ||
        (key == 'lotteryStatus' && item.isSuccess) ||
        (key == 'adjustmentPoints' && value > 0)
      );
    },
    isNegative: () => (key, value, item) => {
      return (
        (key == 'depositAmount' && value < 0) ||
        (key == 'depositDetail' && !item.isSuccess) ||
        (key == 'withdrawalAmount' && value < 0) ||
        (key == 'transferAmount' && value < 0) ||
        (key == 'bonusIssue' && value < 0) ||
        (key == 'lotteryStatus' && !item.isSuccess) ||
        (key == 'adjustmentPoints' && value < 0)
      );
    },
    isShowDetailLink: app => (key, value, item) => {
      return key == app.detailKey && item.isSuccess != false;
    },
  },
  data() {
    return {
      numeral: numeral,
      notShowKeyList: ['id', 'isSuccess'],
      search: {
        product: {},
        dateFrom: '',
        dateTo: '',
      },
      searchDateRangeList: [
        {
          name: 'Last week',
          value: 7,
        },
        {
          name: 'Last two week',
          value: 14,
        },
        {
          name: 'Last month',
          value: 30,
        },
      ],
      pagination: {
        page: 1,
        pagesize: 1,
      },
    };
  },
  methods: {
    submitSearchRecordList() {
      console.log('submitSearchRecordList', this.search);
      this.$emit('submit-search-record-list', this.search);
    },
    changePage(page) {
      this.pagination.page = page;
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
