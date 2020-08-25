<template>
  <div class="report-unsettle-bet">
    <div class="report-unsettle-bet__box theme-content-box">
      <table class="report-unsettle-bet__table ui-table02" v-for="item in list" :key="item.id">
        <tbody>
          <tr v-for="(value, key) in item" :key="key">
            <th class="th-1st">
              {{ $t(`report.unsettleBet.table.${key}`) }}
            </th>
            <td class="td-2nd">
              {{ typeof value == 'number' && key != 'betCount' ? numeral(value).format('0,0.00') : value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral';

import { getBetHistoryUnsettle } from '@/api/report';
export default {
  name: 'ReportUnsettleBet',
  data() {
    return {
      numeral: numeral,
      list: [
        {
          Lst_ProductName: 'Sports-SBO Sports',
          Lst_BetCount: 0,
          Lst_TTLBet: 100,
        },
        {
          Lst_ProductName: 'Sports-SBO Sports',
          Lst_BetCount: 0,
          Lst_TTLBet: 100,
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('setIsLoading', false); //* 關掉 loading

    getBetHistoryUnsettle().then(result => {
      console.log(result);
      this.list = result.RetObj.Rows;
    });
  },
};
</script>

<style scoped>
.report-unsettle-bet {
  margin-top: 30px;
}
.report-unsettle-bet__table {
  margin-bottom: 10px;
}
</style>
