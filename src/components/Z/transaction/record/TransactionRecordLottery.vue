<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.lottery.table.prize') }}</th>
        <th>{{ $t('transaction.recordContent.lottery.table.type') }}</th>
        <th>{{ $t('transaction.recordContent.lottery.table.status') }}</th>
        <th>{{ $t('transaction.recordContent.lottery.table.datetime') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>{{ item.Lst_PrizeName }}</td>
          <td>{{ item.Lst_PrizeType }}</td>
          <td>{{ item.Lst_GiveoutName }}</td>
          <td>
            {{ item.Lst_CTime.split('T')[0] }} <br />
            {{ item.Lst_CTime.split('T')[1].split('.')[0] }}
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
    />
  </div>
</template>

<script>
import mixinTransactionRecordLottery from '@/mixins/transactionRecordLottery';

export default {
  name: 'TransactionRecordLottery',
  mixins: [mixinTransactionRecordLottery],
};
</script>
