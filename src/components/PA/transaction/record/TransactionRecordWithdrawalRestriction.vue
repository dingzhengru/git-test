<template>
  <div class="record-content">
    <table class="ui-table record-content__table">
      <tr>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.type') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.restriction') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.notRolloverExchange') }}</th>
        <th>{{ $t('transaction.recordContent.withdrawalRestriction.table.rolloverDeadline') }}</th>
        <th></th>
      </tr>
      <template v-for="(item, index) in recordList">
        <tr :key="item.Lst_TransID + String(index)">
          <td>
            {{ item.Lst_WashCodeTypeStr }}
          </td>
          <td>{{ item.Lst_Procudt_Name }}</td>
          <td>{{ $numeral(item.Lst_Need_Washcode).format('0,0.00') }}</td>
          <td>{{ item.Lst_Ctime.split('T')[0] }}</td>
          <td @click="toggleRecordDetail(item)">
            <i class="record-content__icon--detail" :class="{ close: item.isShowDetail }"></i>
          </td>
        </tr>
        <tr class="record-content__table__tr--detail" :key="item.Lst_TransID" v-show="item.isShowDetail">
          <td colspan="5" class="record-content__table__tr--detail__list">
            <div v-for="(detail, index) in item.DetailItems" :key="index">
              <div>
                {{ $t('transaction.recordContent.withdrawalRestriction.table.detail.activity') }}：
                {{ detail.Lst_Activty_Name }}
              </div>
              <div>
                {{ $t('transaction.recordContent.withdrawalRestriction.table.detail.bonusIssue') }}：：{{
                  detail.Lst_Bonus
                }}
              </div>
              <div>
                {{ $t('transaction.recordContent.withdrawalRestriction.table.detail.datetime') }}：：
                {{ detail.Lst_Mtime.replace('T', ' ').split('.')[0] }}
              </div>
            </div>
          </td>
        </tr>
      </template>
    </table>

    <div class="ui-no-data" v-show="recordList.length === 0">{{ $t('ui.label.noData') }}</div>

    <intersect @enter="changePageScrollHandler" rootMargin="0px 0px 5px 0px">
      <div></div>
    </intersect>
  </div>
</template>

<script>
import mixinTransactionRecordWithdrawalRestriction from '@/mixins/transactionRecordWithdrawalRestriction';
import Intersect from 'vue-intersect';

export default {
  name: 'TransactionRecordWithdrawalRestriction',
  mixins: [mixinTransactionRecordWithdrawalRestriction],
  components: {
    Intersect,
  },
};
</script>
