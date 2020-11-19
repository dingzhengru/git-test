import { apiGetCaptcha } from '@/api/captcha';
import idMapper from '@/idMapper';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'LoginMixin',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      idMapper: idMapper,
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

      if (result.Code == 201) {
        //* 帳密錯誤
        this.error = result.ErrMsg;
      } else if (result.Code == 203 || result.Code == 599) {
        //* 驗證碼錯誤
        this.error = result.ErrMsg;
        this.changeCaptcha();
      } else if (result.Code == 502 || result.Code == 615) {
        //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
        //* 615: JsonError，推測是公鑰與私鑰沒對上，已於攔截器上換新的公鑰
        //* 重新送出請求 (現在放在攔截器)
        // this.submitLogin();
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
