import { apiGetMessageList, apiPostMessageList } from '@/api/message';
import { mapGetters } from 'vuex';

export default {
  name: 'mixinMessageC',
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
  },
  data() {
    return {
      messageList: [],
    };
  },
  methods: {
    async getMessageList() {
      const requestDataMessageList = { msgtype: 'C' };
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostMessageList(requestDataMessageList);
      } else {
        result = await apiGetMessageList(requestDataMessageList);
      }
      if (result.Code == 200) {
        this.messageList = result.RetObj;

        this.messageList = [
          {
            Lst_Content: '测试',
          },
          {
            Lst_Content: '测试2',
          },
        ];
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
