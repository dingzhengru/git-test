import { mapGetters } from 'vuex';

import { apiGetRecordDetailWithdrawalRestriction } from '@/api/transaction-record';

export default {
  name: 'TransactionRecordDetail',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      detailList: [],
    };
  },
  methods: {
    async getRecordDetail() {
      const result = await apiGetRecordDetailWithdrawalRestriction(this.$route.query);
      this.detailList = result.RetObj;
    },
  },
  mounted() {
    this.getRecordDetail();
  },
  watch: {
    lang() {
      this.getRecordDetail();
    },
  },
};
