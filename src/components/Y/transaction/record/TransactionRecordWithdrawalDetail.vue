<template>
  <div>
    <div class="record-detail">
      <div class="theme-content-box">
        <h3 class="theme-h3-boxTitle">{{ $t(`transaction.recordDetail.withdrawal.title`) }}</h3>

        <ul class="record-detail__ol theme-ul-listView">
          <li class="record-detail__ol__li theme-li-listView" v-for="(item, index) in detailList" :key="index">
            <table class="record-detail__table ui-table02">
              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.amount`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ $numeral(item.Lst_MoneyPayment).format('0,0.00') }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.serviceCharge`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd ui-txt-positive">
                  {{ item.Lst_Charges }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.createdDate`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_CreateTime }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.submitDate`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_CasherTime.split(' ')[0] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.transactionTime`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_CasherTime.split(' ')[1] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.withdrawal.table.transactionNumber`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_TransID }}
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
import mixinTransactionRecordWithdrawalDetail from '@/mixins/transactionRecordWithdrawalDetail';

export default {
  name: 'TransactionRecordWithdrawalDetail',
  mixins: [mixinTransactionRecordWithdrawalDetail],
};
</script>
