import { mapGetters } from 'vuex';
import { apiGetMailCategoryList, apiSendMail } from '@/api/notification';

export default {
  name: 'MixinUserMailSend',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      categoryList: [],
      mail: {
        Add_Category: '',
        Add_Subject: '',
        Add_Content: '',
        Add_ReplyPath: '',
      },
    };
  },
  methods: {
    async submitMail() {
      const result = await apiSendMail(this.mail);

      if (result.Code == 200) {
        this.resetForm();
        window.alert(this.$t('alert.sendEmailSuccess'));
      }
    },
    async getMailCategoryList() {
      const result = await apiGetMailCategoryList();

      this.categoryList = result.RetObj;
    },
    resetForm() {
      this.mail = { Add_Category: '', Add_Subject: '', Add_Content: '', Add_ReplyPath: '' };
    },
  },
  mounted() {
    this.getMailCategoryList();
  },
  watch: {
    lang() {
      this.getMailCategoryList();
    },
  },
};
