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
    };
  },
  methods: {
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
        window.open(`https://line.me/ti/p/${content.Lst_ContactValue}`);
      } else if (contact == this.mobile) {
        window.open(`tel:${content.Lst_ContactValue}`, '_self');
      } else if (contact == this.email) {
        window.open(`mailto:${content.Lst_ContactValue}`, '_self');
      } else if (contact == this.wechat) {
        //* 參考: https://stackoverflow.com/a/41297068/5134658
        //* weixin:// 打開指定用戶方法，已只適用於少數白名單應用程式，最多就用此連結開啟程式
        window.open(`http://weixin.qq.com/r/${content.Lst_ContactValue}`);
      }
    },
    openLink(link) {
      window.open(link);
    },
    closeAllContentList() {
      this.contactList.forEach(item => {
        item.isShowContentList = false;
      });
      this.$forceUpdate();
    },
  },
  async mounted() {
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
            clearInterval(zopimInterval);
          }
        }, 500);
      } else if (this.service.Js_Type == 'ze-snippet' && typeof zE == 'undefined') {
        console.log('[CustomService]', 'import ze-snippet');
        // const jsSrc = jscode.split('src="')[1].split('"')[0]
        const jsSrc = 'https://static.zdassets.com/ekr/snippet.js?key=22acc8e3-164e-4f5f-9987-42269dc9635c';

        const scriptElement = document.createElement('script');
        scriptElement.id = 'ze-snippet';
        scriptElement.src = jsSrc;
        document.querySelector('head').append(scriptElement);

        const zeInterval = setInterval(() => {
          if (zE) {
            this.zE = zE;
            this.zE.hide();

            this.zE('webWidget:on', 'close', function() {
              this.zE.hide();
            });

            clearInterval(zeInterval);
          }
        }, 500);
      }
    }
    /*eslint-enable no-undef*/
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