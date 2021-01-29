<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th></th>
        <th>{{ $t('transaction.recordContent.deposit.table.date') }}</th>
        <th>{{ $t('transaction.recordContent.deposit.table.status') }}</th>
        <th>{{ $t('transaction.recordContent.deposit.table.amount') }}</th>
        <th>{{ $t('transaction.recordDetail.deposit.table.activity') }}</th>
      </tr>
      <template v-for="item in recordList">
        <tr :key="item.Lst_TransID">
          <td @click="item.isShowDetail = !item.isShowDetail">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
          <td>
            {{ item.Lst_CreateTime.split('T')[0] }} <br />
            12:00:00
          </td>
          <td>成功</td>
          <td>{{ $numeral(item.Lst_MoneyIncome).format('0,0.00') }}</td>
          <td>再存5%</td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5">
            {{ $t('transaction.recordDetail.deposit.table.transactionNumber') }}： {{ item.Lst_TransID }} <br />
            {{ $t('transaction.recordContent.deposit.table.receipt') }}：
            <a href="javascript:;">
              {{ item.Lst_Receipt }}
            </a>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import mixinTransactionRecordDeposit from '@/mixins/transactionRecordDeposit';

export default {
  name: 'TransactionRecordDeposit',
  mixins: [mixinTransactionRecordDeposit],
  watch: {
    recordList: {
      immediate: true,
      handler() {
        if (this.recordList.length > 0) {
          this.recordList = this.recordList.map(item => {
            item.isShowDetail = false;
            return item;
          });
        }
      },
    },
  },
};
</script>
