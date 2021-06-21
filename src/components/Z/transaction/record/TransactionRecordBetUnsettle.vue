<template>
  <div>
    <table class="ui-table record-content__table record-content__table--bet">
      <tr>
        <th>{{ $t('report.unsettleBet.table.product') }}</th>
        <th>{{ $t('report.unsettleBet.table.number') }}</th>
        <th>{{ $t('report.unsettleBet.table.amount') }}</th>
        <th>{{ $t('report.unsettleBet.table.pendingAmount') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            <a :href="item.Lst_ReportURL" target="_blank">
              {{ item.Lst_ProductName }}
            </a>
          </td>
          <td>{{ item.Lst_BetCount }}</td>
          <td>
            {{ $numeral(item.Lst_TTLBet).format('0,0.00') }}
          </td>
          <td>{{ item.Lst_WaitMoney }}</td>
        </tr>
      </template>
      <tr v-show="recordList.length > 0">
        <td>{{ $t('report.unsettleBet.table.total') }}</td>
        <td>{{ totalRecord.Lst_BetCount }}</td>
        <td>{{ $numeral(totalRecord.Lst_TTLBet).format('0,0.00') }}</td>
        <td></td>
      </tr>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>
  </div>
</template>

<script>
import mixinTransactionRecordBetUnsettle from '@/mixins/transactionRecordBetUnsettle';

export default {
  name: 'TransactionRecordBetUnsettle',
  mixins: [mixinTransactionRecordBetUnsettle],
};
</script>
