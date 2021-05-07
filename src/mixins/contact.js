import { mapGetters } from 'vuex';
import { apiGetContactList } from '@/api/contact';

export default {
  name: 'Contact',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userIsLoggedIn']),
    skype() {
      return this.contactList.find(item => item.Lst_ContactType == 1) || {};
    },
    line() {
      return this.contactList.find(item => item.Lst_ContactType == 2) || {};
    },
    mobile() {
      return this.contactList.find(item => item.Lst_ContactType == 3) || {};
    },
    mail() {
      return this.contactList.find(item => item.Lst_ContactType == 4) || {};
    },
    wechat() {
      return this.contactList.find(item => item.Lst_ContactType == 5) || {};
    },
    service() {
      return this.contactList.find(item => item.Lst_ContactType == 6) || {};
    },
    facebook() {
      return this.contactList.find(item => item.Lst_ContactType == 7) || {};
    },
    telegram() {
      return this.contactList.find(item => item.Lst_ContactType == 8) || {};
    },
    isShowSkype: app => contactItem => {
      return contactItem === app.skype && !app.$isObjEmpty(app.skype) && app.skype.DetailList.length > 0;
    },
    isShowLine: app => contactItem => {
      return contactItem === app.line && !app.$isObjEmpty(app.line) && app.line.DetailList.length > 0;
    },
    isShowLineDropdown: app => contactItem => {
      return contactItem === app.line && !app.$isObjEmpty(app.line) && app.line.DetailList.length > 1;
    },
    isShowMobile: app => contactItem => {
      return contactItem === app.mobile && !app.$isObjEmpty(app.mobile) && app.mobile.DetailList.length > 0;
    },
    isShowMail: app => contactItem => {
      return contactItem === app.mail && !app.$isObjEmpty(app.mail) && app.mail.DetailList.length > 0;
    },
    isShowWechat: app => contactItem => {
      return contactItem === app.wechat && !app.$isObjEmpty(app.wechat) && app.wechat.DetailList.length > 0;
    },
    isShowWechatDropdown: app => contactItem => {
      return contactItem === app.wechat && !app.$isObjEmpty(app.wechat) && app.wechat.DetailList.length > 1;
    },
    isShowService: app => contactItem => {
      return contactItem === app.service && !app.$isObjEmpty(app.service);
    },
    isShowFacebook: app => contactItem => {
      return contactItem === app.facebook && !app.$isObjEmpty(app.facebook) && app.facebook.DetailList.length > 0;
    },
    isShowFacebookDropdown: app => contactItem => {
      return contactItem === app.facebook && !app.$isObjEmpty(app.facebook) && app.facebook.DetailList.length > 1;
    },
    isShowTelegram: app => contactItem => {
      return contactItem === app.telegram && !app.$isObjEmpty(app.telegram) && app.telegram.DetailList.length > 0;
    },
    isShowTelegramDropdown: app => contactItem => {
      return contactItem === app.telegram && !app.$isObjEmpty(app.telegram) && app.telegram.DetailList.length > 1;
    },
  },
  data() {
    return {
      contactList: [],
      zopim: undefined,
      zE: undefined,
      zopimLangMapper: {
        'en-us': 'en',
        'th-th': 'th',
        'zh-cn': 'zh_CN',
        'zh-tw': 'zh_TW',
      },

      isShowDetailMobile: false,
      isShowDetailSkype: false,
      isShowDetailLine: false,
      isShowDetailWechat: false,
      isShowDetailTelegram: false,
    };
  },
  methods: {
    async apiGetContactList() {
      const result = await apiGetContactList();

      if (result.Code == 200) {
        this.contactList = result.RetObj.ServiceList;
      }

      /*eslint-disable no-undef*/
      // 確認是否有 service 在，在的話就執行 jscode
      if (this.service) {
        if (this.service.Js_Type == 'zopim' && typeof $zopim == 'undefined') {
          //* zopim
          console.log('[CustomService]', 'import zopim');
          window.eval(this.service.Js_Code);
          const zopimInterval = setInterval(() => {
            if ($zopim && $zopim.livechat) {
              this.zopim = $zopim;
              this.zopim.livechat.setLanguage(this.zopimLangMapper[this.lang] || 'en');
              this.zopim.livechat.hideAll();
              this.zopim.livechat.window.onHide(() => {
                this.zopim.livechat.hideAll();
              });
              window.clearInterval(zopimInterval);
            }
          }, 500);
        } else if (this.service.Js_Type == 'ze-snippet' && typeof zE == 'undefined') {
          console.log('[CustomService]', 'import ze-snippet');
          const jsSrc = this.service.Js_Code.split('src="')[1].split('"')[0];
          // const jsSrc = 'https://static.zdassets.com/ekr/snippet.js?key=22acc8e3-164e-4f5f-9987-42269dc9635c';

          const scriptElement = document.createElement('script');
          scriptElement.id = 'ze-snippet';
          scriptElement.src = jsSrc;
          document.querySelector('head').append(scriptElement);

          const zeInterval = setInterval(() => {
            if (zE) {
              this.zE = zE;

              console.log(zE);
              console.log(this.zE);

              zE.hide();

              this.zE('webWidget:on', 'close', () => {
                this.zE.hide();
              });

              window.clearInterval(zeInterval);
            }
          }, 500);
        } else if ($zopim) {
          this.zopim = $zopim;
        } else if (zE) {
          this.zE = zE;
        }
      }
      /*eslint-enable no-undef*/
    },
    clickServiceHandler() {
      if (this.zopim) {
        //* zopim
        this.zopim.livechat.window.show();
      } else if (this.zE) {
        //* ze-snippet
        console.log('[zE]', this.zE('webWidget:get', 'display'));
        this.zE('webWidget', 'show');
        this.zE('webWidget', 'open');
      }
      //else if (contact.Js_Type == 'livechatinc') {
      //   if (LC_API.chat_window_hidden()) {
      //     LC_API.open_chat_window();
      //   } else {
      //     LC_API.hide_chat_window();
      //   }
      // }
    },
    openContactLink(contact, content) {
      if (contact == this.skype) {
        window.open(`skype:${content.Lst_ContactValue}?call`, '_self');
      } else if (contact == this.line) {
        window.open(`https://line.me/ti/p/~${content.Lst_ContactValue}`);
      } else if (contact == this.mobile) {
        window.open(`tel:${content.Lst_ContactValue}`, '_self');
      } else if (contact == this.email) {
        window.open(`mailto:${content.Lst_ContactValue}`, '_self');
      } else if (contact == this.wechat) {
        //* 參考: https://stackoverflow.com/a/41297068/5134658
        //* weixin:// 打開指定用戶方法，已只適用於少數白名單應用程式，最多就用此連結開啟程式
        window.open(`http://weixin.qq.com/r/${content.Lst_ContactValue}`);
      } else if (contact == this.facebook) {
        window.open(content.Lst_ContactValue);
      } else if (contact == this.telegram) {
        window.open(`https://t.me/${content.Lst_ContactValue}`);
      }
    },
    closeAllContentList() {
      this.contactList.forEach(item => {
        item.isShowContentList = false;
      });
      this.$forceUpdate();
    },
  },
  async mounted() {
    this.apiGetContactList();
  },
  watch: {
    lang() {
      if (this.zopim && this.zopim.livechat) {
        this.zopim.livechat.setLanguage(this.zopimLangMapper[this.lang] || 'en');
      } else if (this.zE) {
        this.zE.setLocale(this.lang);
      }
    },
  },
};
