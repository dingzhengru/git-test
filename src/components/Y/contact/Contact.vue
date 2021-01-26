<template>
  <div class="contact" :class="{ 'contact-auth': userIsLoggedIn }" @click.self="closeAllContentList">
    <div class="contact__content theme-content-box" @click.self="closeAllContentList">
      <ul class="contact__content__ul" @click.self="closeAllContentList">
        <li class="contact__content__ul__li" v-for="item in contactList" :key="item.Lst_ContactID">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link"
            :class="item.class"
            @click.prevent="clickContactHandler(item)"
          >
            {{ $te(`contact.${item.name}`) ? $t(`contact.${item.name}`) : item.name }}
          </a>

          <transition name="fade">
            <div
              class="contact__detail contact__content__ul__li__block contact__content__ul__li__block--tel"
              v-if="item.isShowContentList && item.DetailList.length > 0"
            >
              <a
                class="contact__detail__link contact__content__ul__li__block__link contact__content__ul__li__block__link--tel"
                href="javascript:;"
                v-for="content in item.DetailList"
                :key="content.Lst_ContactValueID"
                @click.prevent="openContactLink(item, content)"
              >
                {{ content.Lst_ContactValue }}
              </a>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetContactList } from '@/api/contact';

export default {
  name: 'Contact',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userIsLoggedIn']),
    service() {
      return this.contactList.find(item => item.Lst_ContactType == 6);
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
      contactMapper: {
        1: 'skype',
        2: 'line',
        3: 'mobile',
        4: 'email',
        5: 'wechat',
        6: 'service',
      },
      isShowMobileTelephones: false,
    };
  },
  methods: {
    clickContactHandler(contact) {
      if (contact.name == 'service') {
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
      } else {
        this.contactList.forEach(item => {
          if (item.Lst_ContactID != contact.Lst_ContactID) {
            item.isShowContentList = false;
          }
        });
        contact.isShowContentList = !contact.isShowContentList;
        this.$forceUpdate();
      }
    },
    openContactLink(contact, content) {
      if (contact.name == 'skype') {
        window.open(`skype:${content.Lst_ContactValue}?call`, '_self');
      } else if (contact.name == 'line') {
        window.open(`https://line.me/ti/p/${content.Lst_ContactValue}`);
      } else if (contact.name == 'mobile') {
        window.open(`tel:${content.Lst_ContactValue}`, '_self');
      } else if (contact.name == 'email') {
        window.open(`mailto:${content.Lst_ContactValue}`, '_self');
      } else if (contact.name == 'wechat') {
        //* 參考: https://stackoverflow.com/a/41297068/5134658
        //* weixin:// 打開指定用戶方法，已只適用於少數白名單應用程式，最多就用此連結開啟程式
        window.open(`http://weixin.qq.com/r/${content.Lst_ContactValue}`);
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
    import(`@/styles/${this.siteFullCss}/contact.scss`);

    const result = await apiGetContactList();

    if (result.Code == 200) {
      this.contactList = result.RetObj.ServiceList;
    }

    this.contactList = this.contactList
      .filter(item => {
        if (item.Lst_ContactType == 6) {
          return item.Lst_Enable == true;
        } else {
          return item.Lst_Enable == true && item.DetailList.length > 0;
        }
      })
      .map(item => {
        item.name = this.contactMapper[item.Lst_ContactType];
        item.isShowContentList = false;
        item.class = `contact__content__ul__li__link--${item.name}`;
        return item;
      });

    /*eslint-disable no-undef*/
    // 確認是否有 service 在，在的話就執行 jscode
    if (this.service) {
      if (this.service.Js_Type == 'zopim') {
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
      } else if (this.service.Js_Type == 'ze-snippet') {
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
</script>
