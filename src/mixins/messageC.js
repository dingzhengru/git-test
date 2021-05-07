import { apiGetMessageList, apiPostMessageList } from '@/api/message';
import { mapGetters } from 'vuex';

export default {
  name: 'mixinMessageC',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    messageListFiltered() {
      return this.messageList.filter(item => {
        const datetimeEnd = this.$dayjs(item.Lst_EndDateTime);
        const now = this.$dayjs().tz('Africa/Abidjan');
        return datetimeEnd.isBefore(now);
      });
    },
  },
  data() {
    return {
      messageList: [],
    };
  },
  methods: {
    async getMessageList() {
      const requestData = { msgtype: 'C' };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostMessageList(requestData);
      } else {
        requestData.Lang = this.lang;
        result = await apiGetMessageList(requestData);
      }
      if (result.Code == 200) {
        this.messageList = result.RetObj;
      }
    },
  },
  mounted() {
    this.getMessageList();
  },
  watch: {
    lang() {
      this.getMessageList();
    },
  },
};
