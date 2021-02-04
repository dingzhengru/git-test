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
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + index">
          <td @click="toggleRecordDetail(item)">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
          <td>{{ item.Lst_CreateTime }}</td>
          <td>{{ item.Lst_StatusName }}</td>
          <td>{{ $numeral(item.Lst_MoneyIncome).format('0,0.00') }}</td>
          <td>再存5%</td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5">
            <div>{{ $t('transaction.recordDetail.deposit.table.transactionNumber') }}： {{ item.Lst_TransID }}</div>
            <div>
              {{ $t('transaction.recordContent.deposit.table.receipt') }}：
              <a href="javascript:;" @click="openReceiptImage(item)">
                {{ item.Lst_Receipt }}
              </a>
            </div>
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-notice">
      <ul>
        <li>{{ $t('transaction.recordContent.deposit.notice') }}</li>
      </ul>
    </div>

    <component
      :is="RecordImageDialog"
      :imageUrl="receiptImageUrl"
      :isShow="!!receiptImageUrl"
      @close="closeReceiptImage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinTransactionRecordDeposit from '@/mixins/transactionRecordDeposit';

export default {
  name: 'TransactionRecordDeposit',
  mixins: [mixinTransactionRecordDeposit],
  computed: {
    ...mapGetters(['siteSetting']),
    RecordImageDialog() {
      return () => import(`@/${this.siteSetting.components.transaction.record.RecordImageDialog}`);
    },
  },
};
</script>
