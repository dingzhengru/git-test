<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl" v-model="dayRange" @change="changeDayRange">
        <option :value="{}" selected>Accounting of the day</option>
        <option :value="dayRange" v-for="dayRange in dayRangeList" :key="dayRange.value">
          {{ dayRange.name }}
        </option>
      </select>
    </div>
    <div class="report-bet-record__box theme-content-box">
      <h3 class="report-bet-record__title theme-h3-boxTitle">Accounting of this week</h3>
      <table class="report-bet-record__table ui-table03">
        <thead>
          <tr class="report-bet-record__table__tr">
            <th>Date</th>
            <th>Total Win-lose</th>
          </tr>
        </thead>
        <tbody>
          <tr class="report-bet-record__table__tr" v-for="item in list" :key="item.date">
            <td class="report-bet-record__table__td-1st td-1st">{{ item.date }}</td>
            <td
              class="report-bet-record__table__td-2nd td-2nd"
              :class="{ 'ui-txt-positive': item.winLose > 0, 'ui-txt-negative': item.winLose < 0 }"
            >
              {{ numeral(item.winLose).format('0,0.00') }}
              <router-link
                class="ui-lnk-detail"
                :to="{ name: 'ReportBetRecordDetail', params: { date: item.date } }"
                v-if="item.hasDetail"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral';
export default {
  name: 'ReportBetRecord',
  data() {
    return {
      numeral: numeral,
      dayRangeList: [
        {
          name: 'Accounting of this week',
          value: 'thisWeek',
        },
        {
          name: 'Accounting of last week',
          value: 'lastWeek',
        },
      ],
      total: {
        betCount: 4,
        betAmount: 280,
        winLose: 8012,
        prize: 0,
      },
      list: [
        {
          date: '2020-07-27 (GMT+8)',
          winLose: -216,
          hasDetail: true,
        },
        {
          date: '2020-07-28 (GMT+8)',
          winLose: 8228,
          hasDetail: true,
        },
      ],
      dayRange: {},
    };
  },
  methods: {
    changeDayRange() {
      console.log('[ReportBetRecord] changeDayRange:', this.dayRange);
    },
  },
};
</script>

<style scoped>
.report-bet-record {
  margin-top: 40px;
}

.report-bet-record__field {
  text-align: center;
}

.report-bet-record__field__select {
  width: 100%;
  padding: 0 1.5%;
}

.report-bet-record__box {
  margin: 30px 0;
}

.report-bet-record__table {
  margin: 30px 0;
  position: relative;
}

.report-bet-record__table__tr {
  text-align: center;
}

.report-bet-record__table__td-2nd {
  padding-right: 48px;
  text-align: center;
  position: relative;
}
</style>
