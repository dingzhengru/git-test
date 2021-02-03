import { apiGetMessageList } from '@/api/message';
import { mapGetters } from 'vuex';
export default {
  name: 'NewsMarquee',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      marqueeList: [
        {
          text: '最新消息1',
        },
        {
          text: '最新消息2',
        },
        {
          text: '最新消息3',
        },
      ],
    };
  },
  methods: {
    async getMessageMarqueeList() {
      const requestDataMessageList = { msgtype: 'B' };
      await apiGetMessageList(requestDataMessageList);
      // if (result.Code == 200) {
      //   this.marqueeList = result.RetObj;
      // }
    },
  },
  mounted() {
    this.getMessageMarqueeList();
  },
  watch: {
    lang() {
      this.getMessageMarqueeList();
    },
  },
};
