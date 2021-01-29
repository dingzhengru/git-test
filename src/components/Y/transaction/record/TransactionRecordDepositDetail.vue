<template>
  <div>
    <div class="record-detail">
      <div class="theme-content-box">
        <h3 class="theme-h3-boxTitle">{{ $t(`transaction.recordDetail.deposit.title`) }}</h3>

        <ul class="record-detail__ol theme-ul-listView">
          <li class="record-detail__ol__li theme-li-listView" v-for="(item, index) in detailList" :key="index">
            <table class="record-detail__table ui-table02">
              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.bank`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_BankName }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.rollinPoint`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd ui-txt-positive">
                  {{ $numeral(item.Lst_Money).format('0,0.00') }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.createdDate`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_CreateTime }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.submitDate`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Mtime.split(' ')[0] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.transactionTime`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Mtime.split(' ')[1] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.paymentMethod`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_DMTitle }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.transactionNumber`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_TransID }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.deposit.table.activity`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_ActivityName }}
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
import { mapGetters } from 'vuex';

import { apiGetRecordDepositDetail } from '@/api/transaction-record';

export default {
  name: 'TransactionRecordDetail',
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
  },
  data() {
    return {
      detailList: [],
    };
  },
  methods: {
    async getRecordDetail() {
      const result = await apiGetRecordDepositDetail(this.$route.query);
      this.detailList = result.RetObj.Rows;
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-record.scss`);

    this.getRecordDetail();
  },
  watch: {
    lang() {
      this.getRecordDetail();
    },
  },
};
</script>
