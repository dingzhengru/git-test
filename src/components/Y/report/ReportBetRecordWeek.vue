<template>
  <div class="report-bet-record">
    <div class="report-bet-record__box theme-content-box">
      <h3 class="report-bet-record__title theme-h3-boxTitle">
        {{ $t(`report.betRecord.dateRange.${$route.query.Tag}`) }}
      </h3>
      <table class="report-bet-record__table ui-table03">
        <tr>
          <th>{{ $t(`report.betRecord.table.date`) }}</th>
          <th>{{ $t(`report.betRecord.table.totalWinLose`) }}</th>
        </tr>
        <tr v-for="item in recordList" :key="item.Lst_ReportDate">
          <td class="report-bet-record__table__td-1st td-1st">{{ item.Lst_ReportDate }}</td>
          <td
            class="report-bet-record__table__td-2nd td-2nd"
            :class="{
              'ui-txt-positive': item.Lst_MemberTTLNetWin > 0,
              'ui-txt-negative': item.Lst_MemberTTLNetWin < 0,
            }"
          >
            {{ $numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}
            <router-link
              class="ui-lnk-detail"
              :to="{
                name: 'ReportBetRecordDay',
                query: {
                  Tag: 'DayOfWeek',
                  Day: `${item.Lst_ReportDate.split(' ')[0]} 12:00:00`,
                },
              }"
              v-if="item.Lst_BetCount > 0"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mixinTransactionRecordBetWeek from '@/mixins/transactionRecordBetWeek';

export default {
  name: 'TransactionRecordBetWeek',
  mixins: [mixinTransactionRecordBetWeek],
};
</script>
