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
      const requestData = { msgtype: 'B' };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostMessageList(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetMessageList(requestData);
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
