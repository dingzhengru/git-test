<template>
  <div class="transaction-record-content-list">
    <div class="theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ title }}</h3>

      <form @submit.prevent="submitSearchRecordList">
        <div class="blk-inquire-select">
          <select class="ui-ddl ddl-inquire-game" id="sltProduct" v-model="search.product">
            <option :value="{}" selected>Choose the product</option>
            <option :value="product" v-for="product in productList" :key="product.sGameID">
              {{ product.Lst_Name }}
            </option>
          </select>
          <select id="sltDateRange" class="ui-ddl ddl-inquire-range">
            <option :value="{}" selected>Select Date Range</option>
            <option :value="range.value" v-for="range in searchDateRangeList" :key="range.name">{{
              range.name
            }}</option>
          </select>
          <span class="txt-inquire">From</span>
          <input class="ui-ipt ui-ipt-date ipt-inquire-date" type="date" v-model="search.dateFrom" />
          <span class="txt-inquire">To</span>
          <input class="ui-ipt ui-ipt-date ipt-inquire-date" type="date" v-model="search.dateTo" />
        </div>
        <div class="blk-inquire-control">
          <button type="submit" class="ui-btn01 ui-btn-long btn-inquire btn-search-record-transfer">Search</button>
        </div>
      </form>

      <ul class="cpn-boxzero theme-ul-listView">
        <li class="theme-li-listView" v-for="item in pageData" :key="item.id">
          <table class="ui-table01">
            <tbody>
              <tr v-for="(value, key, index) in item" :key="index">
                <template v-if="!notShowKeyList.includes(key)">
                  <th class="th-1st">{{ key }}</th>
                  <td
                    class="td-2nd"
                    :class="{
                      'ui-txt-positive': (key == 'detail' && item.isSuccess) || (key == 'amount' && item.amount > 0),
                      'ui-txt-negative': (key == 'detail' && !item.isSuccess) || (key == 'amount' && item.amount < 0),
                    }"
                  >
                    <template v-if="key == 'amount'">
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
    <p class="txt-notice">{{ notice }}</p>
    <AppPagination
      :length="list.length"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
    <!-- <div class="lay-are-pager">
      <a href="javascript:;" class="ui-lnk-pagerPreviousMore" id="btnPreviousMore"></a>
      <a href="javascript:;" class="ui-lnk-pagerPrevious" id="btnPreviousPage"></a>
      <select class="ui-ddl ui-ddl-pager ng-pristine ng-valid" name="NoPage" id="slcPage">
        <option value="1" selected="selected">1</option>
      </select>
      <a href="javascript:;" class="ui-lnk-pagerNext" id="btnNextPage"></a>
      <a href="javascript:;" class="ui-lnk-pagerNextMore" id="btnNextMore"></a>
    </div> -->
  </div>
</template>

<script>
import numeral from 'numeral';
import AppPagination from '../../AppPagination';

export default {
  name: 'TransactionRecordContentList',
  components: {
    AppPagination,
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
      let startAt = this.pagination.pagesize * (this.pagination.page - 1);
      let endAt = startAt + this.pagination.pagesize;
      return this.list.slice(startAt, endAt) || [];
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
.transaction-record-content-list {
  margin: 30px 0;
}

.blk-inquire-select {
  margin: 30px 0;
  text-align: center;
}

.txt-inquire {
  display: block;
  font-size: 2.769em;
  text-align: left;
}

.ddl-inquire-game,
.ddl-inquire-range {
  width: 49%;
  margin-right: 10px;
  display: inline-block;
}

.ddl-inquire-range {
  margin-right: 0;
}

.ipt-inquire-date {
  width: 97%;
}

.btn-inquire {
  display: block;
  margin: 0 auto;
}

.th-1st {
  width: 100px;
  text-align: center;
}
.td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
.txt-notice {
  font-size: 2em;
}
</style>
