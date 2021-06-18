<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.adjustment.table.status') }}</th>
        <th>{{ $t('transaction.recordContent.adjustment.table.description') }}</th>
        <th>{{ $t('transaction.recordContent.adjustment.table.point') }}</th>
        <th>{{ $t('transaction.recordContent.adjustment.table.datetime') }}</th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            {{ item.Lst_PaymentType }}
          </td>
          <td>{{ item.Lst_Memo }}</td>
          <td>{{ $numeral(item.Lst_Amount).format('0,0.00') }}</td>
          <td>
            {{ item.Lst_TransTime.split('T')[0] }} <br />
            {{ item.Lst_TransTime.split('T')[1].split('.')[0] }}
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <intersect rootMargin="0px 0px 5px 0px" @enter="changePageScrollHandler">
      <div></div>
    </intersect>
  </div>
</template>

<script>
import mixinTransactionRecordAdjustment from '@/mixins/transactionRecordAdjustment';
import Intersect from 'vue-intersect';

export default {
  name: 'TransactionRecordAdjustment',
  mixins: [mixinTransactionRecordAdjustment],
  components: {
    Intersect,
  },
};
</script>
