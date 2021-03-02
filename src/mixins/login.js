import { apiGetCaptcha } from '@/api/captcha';
import { cookieGetLang } from '@/utils/cookie';

export default {
  name: 'MixinLogin',
  data() {
    return {
      error: '',
      user: {
        UserName: '',
        Password: '',
        CaptchaValue: '',
        RememberMe: false,
      },
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
    };
  },
  methods: {
    async submitLogin() {
      const result = await this.$store.dispatch('user/login', this.user);

      if (result.Code === 200) {
        const lang = cookieGetLang() || '';
        const requestDataSiteInfo = { DeviceType: 1, Lang: lang };
        this.$store.dispatch('site/postInfo', requestDataSiteInfo);
      } else if (result.Code === 201) {
        //* 帳密錯誤
        this.error = result.ErrMsg;
      } else if (result.Code === 203 || result.Code === 599) {
        //* 驗證碼錯誤
        this.error = result.ErrMsg;
        this.changeCaptcha();
      }
    },
    async changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberLogin' };
      const result = await apiGetCaptcha(requestDataCaptcha);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        this.user.CaptchaValue = '';
      }
    },
  },
};
