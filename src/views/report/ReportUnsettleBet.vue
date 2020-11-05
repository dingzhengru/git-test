<template>
  <div class="report-unsettle-bet" v-if="list.length > 0">
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
import { mapGetters } from 'vuex';
import numeral from 'numeral';
import { apiGetBetHistoryUnsettle } from '@/api/report';

export default {
  name: 'ReportUnsettleBet',
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
  },
  data() {
    return {
      numeral: numeral,
      list: [],
    };
  },
  methods: {
    async getBetHistoryUnsettle() {
      const result = await apiGetBetHistoryUnsettle();
      console.log('[BetHistoryUnsettle]', result);
      if (result.Code == 200) {
        this.list = result.RetObj.Rows;
      }
    },
  },
  mounted() {
    this.getBetHistoryUnsettle();
  },
  watch: {
    lang() {
      this.getBetHistoryUnsettle();
    },
  },
};
</script>

<style lang="scss" scoped>
.report-unsettle-bet {
  margin-top: 30px;

  &__table {
    margin-bottom: 10px;
  }
}
</style>

<style scoped>
/* .report-unsettle-bet {
  margin-top: 30px;
}
.report-unsettle-bet__table {
  margin-bottom: 10px;
} */
</style>
