<template>
  <div class="report-unsettle-bet" v-if="recordList.length > 0">
    <div class="report-unsettle-bet__box theme-content-box">
      <table class="report-unsettle-bet__table ui-table02" v-for="item in recordList" :key="item.id">
        <tbody>
          <tr v-for="(value, key) in item" :key="key">
            <th class="th-1st">
              {{ $t(`report.unsettleBet.table.${key}`) }}
            </th>
            <td class="td-2nd">
              {{ typeof value == 'number' && key != 'betCount' ? $numeral(value).format('0,0.00') : value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import mixinTransactionRecordBetUnsettle from '@/mixins/transactionRecordBetUnsettle';

export default {
  name: 'ReportUnsettleBet',
  mixins: [mixinTransactionRecordBetUnsettle],
};
</script>
