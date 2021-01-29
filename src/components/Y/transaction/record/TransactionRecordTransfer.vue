<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.transfer.title') }}</h3>

      <form class="record-content__search-form" @submit.prevent="submitSearch">
        <div class="record-content__search-form__field">
          <select class="record-content__search-form__field__select--product ui-ddl" v-model="search.product">
            <option value="" selected>{{ $t(`transaction.recordContent.transfer.placeholder.product`) }}</option>
            <option :value="item.Value" v-for="item in productList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <select
            class="record-content__search-form__field__select--date-range ui-ddl"
            v-model="searchDateRange"
            @change="changeSearchDateRange"
          >
            <option value="" selected>{{ $t(`transaction.recordContent.transfer.placeholder.dateRange`) }}</option>
            <option :value="item.value" v-for="item in searchDateRangeList" :key="item.name">
              {{ $t(`transaction.recordContent.transfer.dateRange.${item.name}`) }}
            </option>
          </select>
        </div>
        <div class="record-content__search-form__field">
          <span class="record-content__search-form__field__title">{{
            $t(`transaction.recordContent.transfer.field.from`)
          }}</span>
          <input
            class="record-content__search-form__field__input--date-from ui-ipt"
            type="date"
            v-model="search.dateFrom"
            :max="$dayjs().format('YYYY-MM-DD')"
            @change="searchDateRange = ''"
          />
        </div>
        <div class="record-content__search-form__field">
          <span class="record-content__search-form__field__title">{{
            $t(`transaction.recordContent.transfer.field.to`)
          }}</span>
          <input
            class="record-content__search-form__field__input--date-to ui-ipt"
            type="date"
            v-model="search.dateTo"
            :max="$dayjs().format('YYYY-MM-DD')"
            @change="searchDateRange = ''"
          />
        </div>
        <div class="record-content__search-form__button-div">
          <button class="record-content__search-form__button--search ui-btn ui-btn--long" type="submit">
            {{ $t(`transaction.recordContent.transfer.button.search`) }}
          </button>
        </div>
      </form>

      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.transfer.table.date') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_TransDate }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.transfer.table.game') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_ProductName }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.transfer.table.type') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_TransType }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.transfer.table.amount') }}
              </th>
              <td
                class="record-content__ul__li__table__td-2nd td-2nd"
                :class="{
                  'ui-txt-positive': Number(item.Lst_Point) > 0,
                  'ui-txt-negative': Number(item.Lst_Point) < 0,
                }"
                @click="goRecordDetail(item)"
              >
                {{ $numeral(item.Lst_Point).format('0,0.00') }}
                <a class="ui-lnk-detail" href="javascript:;"></a>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetRecordTransfer } from '@/api/transaction-record';
import { apiGetMemberProductList } from '@/api/product';

export default {
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],
      productList: [],
      pagination: {
        page: 1,
        pagesize: 10,
        count: 0,
      },
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
    };
  },
  methods: {
    async getRecord() {
      const requestData = {
        Page: this.pagination.page,
        ProductID: this.search.product,
        StartTime: this.search.dateFrom == '' ? '' : `${this.search.dateFrom} 00:00:00`,
        EndTime: this.search.dateTo == '' ? '' : `${this.search.dateTo} 23:59:59`,
      };
      const result = await apiGetRecordTransfer(requestData);
      this.recordList = result.RetObj.Rows;
      this.pagination.count = result.RetObj.Records;
    },
    async getMemberProductList() {
      const result = await apiGetMemberProductList();
      if (result.Code == 200) {
        this.productList = result.RetObj;
      }
    },
    goRecordDetail(record) {
      const query = { TransID: record.Lst_TransID };
      this.$router.push({ name: 'TransactionRecordTransferDetail', query });
    },
    submitSearch() {
      this.pagination.page = 1;
      this.getRecord();
    },
    changePage(page) {
      this.pagination.page = page;
      this.getRecord();
    },
    changeSearchDateRange() {
      this.search.dateTo = this.$dayjs().format('YYYY-MM-DD');
      this.search.dateFrom = this.$dayjs()
        .subtract(this.searchDateRange, 'day')
        .format('YYYY-MM-DD');
    },
  },
  mounted() {
    this.getRecord();
    this.getMemberProductList();
  },
  watch: {
    lang() {
      this.getRecord();
      this.getMemberProductList();
    },
  },
};
</script>
