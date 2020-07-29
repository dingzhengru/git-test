<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl">
        <option selected="" value="/Y/BetHistory/MainPage/?Tag=Today">Accounting of the day</option>
        <option value="/Y/BetHistory/MainPage/?Tag=ThisWeek">Accounting of this week</option>
        <option value="/Y/BetHistory/MainPage/?Tag=LastWeek">Accounting of last week</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportBetRecord',
};
</script>

<style scoped>
.report-bet-record {
  margin-top: 40px;
}

.report-bet-record__field {
  text-align: center;
}

.report-bet-record__field__select{
  width: 100%;
  padding: 0 1.5%;
}
</style>
