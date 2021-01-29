<template>
  <div>
    <div class="record-detail">
      <div class="theme-content-box">
        <h3 class="theme-h3-boxTitle">{{ $t(`transaction.recordDetail.transfer.title`) }}</h3>

        <ul class="record-detail__ol theme-ul-listView">
          <li class="record-detail__ol__li theme-li-listView" v-for="(item, index) in detailList" :key="index">
            <table class="record-detail__table ui-table02">
              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.game`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_ProductName }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.rollinPoint`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd ui-txt-positive">
                  {{ $numeral(item.Lst_PointPayment).format('0,0.00') }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.rolloutPoint`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd ui-txt-negative">
                  {{ $numeral(item.Lst_PointIncome).format('0,0.00') }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.accountingDate`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_TransTime.split(' ')[0] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.transactionTime`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_TransTime.split(' ')[1] }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.beforeWallet`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Org_Point }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.afterWallet`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Final_Point }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.beforeGameAccount`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Org_Game_Point }}
                </td>
              </tr>

              <tr>
                <th class="record-detail__table__th-1st th-1st">
                  {{ $t(`transaction.recordDetail.transfer.table.afterGameAccount`) }}
                </th>
                <td class="record-detail__table__td-2nd td-2nd">
                  {{ item.Lst_Final_Game_Point }}
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

import { apiGetRecordTransferDetail } from '@/api/transaction-record';

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
      const result = await apiGetRecordTransferDetail(this.$route.query);
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
