import { apiGetMessageList, apiPostMessageList } from '@/api/message';
import { mapGetters } from 'vuex';
export default {
  name: 'NewsMarquee',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
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
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostMessageList(requestDataMessageList);
      } else {
        result = await apiGetMessageList(requestDataMessageList);
      }
      if (result.Code == 200) {
        // this.marqueeList = result.RetObj;
      }
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
