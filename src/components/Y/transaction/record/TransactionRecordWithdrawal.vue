<template>
  <div class="record-content">
    <div class="record-content__box theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ $t('transaction.recordContent.withdrawal.title') }}</h3>
      <ul class="record-content__ul theme-ul-listView">
        <li class="record-content__ul__li theme-li-listView" v-for="item in recordList" :key="item.Lst_TransID">
          <table class="record-content__ul__li__table ui-table01">
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawal.table.date') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_CreateTime.split('T')[0] }}
              </td>
            </tr>
            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawal.table.bank') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd">
                {{ item.Lst_MemberBankName }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawal.table.amount') }}
              </th>
              <td class="record-content__ul__li__table__td-2nd td-2nd ui-txt-negative">
                {{ $numeral(item.Lst_MoneyPayment).format('0,0.00') }}
              </td>
            </tr>

            <tr>
              <th class="record-content__ul__li__table__th-1st th-1st">
                {{ $t('transaction.recordContent.withdrawal.table.detail') }}
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

    <p class="record-content__notice">{{ $t('transaction.recordContent.withdrawal.notice') }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawal } from '@/api/transaction-record';

export default {
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],
    };
  },
  methods: {
    async getRecord() {
      const result = await apiGetRecordWithdrawal();
      this.recordList = result.RetObj.Rows;
    },
    goRecordDetail(record) {
      if (record.Lst_Status == 2) {
        const query = { TransID: record.Lst_TransID };
        this.$router.push({ name: 'TransactionRecordWithdrawalDetail', query });
      }
    },
  },
  mounted() {
    this.getRecord();
  },
  watch: {
    lang() {
      this.getRecord();
    },
  },
};
</script>
