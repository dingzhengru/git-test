<template>
  <div>
    <table class="ui-table record-content__table record-content__table--bet">
      <tr>
        <th>{{ $t('ui.label.date') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_BetCount') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_TTLBet') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_TTLNetBet') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_MemberTTLNetWin') }}</th>
        <th>{{ $t('report.betRecordDetail.table.recordList.Lst_JackpotScore') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            <a href="javascript:;" v-if="item.Lst_BetCount > 0" @click="goRecordBetDay(item)">
              {{ item.Lst_ReportDate }}
            </a>
            <template v-else>{{ item.Lst_ReportDate }}</template>
          </td>
          <td>{{ item.Lst_BetCount }}</td>
          <td>{{ $numeral(item.Lst_TTLBet).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_TTLNetBet).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}</td>
          <td>{{ $numeral(item.Lst_JackpotScore).format('0,0.00') }}</td>
        </tr>
      </template>
      <tr>
        <td>{{ $t('report.unsettleBet.table.total') }}</td>
        <td>{{ totalRecord.Lst_BetCount }}</td>
        <td>{{ $numeral(totalRecord.Lst_TTLBet).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_TTLNetBet).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_MemberTTLNetWin).format('0,0.00') }}</td>
        <td>{{ $numeral(totalRecord.Lst_JackpotScore).format('0,0.00') }}</td>
      </tr>
      <tr>
        <td colspan="6">
          <a href="javascript:;" @click="$router.go(-1)">{{ $t('ui.button.backToPreviousPage') }}</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import mixinTransactionRecordBetWeek from '@/mixins/transactionRecordBetWeek';

export default {
  name: 'TransactionRecordBetWeek',
  mixins: [mixinTransactionRecordBetWeek],
};
</script>
