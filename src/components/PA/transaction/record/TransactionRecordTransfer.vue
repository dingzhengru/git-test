<template>
  <div class="record-content record-content--transfer">
    <div class="record-content__search">
      <form class="record-content__search-form" @submit.prevent="submitSearch">
        <div class="ui-field record-content__field--product">
          <select class="ui-field__select" v-model="search.product">
            <option value="" selected>{{ $t(`transaction.recordContent.transfer.placeholder.product`) }}</option>
            <option :value="item.Value" v-for="item in productList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </div>
        <div class="ui-field record-content__search__field record-content__search__field--date">
          <input
            class=""
            type="date"
            v-model="search.dateFrom"
            :max="$dayjs().format('YYYY-MM-DD')"
            @change="searchDateRange = ''"
          />
        </div>
        <span>{{ $t('transaction.recordContent.transfer.field.to') }}</span>
        <div class="ui-field record-content__search__field record-content__search__field--date">
          <input
            class=""
            type="date"
            v-model="search.dateTo"
            :max="$dayjs().format('YYYY-MM-DD')"
            @change="searchDateRange = ''"
          />
        </div>

        <div class="record-content__search__btn">
          <button class="ui-btn record-content__search__btn--submit" type="submit">
            {{ $t('ui.button.search') }}
          </button>
        </div>
      </form>
    </div>

    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.transfer.table.product') }}</th>
        <th>{{ $t('transaction.recordContent.transfer.table.rollinPoint') }}</th>
        <th>{{ $t('transaction.recordContent.transfer.table.rolloutPoint') }}</th>
        <th>{{ $t('transaction.recordContent.transfer.table.datetime') }}</th>
        <th>{{ $t('transaction.recordContent.transfer.table.status') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            {{ item.Lst_ProductName }}
          </td>
          <td>{{ $numeral(item.Lst_PointPayment).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_PointIncome).format('0,0.00') }}</td>
          <td>
            {{ item.Lst_TransTime }}
          </td>
          <td>
            {{ item.Lst_CheckOK }}
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
      v-show="recordList.length > 0"
    />
  </div>
</template>

<script>
import mixinTransactionRecordTransfer from '@/mixins/transactionRecordTransfer';

export default {
  name: 'TransactionRecordTransfer',
  mixins: [mixinTransactionRecordTransfer],
};
</script>
