import { apiGetMessageList, apiPostMessageList } from '@/api/message';
import { mapGetters } from 'vuex';
export default {
  name: 'MixinNewsMarquee',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    marqueeListFiltered() {
      return this.marqueeList.filter(item => {
        const datetimeEnd = this.$dayjs(item.Lst_EndDateTime);
        const now = this.$dayjs().tz('Africa/Abidjan');
        return now.isBefore(datetimeEnd);
      });
    },
  },
  data() {
    return {
      marqueeList: [],
      // marqueeList: [
      //   {
      //     Lst_Content: '最新消息1',
      //   },
      //   {
      //     Lst_Content: '最新消息2',
      //   },
      //   {
      //     Lst_Content: '最新消息3',
      //   },
      // ],
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
        this.marqueeList = result.RetObj;
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
