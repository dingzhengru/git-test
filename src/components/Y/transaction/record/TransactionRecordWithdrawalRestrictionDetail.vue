<template>
  <div>
    <div class="record-detail">
      <div class="theme-content-box">
        <h3 class="theme-h3-boxTitle">{{ $t(`transaction.recordDetail.withdrawalRestriction.title`) }}</h3>

        <ul class="record-detail__ol theme-ul-listView">
          <li class="record-detail__ol__li theme-li-listView" v-for="(item, index) in detailList" :key="index">
            <table class="record-detail__table ui-table02">
              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawalRestriction.table.activity`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Activty_Name }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawalRestriction.table.bonusIssue`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd ui-txt-positive">
                  {{ $numeral(item.Lst_Bonus).format('0,0.00') }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawalRestriction.table.datetime`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Mtime.replace('T', ' ').split('.')[0] }}
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </div>
      <div class="record-detail__button-div">
        <button type="button" class="record-detail__button-div--return ui-btn ui-btn--long" @click="$router.go(-1)">
          {{ $t('transaction.recordDetail.button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mixinTransactionRecordWithdrawalRestrictionDetail from '@/mixins/transactionRecordWithdrawalRestrictionDetail';

export default {
  name: 'TransactionRecordWithdrawalRestrictionDetail',
  mixins: [mixinTransactionRecordWithdrawalRestrictionDetail],
};
</script>
