<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.withdrawalRestriction.title') }}</h3>
      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawalRestriction.table.type') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_WashCodeTypeStr }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawalRestriction.table.restriction') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd" @click="goRecordDetail(item)">
                {{ item.Lst_Procudt_Name }}
                <a class="ui-lnk-detail" href="javascript:;"></a>
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawalRestriction.table.notRolloverExchange') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd ui-txt-positive">
                {{ item.Lst_Need_Washcode }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawalRestriction.table.rolloverDeadline') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_Ctime.split('T')[0] }}
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
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
