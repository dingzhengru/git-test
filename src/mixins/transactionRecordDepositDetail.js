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
