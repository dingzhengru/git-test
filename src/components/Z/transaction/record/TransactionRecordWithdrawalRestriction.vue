<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th></th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.type') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.restriction') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.notRolloverExchange') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.rolloverDeadline') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + index">
          <td @click="toggleRecordDetail(item)">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
          <td>
            {{ item.Lst_WashCodeTypeStr }}
          </td>
          <td>{{ item.Lst_Procudt_Name }}</td>
          <td>{{ $numeral(item.Lst_Need_Washcode).format('0,0.00') }}</td>
          <td>{{ item.Lst_Ctime.split('T')[0] }}</td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5">
            <div>
              {{ $t('transaction.recordDetail.withdrawalRestriction.table.activity') }}： {{ item.Lst_Activty_Name }}
            </div>
            <div>{{ $t('transaction.recordDetail.withdrawalRestriction.table.bonusIssue') }}：{{ item.Lst_Bonus }}</div>
            <div>
              {{ $t('transaction.recordDetail.withdrawalRestriction.table.datetime') }}：
              {{ item.Lst_Ctime.replace('T', ' ').split('.')[0] }}
            </div>
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
      v-show="recordList.length > 0"
    />
  </div>
</template>

<script>
import mixinTransactionRecordWithdrawalRestriction from '@/mixins/transactionRecordWithdrawalRestriction';

export default {
  name: 'TransactionRecordWithdrawalRestriction',
  mixins: [mixinTransactionRecordWithdrawalRestriction],
};
</script>
