<template>
  <div class="report-unsettle-bet">
    <div class="report-unsettle-bet__box theme-content-box">
      <table class="report-unsettle-bet__table ui-table02" v-for="item in list" :key="item.id">
        <tbody>
          <tr v-for="(value, key) in item" :key="key">
            <th class="th-1st">{{ key }}</th>
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
export default {
  name: 'ReportUnsettleBet',
  data() {
    return {
      numeral: numeral,
      list: [
        {
          id: '000',
          game: 'Sports-SBO Sports',
          betCount: 0,
          betAmount: 100,
        },
        {
          id: '111',
          game: 'Sports-SBO Sports',
          betCount: 0,
          betAmount: 100,
        },
      ],
    };
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
