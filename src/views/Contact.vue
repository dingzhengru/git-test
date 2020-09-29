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

          <!-- <transition name="fade">
            <div
              class="contact__content__ul__li__block contact__content__ul__li__block--tel"
              v-if="isShowMobileTelephones"
            >
              <a
                class="contact__content__ul__li__block__link contact__content__ul__li__block__link--tel"
                :href="`tel:${tel}`"
                v-for="tel in contact.mobile.telephones"
                :key="tel"
              >
                {{ tel }}
              </a>
            </div>
          </transition> -->
        </li>

        <!-- <li class="contact__content__ul__li" v-if="contact.service.isActive">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link contact__content__ul__li__link--service"
          >
            {{ $t("contact.service") }}
          </a>
        </li>
        <li class="contact__content__ul__li" v-if="contact.facebook.isActive">
          <a
            :href="contact.facebook.link"
            target="_blank"
            class="contact__content__ul__li__link contact__content__ul__li__link--facebook"
            >Facebook</a
          >
        </li>
        <li class="contact__content__ul__li" v-if="contact.mobile.isActive">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link contact__content__ul__li__link--mobile"
            @click="isShowMobileTelephones = !isShowMobileTelephones"
            @blur="isShowMobileTelephones = false"
            >Mobile</a
          >
          <transition name="fade">
            <div
              class="contact__content__ul__li__block contact__content__ul__li__block--tel"
              v-if="isShowMobileTelephones"
            >
              <a
                class="contact__content__ul__li__block__link contact__content__ul__li__block__link--tel"
                :href="`tel:${tel}`"
                v-for="tel in contact.mobile.telephones"
                :key="tel"
              >
                {{ tel }}
              </a>
            </div>
          </transition>
        </li>
        <li class="contact__content__ul__li" v-if="contact.skype.isActive">
          <a
            :href="contact.skype.link"
            class="contact__content__ul__li__link contact__content__ul__li__link--skype"
            >Skype</a
          >
        </li>
        <li class="contact__content__ul__li" v-if="contact.line.isActive">
          <a
            :href="contact.line.link"
            class="contact__content__ul__li__link contact__content__ul__li__link--line"
            >{{ contact.line.name }}</a
          >
        </li>
        <li class="contact__content__ul__li" v-if="contact.wechat.isActive">
          <a
            :href="contact.wechat.link"
            class="contact__content__ul__li__link contact__content__ul__li__link--wechat"
            >{{ contact.wechat.name }}</a
          >
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getContactList } from "@/api/contact";

export default {
  name: 'Contact',
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
        5: 'whoscall',
        6: 'service',
      },
      contact: {
        service: {
          isActive: true,
        },
        facebook: {
          isActive: true,
          link: 'https://www.facebook.com/pg/lionking88.net/posts/?ref=page_internal',
        },
        mobile: {
          isActive: true,
          telephones: ['085-459-1000', '085-459-2000', '085-459-3000'],
        },
        skype: {
          isActive: true,
          link: 'skype:info.lionking88?call',
        },
        line: {
          isActive: true,
          link: 'http://line.me/ti/p/tIOnYUNLTa',
          name: 'lionking_88',
        },
        wechat: {
          isActive: true,
          link: 'http://weixin.qq.com/r/7Vbt4gzEXDIjhx2BnwPJ',
          name: 'lionking_88',
        },
      },
      isShowMobileTelephones: false,
    };
  },
  methods: {
    clickContactHandler(contact) {
      if (contact.name == 'skype') {
        window.open(`skype:${contact.DetailList[0].Lst_ContactValue}?call`, '_self');
        console.log(`skype:${contact.DetailList[0].Lst_ContactValue}?call`);
      } else if (contact.name == 'line') {
        window.open(`http://line.me/ti/p/${contact.DetailList[0].Lst_ContactValue}`, '_self');
      } else if (contact.name == 'mobile') {
        this.isShowContentList = !this.isShowContentList;
      } else if (contact.name == 'email') {
        this.isShowContentList = !this.isShowContentList;
      } else if (contact.name == 'whoscall') {
        this.isShowContentList = !this.isShowContentList;
      } else if (contact.name == 'service') {
        this.isShowContentList = !this.isShowContentList;
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

        this.contactList.map(item => {
          item.name = this.contactMapper[item.Lst_ContactType];
          if (item.name == 'skype') {
            item.class = 'contact__content__ul__li__link--skype';
          } else if (item.name == 'line') {
            item.class = 'contact__content__ul__li__link--line';
          } else if (item.name == 'mobile') {
            item.class = 'contact__content__ul__li__link--mobile';
          } else if (item.name == 'email') {
            item.class = 'contact__content__ul__li__link--service';
          } else if (item.name == 'whoscall') {
            item.class = 'contact__content__ul__li__link--service';
          } else if (item.name == 'service') {
            item.class = 'contact__content__ul__li__link--Whoscall';
          }

          item.isShowContentList = false;
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
