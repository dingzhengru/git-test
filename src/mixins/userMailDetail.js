import { apiGetInboxDetail, apiSendMail } from '@/api/notification';

export default {
  name: 'MixinUserMailDetail',
  props: {
    mailKey: {
      type: Number,
      default: () => null,
    },
  },
  data() {
    return {
      list: [],
      mail: {
        Add_Category: '',
        Add_Subject: '',
        Add_ReplyPath: '',
        Add_Content: '',
      },
    };
  },
  methods: {
    async getInboxDetail(mailKey = '') {
      if (this.mailKey) {
        mailKey = this.mailKey;
      } else {
        mailKey = this.$route.params.key;
      }
      const requestData = { KEY: mailKey };
      const result = await apiGetInboxDetail(requestData);

      this.list = result.RetObj.Rows;
      this.mail.Add_Category = result.RetObj.Add_Category;
      this.mail.Add_Subject = result.RetObj.Add_Subject;
      this.mail.Add_ReplyPath = result.RetObj.Add_ReplyPath;
    },
    async submitMail() {
      const result = await apiSendMail(this.mail);

      if (result.Code == 200) {
        window.alert(this.$t('alert.replaySuccess'));
        this.resetForm();
      }
    },
    resetForm() {
      this.mail.Add_Content = '';
    },
  },
  mounted() {
    this.getInboxDetail();
  },
  watch: {
    mailKey() {
      this.getInboxDetail();
    },
  },
};
