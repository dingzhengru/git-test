<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.deposit.table.date') }}</th>
        <th>{{ $t('transaction.recordContent.deposit.table.status') }}</th>
        <th>{{ $t('transaction.recordContent.deposit.table.amount') }}</th>
        <th>{{ $t('transaction.recordContent.deposit.table.promotion') }}</th>
        <th></th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>{{ item.Lst_CreateTime }}</td>
          <td>{{ item.Lst_StatusName }}</td>
          <td>{{ $numeral(item.Lst_MoneyIncome).format('0,0.00') }}</td>
          <td>{{ item.Lst_ActivityName }}</td>
          <td @click="toggleRecordDetail(item)">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5">
            <div>{{ $t('transaction.recordContent.deposit.table.detail.bank') }}：{{ item.Lst_MemberBankName }}</div>
            <div>{{ $t('transaction.recordContent.deposit.table.detail.paymentMethod') }}：{{ item.Lst_DMTitle }}</div>
            <div>
              {{ $t('transaction.recordContent.deposit.table.detail.transactionNumber') }}： {{ item.Lst_TransID }}
            </div>
            <div>
              {{ $t('transaction.recordContent.deposit.table.detail.receipt') }}：
              <a href="javascript:;" @click="openReceiptImage(item)" v-if="item.Lst_ImageUrl">
                {{ item.Lst_Receipt }}
              </a>
              <span v-else>{{ item.Lst_Receipt }}</span>
            </div>
            <div>{{ $t('transaction.recordContent.deposit.table.detail.transactionTime') }}：{{ item.Lst_Mtime }}</div>
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <div class="ui-notice">
      <ul>
        <li>{{ $t('transaction.recordContent.deposit.notice') }}</li>
      </ul>
    </div>

    <ModalNoticeImage :image="receiptImageUrl" v-if="receiptImageUrl" @close="closeReceiptImage" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinTransactionRecordDeposit from '@/mixins/transactionRecordDeposit';
import ModalNoticeImage from '@/components/ModalNoticeImage';

export default {
  name: 'TransactionRecordDeposit',
  mixins: [mixinTransactionRecordDeposit],
  components: {
    ModalNoticeImage,
  },
  computed: {
    ...mapGetters(['siteSetting']),
    RecordImageDialog() {
      return () => import(`@/${this.siteSetting.components.transaction.record.RecordImageDialog}`);
    },
  },
};
</script>
