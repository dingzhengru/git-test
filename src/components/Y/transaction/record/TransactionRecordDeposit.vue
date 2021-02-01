<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.deposit.title') }}</h3>

      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.deposit.table.date') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_CreateTime.split('T')[0] }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.deposit.table.bank') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_MemberBankName }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.deposit.table.amount') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd ui-txt-positive">
                {{ $numeral(item.Lst_MoneyIncome).format('0,0.00') }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.deposit.table.receipt') }}
              </th>
              <td
                class="record-content__ul__li__table__td-2nd td-2nd"
                :class="{ 'ui-txt-link': item.Lst_ImageUrl }"
                @click="openReceiptImage(item)"
              >
                {{ item.Lst_Receipt }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.deposit.table.detail') }}
              </th>
              <td
                class="record-content__ul__li__table__td-2nd td-2nd"
                :class="{ 'ui-txt-positive': item.Lst_Status == 2, 'ui-txt-negative': item.Lst_Status != 2 }"
                @click="goRecordDetail(item)"
              >
                {{ item.Lst_StatusName }}
                <a class="ui-lnk-detail" href="javascript:;" v-show="item.Lst_Status == 2"></a>
              </td>
            </tr>
          </table>
        </li>
      </ul>
    </div>

    <p class="record-content__notice">{{ $t('transaction.recordContent.deposit.notice') }}</p>

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
