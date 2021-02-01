<template>
  <div class="report-bet-record-detail">
    <!-- <component :is="ReportBetRecordDetailTable" :title="title" :recordList="recordList" :totalObject="totalRecord" /> -->

    <div class="report-bet-record-content">
      <div class="report-bet-record-content__box report-bet-record-content__box--outer theme-content-box">
        <h3 class="report-bet-record-content__title theme-h3-boxTitle">
          {{ title }}
        </h3>
        <table class="report-bet-record-content__total-table ui-table03">
          <tr>
            <th class="report-bet-record-content__total-table__th-1st th-1st">
              {{ $t('report.betRecordDetail.table.recordList.Lst_TTLBet') }}
            </th>
            <td class="report-bet-record-content__total-table__td-2nd td-2nd">
              {{ $numeral(totalRecord.Lst_TTLBet).format('0,0.00') }}
            </td>
          </tr>
          <tr>
            <th class="report-bet-record-content__total-table__th-1st th-1st">
              {{ $t('report.betRecordDetail.table.recordList.Lst_TTLNetBet') }}
            </th>
            <td class="report-bet-record-content__total-table__td-2nd td-2nd">
              {{ $numeral(totalRecord.Lst_TTLNetBet).format('0,0.00') }}
            </td>
          </tr>
          <tr>
            <th class="report-bet-record-content__total-table__th-1st th-1st">
              {{ $t('report.betRecordDetail.table.recordList.Lst_MemberTTLNetWin') }}
            </th>
            <td class="report-bet-record-content__total-table__td-2nd td-2nd">
              {{ $numeral(totalRecord.Lst_MemberTTLNetWin).format('0,0.00') }}
            </td>
          </tr>
          <tr>
            <th class="report-bet-record-content__total-table__th-1st th-1st">
              {{ $t('report.betRecordDetail.table.recordList.Lst_JackpotScore') }}
            </th>
            <td class="report-bet-record-content__total-table__td-2nd td-2nd">
              {{ $numeral(totalRecord.Lst_JackpotScore).format('0,0.00') }}
            </td>
          </tr>
        </table>

        <div
          class="report-bet-record-content__box report-bet-record-content__box--inner theme-content-box"
          v-for="(item, index) in recordList"
          :key="index"
        >
          <table class="report-bet-record-content__detail-table ui-table02">
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_ProductName') }}</th>
              <td class="td-2nd">{{ item.Lst_ProductName }}</td>
            </tr>
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_BetCount') }}</th>
              <td class="td-2nd">{{ item.Lst_BetCount }}</td>
            </tr>
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_TTLBet') }}</th>
              <td class="td-2nd">{{ $numeral(item.Lst_TTLBet).format('0,0.00') }}</td>
            </tr>
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_TTLNetBet') }}</th>
              <td class="td-2nd">{{ $numeral(item.Lst_TTLNetBet).format('0,0.00') }}</td>
            </tr>
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_MemberTTLNetWin') }}</th>
              <td class="td-2nd">{{ $numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}</td>
            </tr>
            <tr class="report-bet-record-content__detail-table__tr">
              <th class="th-1st">{{ $t('report.betRecordDetail.table.recordList.Lst_JackpotScore') }}</th>
              <td class="td-2nd">{{ $numeral(item.Lst_JackpotScore).format('0,0.00') }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="report-bet-record-detail__button-div">
      <button class="report-bet-record-detail__button--return ui-btn ui-btn--long" @click="$router.go(-1)">
        {{ $t('report.betRecordDetail.button.back') }}
      </button>
    </div>
  </div>
</template>

<script>
import mixinTransactionRecordBetDay from '@/mixins/transactionRecordBetDay';
import { mapGetters } from 'vuex';

export default {
  name: 'ReportBetRecordDay',
  mixins: [mixinTransactionRecordBetDay],
  computed: {
    ...mapGetters(['lang', 'siteSetting']),
    // ReportBetRecordDetailTable() {
    //   return () => import(`@/${this.siteSetting.components.report.ReportBetRecordDetailTable}`);
    // },
    title() {
      if (this.$route.query.Tag == 'Today') {
        return this.$t('report.betRecord.dateRange.Today');
      }
      return `${this.$t('report.betRecordDetail.title')} ${this.$route.query.Day.split(' ')[0]} (GMT+8)`;
    },
  },
};
</script>
