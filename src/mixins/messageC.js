import { apiGetMessageList } from '@/api/message';
export default {
  name: 'mixinMessageC',
  data() {
    return {
      messageList: [],
    };
  },
  methods: {
    async getMessageList() {
      const requestDataMessageList = { msgtype: 'C' };
      const result = await apiGetMessageList(requestDataMessageList);
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
