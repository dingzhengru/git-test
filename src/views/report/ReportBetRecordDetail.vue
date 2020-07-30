<template>
  <div class="report-bet-record">
    <div class="report-bet-record__box report-bet-record__box--outer theme-content-box">
      <h3 class="report-bet-record__title theme-h3-boxTitle">Account details {{ $route.params.date }}</h3>

      <table class="report-bet-record__total-table ui-table03">
        <tbody>
          <tr v-for="(value, key) in total" :key="key">
            <th class="report-bet-record__total-table__th-1st th-1st">{{ key }}</th>
            <td
              class="report-bet-record__total-table__td-2nd td-2nd"
              :class="{ 'ui-txt-positive': isPositive(key, value), 'ui-txt-negative': isNegative(key, value) }"
            >
              {{ key != 'betCount' ? numeral(value).format('0,0.00') : value }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="report-bet-record__box report-bet-record__box--inner theme-content-box"
        v-for="record in recordList"
        :key="record.id"
      >
        <table class="report-bet-record__detail-table ui-table02">
          <tbody>
            <tr class="report-bet-record__detail-table__tr" v-for="(value, key) in record" :key="key">
              <template v-if="key != 'id'">
                <th class="th-1st">{{ key }}</th>
                <td
                  class="td-2nd"
                  :class="{ 'ui-txt-positive': isPositive(key, value), 'ui-txt-negative': isNegative(key, value) }"
                >
                  {{ typeof value == 'number' && key != 'betCount' ? numeral(value).format('0,0.00') : value }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="report-bet-record__button-div">
      <button class="report-bet-record__button--return ui-btn ui-btn-long" @click="$router.go(-1)">
        Previous
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
export default {
  name: 'ReportBetRecordDetail',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    isPositive: () => (key, value) => {
      return key == 'winLose' && value >= 0;
    },
    isNegative: () => (key, value) => {
      return key == 'winLose' && value < 0;
    },
  },
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
      recordList: [
        {
          id: '00000',
          game: 'RNG-RG電子',
          betCount: 3,
          totalBetAmount: 240,
          validBetAmount: 240,
          winLose: -216,
          prize: 0,
        },
        {
          id: '11111',
          game: 'RNG-CQ9 RNG',
          betCount: 1,
          totalBetAmount: 40,
          validBetAmount: 40,
          winLose: 8228,
          prize: 0,
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
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/report/report-bet-record-detail.scss`);
      },
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

.report-bet-record__total-table {
  margin: 30px 0;
}

.report-bet-record__total-table {
  margin: 30px 0;
}

.report-bet-record__total-table__th-1st {
  width: 30%;
}

.report-bet-record__button-div {
  text-align: center;
}
</style>
