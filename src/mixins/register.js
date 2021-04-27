import { mapGetters } from 'vuex';
import { apiGetCaptcha } from '@/api/captcha';
import { apiGetRegisterFieldList } from '@/api/register';
import { registerFieldList } from '@/utils/register';
import { cookieGetLang } from '@/utils/cookie';
import mixinCheckField from '@/mixins/checkField';

export default {
  name: 'MixinRegister',
  mixins: [mixinCheckField],
  computed: {
    ...mapGetters(['lang', 'userToken', 'userPublicKey']),
    fullName() {
      let fullName = '';
      const firstName = this.fieldList.find(item => item.name == 'Add_FirstName').value;
      const lastName = this.fieldList.find(item => item.name == 'Add_LastName').value;

      if (this.lang == 'zh-cn') {
        fullName = `${lastName}${firstName}`.trim();
      } else {
        fullName = `${firstName} ${lastName}`.trim();
      }

      return fullName;
    },
  },
  data() {
    return {
      fieldList: [...registerFieldList],
      noticeList: ['register.notice.required', 'register.notice.recommend', 'register.notice.contact'],
      bankList: [],
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
      isAgreeServiceTerm: false,
      isShowModalServiceTerm: false,
    };
  },
  methods: {
    async changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberRegister' };
      const result = await apiGetCaptcha(requestDataCaptcha);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        const captcha = this.fieldList.find(item => item.name == 'CaptchaValue');
        captcha.value = '';
      }
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
    },
    async submitRegister() {
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      const result = await this.$store.dispatch('user/register', requestData);

      if (result.Code === 200) {
        const lang = cookieGetLang() || '';
        const requestDataSiteInfo = { DeviceType: 1, Lang: lang };
        this.$store.dispatch('site/postInfo', requestDataSiteInfo);
      } else if (result.Code === 500) {
        window.alert(result.ErrMsg);
        this.changeCaptcha();
      }
    },
  },
  async mounted() {
    //* 取得公鑰 & token
    if (!this.userToken || !this.userPublicKey) {
      await this.$store.dispatch('user/getTokenAndPublicKey');
    }

    const result = await apiGetRegisterFieldList();

    this.bankList = result.RetObj.Add_BankList;

    for (const registerField of result.RetObj.Register) {
      const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

      if (field) {
        // field.value = registerField.Lst_Value;
        field.isShow = registerField.Lst_Phase == 1;
        field.isOnly = registerField.Lst_isOnly;
        field.isRequired = registerField.Lst_isRequired;
        field.rules['register-required'] = registerField.Lst_isRequired;

        //* 目前只有 Add_RelatedAccount 有可能需要賦予值
        if (field.name == 'Add_RelatedAccount') {
          field.value = registerField.Lst_Value;
        }

        //* Add_RealName 是不可修改
        //* 推薦人若已有值，就也不能修改
        if (field.name == 'Add_RealName') {
          field.isModifiable = false;
        } else if (field.name == 'Add_RelatedAccount' && field.value) {
          field.isModifiable = false;
        } else {
          field.isModifiable = true;
        }
      }
    }

    this.changeCaptcha();
  },
  watch: {
    fullName() {
      const realName = this.fieldList.find(item => item.name == 'Add_RealName');
      realName.value = this.fullName;
    },
  },
};
