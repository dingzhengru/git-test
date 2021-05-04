<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.withdrawal.table.date') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawal.table.status') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawal.table.amount') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawal.table.serviceCharge') }}</th>
        <th></th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            {{ item.Lst_CreateTime.split('T')[0] }} <br />
            12:00:00
          </td>
          <td>{{ item.Lst_StatusName }}</td>
          <td>{{ $numeral(item.Lst_MoneyPayment).format('0,0.00') }}</td>
          <td>{{ item.Lst_Charges }}</td>
          <td @click="toggleRecordDetail(item)">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5">
            {{ $t('ui.label.transactionNumber') }}： {{ item.Lst_TransID }} <br />
            N/A
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <div class="ui-notice">
      <ul>
        <li>{{ $t('transaction.recordContent.withdrawal.notice') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixinTransactionRecordWithdrawal from '@/mixins/transactionRecordWithdrawal';

export default {
  name: 'TransactionRecordWithdrawal',
  mixins: [mixinTransactionRecordWithdrawal],
};
</script>
