<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.bonus.table.activity') }}</th>
        <th>{{ $t('transaction.recordContent.bonus.table.bindWallet') }}</th>
        <th>{{ $t('transaction.recordContent.bonus.table.issue') }}</th>
        <th>{{ $t('transaction.recordContent.bonus.table.datetime') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            {{ item.Lst_Name }}
          </td>
          <td>{{ item.Lst_WalletLimit }}</td>
          <td>{{ $numeral(item.Lst_Bonus).format('0,0.00') }}</td>
          <td>
            {{ item.Lst_MTime.split('T')[0] }} <br />
            {{ item.Lst_MTime.split('T')[1].split('.')[0] }}
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePageHandler"
      v-show="recordList.length > 0"
    />
  </div>
</template>

<script>
import mixinTransactionRecordBonus from '@/mixins/transactionRecordBonus';

export default {
  name: 'TransactionRecordBonus',
  mixins: [mixinTransactionRecordBonus],
};
</script>
