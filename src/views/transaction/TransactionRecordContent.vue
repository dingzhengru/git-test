<template>
  <div>
    <TransactionRecordContentList
      :list="list"
      :title="title"
      :notice="notice"
      :isSearchActive="isSearchActive"
      :isPageActive="isPageActive"
      :pagesize="pagesize"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      name: '',
      list: [],
      title: '',
      notice: '',
      isSearchActive: false,
      isPageActive: false,
      pagesize: 10,
    };
  },
  mounted() {
    this.name = this.$route.params.name;
    console.log(this.name);

    switch (this.name) {
      case 'deposit':
        this.list = [
          {
            id: 'DR200721114109903',
            isSuccess: true,
            date: '2020-07-21',
            bank: 'KNANK123',
            amount: 1000,
            receipt: '',
            detail: 'Successful',
          },
          {
            id: 'DR200721111105963',
            isSuccess: false,
            date: '2020-07-21',
            bank: 'KNANK123',
            amount: 10000,
            receipt: 'Remittance Receipt',
            detail: 'Under review',
          },
        ];
        this.title = 'Deposit Record';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      case 'withdraw':
        this.list = [
          {
            id: '',
            isSuccess: false,
            date: '2020-07-21',
            bank: 'SCB',
            amount: 1000,
            detail: 'Under review',
          },
        ];
        this.title = 'Deposit Record';
        this.notice = `Here are the latest 10 trading records of this month, if you have any questions, please contact with our online service for checking up with our general ledger`;
        break;
      case 'transfer':
        this.list = [
          {
            id: '',
            isSuccess: false,
            date: '2020-07-21',
            game: 'Royal Gaming',
            type: 'Roll-out of Points',
            amount: -767,
          },
        ];
        this.title = 'Deposit Record';
        this.isSearchActive = true;
        this.isPageActive = true;
        this.pagesize = 10;
        break;
    }
  },
};
</script>

<style scoped></style>
