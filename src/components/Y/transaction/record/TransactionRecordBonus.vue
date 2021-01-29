<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.bonus.title') }}</h3>
      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.bonus.table.activity') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_Name }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.bonus.table.bindWallet') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_WalletLimit }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.bonus.table.issue') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd ui-txt-positive">
                {{ $numeral(item.Lst_Bonus).format('0,0.00') }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.bonus.table.datetime') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_MTime.replace('T', ' ').split('.')[0] }}
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
import mixinTransactionRecordBonus from '@/mixins/transactionRecordBonus';

export default {
  name: 'TransactionRecordBonus',
  mixins: [mixinTransactionRecordBonus],
};
</script>
