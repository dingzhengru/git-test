<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.lottery.title') }}</h3>
      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.lottery.table.prize') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_PrizeName }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.lottery.table.status') }}
              </th>
              <td
                class="record-content__ul__li__table__td-2nd td-2nd"
                :class="{
                  'ui-txt-positive': item.Lst_GiveoutStatus == 1,
                  'ui-txt-negative': item.Lst_GiveoutStatus != 1,
                }"
              >
                {{ item.Lst_GiveoutName }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.lottery.table.type') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_PrizeType }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.lottery.table.datetime') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_CTime.replace('T', ' ').split('.')[0] }}
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
import mixinTransactionRecordLottery from '@/mixins/transactionRecordLottery';

export default {
  name: 'TransactionRecordLottery',
  mixins: [mixinTransactionRecordLottery],
};
</script>
