import { mapGetters } from 'vuex';

import { apiGetRecordDepositDetail } from '@/api/transaction-record';

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
    async getRecordDetail(query) {
      const result = await apiGetRecordDepositDetail(query || this.$route.query);
      this.detailList = result.RetObj.Rows;
    },
  },
  mounted() {
    if (this.$route.query) {
      this.getRecordDetail(this.$route.query);
    }
  },
  watch: {
    lang() {
      if (this.$route.query) {
        this.getRecordDetail(this.$route.query);
      }
    },
  },
};
