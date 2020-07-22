<template>
  <div>
    <TransactionRecordDetailList :list="list" :title="title" />
  </div>
</template>

<script>
export default {
  name: 'TransactionRecordDetail',
  components: {
    TransactionRecordDetailList: () => import('@/components/Y/transaction/record/TransactionRecordDetailList'),
  },
  data() {
    return {
      list: [],
      title: '',
    };
  },
  mounted() {
    switch (this.$route.params.name) {
      case 'deposit': {
        this.list = [
          {
            bankRecorded: 'SCB-VIP',
            rollinOfPoints: 1000,
            creationDate: '2020-07-21',
            submitDate: '2020-07-21',
            transactionTime: '11:41:26',
            payMentMethod: 'WebATM',
            transactionNumber: this.$route.params.id,
            activity: '輪盤測試',
          },
        ];
        this.title = 'Deposit Details';
        break;
      }
      case 'withdrawal': {
        this.list = [];
        this.title = 'Withdrawals Record';
        break;
      }
      case 'transfer': {
        this.list = [
          {
            id: '000',
            game: 'Royal Gaming',
            rollinOfPoints: 0,
            rolloutOfPoints: -767,
            accountingDate: '2020-07-21',
            transactionTime: '11:05:38',
            walletBeforeTransfer: 8933,
            walletAfterTransfer: 9700,
            gameAccountBeforeTransfer: 767,
            gameAccountAfterTransfer: 0,
          },
        ];
        this.title = 'Transfer Details';
        break;
      }
      case 'bonus': {
        break;
      }
      case 'lottery': {
        this.list = [];
        this.title = 'Lottery Details';
        break;
      }
      case 'withdrawal-restriction': {
        this.list = [
          {
            id: '000',
            activityName: 'Cash Flow',
            bonusIssue: 0,
            datetime: '2020-07-21 11:41:35',
          },
          {
            id: '111',
            activityName: 'Cash Flow',
            bonusIssue: 10,
            datetime: '2020-07-21 11:41:35',
          },
        ];
        this.title = 'Withdrawal Restriction Details';
        break;
      }
      case 'adjustment': {
        this.list = [];
        this.title = 'Adjustment Details';
        break;
      }
    }
  },
};
</script>

<style scoped></style>
