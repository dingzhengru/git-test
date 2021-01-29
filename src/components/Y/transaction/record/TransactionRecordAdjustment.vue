<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.adjustment.title') }}</h3>
      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.adjustment.table.status') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_PaymentType }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.adjustment.table.description') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_Memo }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.adjustment.table.point') }}
              </th>
              <td
                class="record-content__ul__li__table__td-2nd td-2nd"
                :class="{
                  'ui-txt-positive': Number(item.Lst_Amount) > 0,
                  'ui-txt-negative': Number(item.Lst_Amount) < 0,
                }"
              >
                {{ $numeral(item.Lst_Amount).format('0,0.00') }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.adjustment.table.datetime') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_TransTime.replace('T', ' ').split('.')[0] }}
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
import mixinTransactionRecordAdjustment from '@/mixins/transactionRecordAdjustment';

export default {
  name: 'TransactionRecordAdjustment',
  mixins: [mixinTransactionRecordAdjustment],
};
</script>
