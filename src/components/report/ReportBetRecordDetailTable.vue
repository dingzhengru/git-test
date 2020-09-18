<template>
  <div class="report-bet-record">
    <div class="report-bet-record__box report-bet-record__box--outer theme-content-box">
      <h3 class="report-bet-record__title theme-h3-boxTitle">
        <!-- Account details {{ $route.params.date }} -->
        {{ title }}
      </h3>

      <table class="report-bet-record__total-table ui-table03">
        <tbody>
          <tr v-for="(value, key) in totalObject" :key="key">
            <th class="report-bet-record__total-table__th-1st th-1st">
              {{ $t(`report.betRecordDetail.table.total.${key}`) }}
            </th>
            <td
              class="report-bet-record__total-table__td-2nd td-2nd"
              :class="{ 'ui-txt-positive': isPositive(key, value), 'ui-txt-negative': isNegative(key, value) }"
            >
              {{ key != 'Lst_BetCount' ? numeral(value).format('0,0.00') : value }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="report-bet-record__box report-bet-record__box--inner theme-content-box"
        v-for="(record, index) in recordList"
        :key="index"
      >
        <table class="report-bet-record__detail-table ui-table02">
          <tbody>
            <tr class="report-bet-record__detail-table__tr" v-for="(value, key) in record" :key="key">
              <template>
                <th class="th-1st">
                  {{ $t(`report.betRecordDetail.table.recordList.${key}`) }}
                </th>
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
  </div>
</template>

<script>
import numeral from 'numeral';
export default {
  name: 'ReportBetRecordDetailTable',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    recordList: {
      type: Array,
      default: () => [],
    },
    totalObject: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isPositive: () => (key, value) => {
      return key == 'totalWinLose' && value >= 0;
    },
    isNegative: () => (key, value) => {
      return key == 'totalWinLose' && value < 0;
    },
  },
  data() {
    return {
      numeral: numeral,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-bet-record {
  margin-top: 40px;

  &__field {
    text-align: center;

    &__select {
      width: 100%;
      padding: 0 1.5%;
    }
  }

  &__box {
    margin: 30px 0;
  }

  &__total-table {
    margin: 30px 0;

    &__th-1st {
      width: 30%;
    }
  }
}
</style>

<style scoped>
/* .report-bet-record {
  margin-top: 40px;
} */

/* .report-bet-record__field {
  text-align: center;
} */

/* .report-bet-record__field__select {
  width: 100%;
  padding: 0 1.5%;
} */

/* .report-bet-record__box {
  margin: 30px 0;
} */

/* .report-bet-record__total-table {
  margin: 30px 0;
} */

/* .report-bet-record__total-table__th-1st {
  width: 30%;
} */

/* .report-bet-record__button-div {
  text-align: center;
} */
</style>
