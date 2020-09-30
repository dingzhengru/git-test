<template>
  <div class="contact" :class="{ 'contact-auth': isLoggedIn }">
    <div class="contact__content theme-content-box">
      <ul class="contact__content__ul">
        <li
          class="contact__content__ul__li"
          v-for="contact in contactList"
          :key="contact.Lst_ContactID"
        >
          <a
            href="javascript:;"
            class="contact__content__ul__li__link"
            :class="contact.class"
            @click.prevent="clickContactHandler(contact)"
          >
            {{ $t(`contact.${contact.name}`) }}
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

    <transition name="slide">
      <ContactServiceDialog v-if="isShowServiceDialog" @close="isShowServiceDialog = false" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getContactList } from '@/api/contact';

export default {
  name: 'Contact',
  components: {
    ContactServiceDialog: () => import('@/components/contact/ContactServiceDialog'),
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
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
      isShowServiceDialog: false,
    };
  },
  methods: {
    clickContactHandler(contact) {
      if (contact.name == 'service') {
        this.isShowServiceDialog = true;
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
        window.open(`http://line.me/ti/p/${content.Lst_ContactValue}`, '_self');
      } else if (contact.name == 'mobile') {
        window.open(`tel:${content.Lst_ContactValue}`, '_self');
      } else if (contact.name == 'email') {
        window.open(`mailto:${content.Lst_ContactValue}`, '_self');
      } else if (contact.name == 'wechat') {
        window.open(`weixin://dl/chat?${content.Lst_ContactValue}`);
      }
    },
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/contact.scss`);

        const result = await getContactList();

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
      },
    },
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  // opacity: 0;
  transform: translateY(100%);
}

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
}
</style>

<style scoped>
/* .contact {
  padding-bottom: 119px;
}

.contact-auth {
  padding-top: 88px;
}

.contact__content {
  margin: 80px;
}

.contact__content__ul {
  padding: 0;
  margin: 0;
}

.contact__content__ul__li {
  display: inline-block;
  margin: 31px 20px;
  vertical-align: top;
  position: relative;
}

.contact__content__ul__li__link {
  display: block;
  width: 198px;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 115px;
  font-size: 2.461em;
  text-align: center;
  word-break: break-all;
}

.contact__content__ul__li__block--qq,
.contact__content__ul__li__block--skype,
.contact__content__ul__li__block--tel {
  width: 328px;
  height: 286px;
  text-align: center;
  position: absolute;
  top: 165px;
  left: -99px;
  z-index: 2;
}
.contact__content__ul__li__link--qq2,
.contact__content__ul__li__link--skype2 {
  font-size: 3.23em;
  line-height: 95px;
}
.contact__content__ul__li__block__link {
  font-size: 2.461em;
  line-height: 65px;
  display: block;
} */
</style>
