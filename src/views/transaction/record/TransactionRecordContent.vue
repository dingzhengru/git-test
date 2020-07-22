<template>
  <div>
    <TransactionRecordContentList
      :list="list"
      :title="title"
      :detailKey="detailKey"
      :notice="notice"
      :isSearchActive="isSearchActive"
      :isPageActive="isPageActive"
      :productList="productList"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getProductList } from '@/api/product';
export default {
  name: 'TransactionRecordContent',
  components: {
    TransactionRecordContentList: () => import('@/components/Y/transaction/record/TransactionRecordContentList'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [],
      title: '',
      detailKey: '', //* 放 detail link 的欄位名稱
      notice: '', //* 最下方的小字
      isSearchActive: false,
      isPageActive: false,
      productList: [],
    };
  },
  mounted() {
    switch (this.$route.params.name) {
      case 'deposit': {
        this.list = [
          {
            id: 'DR200721114109903',
            isSuccess: true,
            depositDate: '2020-07-21',
            depositBank: 'KNANK',
            depositAmount: 1000,
            depositReceipt: '',
            depositDetail: 'Successful',
          },
          {
            id: 'DR200721111105963',
            isSuccess: false,
            depositDate: '2020-07-22',
            depositBank: 'KNANK123',
            depositAmount: 10000,
            depositReceipt: 'Remittance Receipt',
            depositDetail: 'Under review',
          },
        ];
        this.title = 'Deposit Record';
        this.detailKey = 'depositDetail';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      }
      case 'withdrawal': {
        this.list = [
          {
            id: '',
            isSuccess: false,
            withdrawalDate: '2020-07-21',
            withdrawalBank: 'SCB',
            withdrawalAmount: 1000,
            withdrawalDetail: 'Under review',
          },
        ];
        this.title = 'Withdrawals Record';
        this.detailKey = 'withdrawalDetail';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      }
      case 'transfer': {
        this.list = [
          {
            id: '000',
            transferDate: '2020-07-21',
            transferGame: 'Royal Gaming',
            transferType: 'Roll-out of Points',
            transferAmount: -767,
          },
          {
            id: '111',
            transferDate: '2020-07-22',
            transferGame: 'Royal Gaming',
            transferType: 'Roll-out of Points',
            transferAmount: 1122,
          },
        ];
        this.title = 'Transfer Record';
        this.detailKey = 'transferAmount';
        this.isSearchActive = true;
        this.isPageActive = true;

        // * 取得遊戲館列表
        const requestDataProductList = { DeviceType: 1 };
        getProductList(requestDataProductList).then(result => {
          if (result.Code == 200) {
            this.productList = result.RetObj;
            console.log('[Product]', this.productList);
          }
        });
        break;
      }
      case 'bonus': {
        this.list = [
          {
            id: '000',
            bonusActivityName: 'ฝากเพิ่มรับสูงสุด 88,888',
            bonusBindPurse: 'Wallet',
            bonusIssue: 10,
            bonusDatetime: '2020-07-21 11:13:42',
          },
          {
            id: '111',
            bonusActivityName: 'ฝากเพิ่มรับสูงสุด 88,888',
            bonusBindPurse: 'Wallet',
            bonusIssue: -10,
            bonusDatetime: '2020-07-22 11:13:42',
          },
        ];
        this.title = 'Bonus Record';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
      case 'lottery': {
        this.list = [
          {
            id: '000',
            isSuccess: false,
            lotteryPrize: '88',
            lotteryStatus: 'Undelivered',
            lotteryType: 'Prize',
            lotteryDatetime: '2020-07-21 11:41:52',
          },
          {
            id: '111',
            isSuccess: true,
            lotteryPrize: '8888',
            lotteryStatus: 'Successful',
            lotteryType: 'Prize',
            lotteryDatetime: '2020-07-22 13:41:52',
          },
        ];
        this.title = 'Lottery Record';
        this.detailKey = 'lotteryStatus';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
      case 'withdrawal-restriction': {
        this.list = [
          {
            id: '000',
            withdrawalRestrictionType: 'General washing code',
            withdrawalRestrictionContent: 'Withdrawal Bouns-Wallet',
            'withdrawalRestriction non-rollover Exchange Volume': 13120,
            'withdrawalRestriction deadline Of Rollover Exchange': '2021-2-6',
          },
        ];
        this.title = 'Withdrawal Restriction';
        this.detailKey = 'withdrawalRestrictionContent';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
      case 'adjustment': {
        this.list = [
          {
            id: '000',
            adjustmentStatus: 'Deduction from Points',
            adjustmentDescription: 'description',
            adjustmentPoints: -1000,
            adjustmentDatetime: '2020-07-21 11:20:24',
          },
        ];
        this.title = 'Adjustment Record';
        this.isSearchActive = false;
        this.isPageActive = true;
        break;
      }
    }
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/record-content.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        // * 取得遊戲館列表
        // const requestDataProductList = {
        //   DeviceType: 1,
        // };
        // getProductList(requestDataProductList).then(result => {
        //   if (result.Code == 200) {
        //     this.productList = result.RetObj;
        //     console.log('[Product]', this.productList);
        //   }
        // });
      },
    },
  },
};
</script>

<style scoped></style>
