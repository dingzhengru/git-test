<template>
  <div class="contact" :class="{ 'contact-auth': isLoggedIn }" @click.self="closeAllContentList">
    <div class="contact__content theme-content-box" @click.self="closeAllContentList">
      <ul class="contact__content__ul" @click.self="closeAllContentList">
        <li class="contact__content__ul__li" v-for="contact in contactList" :key="contact.Lst_ContactID">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link"
            :class="contact.class"
            @click.prevent="clickContactHandler(contact)"
          >
            {{ $te(`contact.${contact.name}`) ? $t(`contact.${contact.name}`) : contact.name }}
          </a>

          <transition name="fade">
            <div
              class="contact__content__ul__li__block contact__content__ul__li__block--tel"
              v-if="contact.isShowContentList && contact.DetailList.length > 0"
            >
              <a
                class="contact__content__ul__li__block__link contact__content__ul__li__block__link--tel"
                href="javascript:;"
                v-for="content in contact.DetailList"
                :key="content.Lst_ContactValueID"
                @click.prevent="openContactLink(contact, content)"
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
    ...mapGetters(['siteFullCss', 'isLoggedIn']),
  },
  data() {
    return {
      contactList: [
        {
          Lst_ContactID: 50,
          Lst_ContactType: 1,
          Lst_Enable: true,
          Lst_Sort: 1,
          DetailList: [
            {
              Lst_ContactValueID: 19,
              Lst_ContactID: 50,
              Lst_ContactValue: 'BBBB@msn.com',
            },
          ],
        },
        {
          Lst_ContactID: 51,
          Lst_ContactType: 2,
          Lst_Enable: true,
          Lst_Sort: 2,
          DetailList: [
            {
              Lst_ContactValueID: 20,
              Lst_ContactID: 51,
              Lst_ContactValue: 'Line00112233',
            },
          ],
        },
        {
          Lst_ContactID: 54,
          Lst_ContactType: 5,
          Lst_Enable: true,
          Lst_Sort: 5,
          DetailList: [],
        },
      ],
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
        /*eslint-disable no-undef*/
        if (contact.Js_Type == 'zopim') {
          //* zopim
          $zopim.livechat.window.show();
        } else if (contact.Js_Type == 'ze-snippet') {
          //* ze-snippet
          console.log('[zE]', zE('webWidget:get', 'display'), zE);
          zE('webWidget', 'show');
          zE('webWidget', 'open');
        }
        //else if (contact.Js_Type == 'livechatinc') {
        //   if (LC_API.chat_window_hidden()) {
        //     LC_API.open_chat_window();
        //   } else {
        //     LC_API.hide_chat_window();
        //   }
        // }
        /*eslint-enable no-undef*/
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
        window.open(`weixin://`, '_self');
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
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/contact.scss`);

    const result = await apiGetContactList();

    console.log('[ContactList]', result);

    if (result.Code == 200) {
      this.contactList = result.RetObj.ServiceList;
    }

    this.contactList = this.contactList.map(item => {
      item.name = this.contactMapper[item.Lst_ContactType];
      item.isShowContentList = false;
      item.class = `contact__content__ul__li__link--${item.name}`;
      return item;
    });

    /*eslint-disable no-undef*/
    // 確認是否有 service 在，在的話就執行 jscode
    const contactService = this.contactList.find(item => item.name == 'service');
    if (contactService) {
      if (contactService.Js_Type == 'zopim') {
        //* zopim
        console.log('[jscode]', contactService.Js_Code);
        window.eval(contactService.Js_Code);
        const zopimInterval = setInterval(() => {
          if ($zopim && $zopim.livechat && $zopim.livechat.window) {
            $zopim.livechat.hideAll();
            $zopim.livechat.window.onHide(() => {
              $zopim.livechat.hideAll();
            });
            clearInterval(zopimInterval);
          }
        }, 500);
      } else if (contactService.Js_Type == 'ze-snippet') {
        //* ze-snippet
        // const jsSrc = jscode.split('src="')[1].split('"')[0]
        const jsSrc = 'https://static.zdassets.com/ekr/snippet.js?key=22acc8e3-164e-4f5f-9987-42269dc9635c';

        const scriptElement = document.createElement('script');
        scriptElement.id = 'ze-snippet';
        scriptElement.src = jsSrc;
        document.querySelector('head').append(scriptElement);

        const zeInterval = setInterval(() => {
          if (zE) {
            zE.hide();

            zE('webWidget:on', 'close', function() {
              zE.hide();
            });

            clearInterval(zeInterval);
          }
        }, 500);
      }
    }
    /*eslint-enable no-undef*/
  },
};
</script>

<style lang="scss" scoped>
/*
 * fade 顯示 telephones 區塊
*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// .slide-enter-active,
// .slide-leave-active {
//   transition: all 0.5s ease;
// }

// .slide-enter,
// .slide-leave-to {
//   transform: translateY(100%);
// }

.contact {
  padding-bottom: 119px;
  &-auth {
    padding-top: 88px;
  }
  &__content {
    margin: 80px;
    &__ul {
      padding: 0;
      margin: 0;
      &__li {
        display: inline-block;
        margin: 31px 20px;
        vertical-align: top;
        position: relative;

        &__link {
          display: block;
          width: 198px;
          background-repeat: no-repeat;
          background-position: center top;
          background-size: 100px;
          padding-top: 115px;
          font-size: 2.461em;
          text-align: center;
          word-break: break-all;
        }
        &__block {
          width: 328px;
          height: 286px;
          text-align: center;
          position: absolute;
          top: 165px;
          left: -99px;
          z-index: 2;

          &__link {
            font-size: 2.461em;
            line-height: 65px;
            display: block;
          }
        }
      }
    }
  }
}

/*
 * 共用圖片
*/

.contact__content__ul__li__link {
  &--online {
    background-image: url(~@/assets/common/imgs/main/onlineServicebg.png);
  }
  &--service {
    background-image: url(~@/assets/common/imgs/main/onlineServicebg.png);
  }
  &--qq {
    background-image: url(~@/assets/common/imgs/main/qqBg.png);
  }
  &--mobile {
    background-image: url(~@/assets/common/imgs/main/mobileBg.png);
  }
  &--skype {
    background-image: url(~@/assets/common/imgs/main/skypeBg.png);
  }
  &--line {
    background-image: url(~@/assets/common/imgs/main/lineBg.png);
  }
  &--wechat {
    background-image: url(~@/assets/common/imgs/main/wechatBg.png);
  }
  &--facebook {
    background-image: url(~@/assets/common/imgs/main/FacebookBg.png);
  }
  &--email {
    background-image: url(~@/assets/common/imgs/main/mail.png);
  }

  &--mobile--jp168 {
    background-image: url(~@/assets/common/imgs/main/mobileBg--jp168.png);
  }

  &--line--jp168 {
    background-image: url(~@/assets/common/imgs/main/lineBg--jp168.png);
  }
}
</style>
