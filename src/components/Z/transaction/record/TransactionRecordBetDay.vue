<template>
  <div>
    <table class="ui-table record-content__table record-content__table--bet">
      <tr>
        <th>{{ $t('report.unsettleBet.table.product') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_BetCount') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_TTLBet') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_TTLNetBet') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_MemberTTLNetWin') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_JackpotScore') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            <a href="javascript:;">
              {{ item.Lst_ProductName }}
            </a>
          </td>
          <td>{{ item.Lst_BetCount }}</td>
          <td>{{ $numeral(item.Lst_TTLBet).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_TTLNetBet).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_JackpotScore).format('0,0.00') }}</td>
        </tr>
      </template>
      <tr v-show="recordList.length > 0">
        <td>{{ $t('report.unsettleBet.table.total') }}</td>
        <td>{{ totalRecord.Lst_BetCount }}</td>
        <td>{{ $numeral(totalRecord.Lst_TTLBet).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_TTLNetBet).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_MemberTTLNetWin).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_JackpotScore).format('0,0.00') }}</td>
      </tr>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>
  </div>
</template>

<script>
import mixinTransactionRecordBetDay from '@/mixins/transactionRecordBetDay';

export default {
  name: 'TransactionRecordBetDay',
  mixins: [mixinTransactionRecordBetDay],
};
</script>
