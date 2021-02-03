<template>
  <div class="contact" :class="{ 'contact-auth': userIsLoggedIn }">
    <div class="contact__item" @click="clickServiceHandler">
      <i class="contact__item__icon--contact icon-service"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.serviceTitle') }}</div>
        <div class="contact__item__text__content">{{ $t('contact.serviceContent') }}</div>
      </div>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-mobile"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.mobile') }}</div>
        <div class="contact__item__text__content"></div>
      </div>
      <i
        class="contact__item__icon--dropdown"
        :class="{ open: isShowDetailMobile }"
        @click="isShowDetailMobile = !isShowDetailMobile"
      ></i>
      <transition name="slide-dropdown">
        <div class="contact__item__detail" v-show="isShowDetailMobile">
          <div
            class="contact__item__detail__item"
            v-for="item in mobile.DetailList"
            :key="item.Lst_ContactValueID"
            @click="openContactLink(mobile, item)"
          >
            {{ item.Lst_ContactValue }}
          </div>
        </div>
      </transition>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-skype"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.skype') }}</div>
        <div class="contact__item__text__content"></div>
      </div>
      <i
        class="contact__item__icon--dropdown"
        :class="{ open: isShowDetailSkype }"
        @click="isShowDetailSkype = !isShowDetailSkype"
      ></i>
      <transition name="slide-dropdown">
        <div class="contact__item__detail" v-show="isShowDetailSkype">
          <div
            class="contact__item__detail__item"
            v-for="item in skype.DetailList"
            :key="item.Lst_ContactValueID"
            @click="openContactLink(skype, item)"
          >
            {{ item.Lst_ContactValue }}
          </div>
        </div>
      </transition>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-line"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.lineTitle') }}</div>
        <div class="contact__item__text__content">{{ $t('contact.lineContent', { site: siteName }) }}</div>
      </div>
      <button class="contact__item__btn" @click="openLink('http://line.me/ti/p/PylqIPpa3B')">
        {{ $t('contact.join') }}
      </button>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-line"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.line') }}</div>
        <div class="contact__item__text__content"></div>
      </div>
      <i
        class="contact__item__icon--dropdown"
        :class="{ open: isShowDetailLine }"
        @click="isShowDetailLine = !isShowDetailLine"
      ></i>
      <transition name="slide-dropdown">
        <div class="contact__item__detail-btn" v-show="isShowDetailLine">
          <div
            class="contact__item__detail-btn__item"
            v-for="item in line.DetailList"
            :key="item.Lst_ContactValueID"
            @click="openContactLink(line, item)"
          >
            {{ item.Lst_ContactValue }}
          </div>
        </div>
      </transition>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-wechat"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.wechatTitle') }}</div>
        <div class="contact__item__text__content">{{ $t('contact.wechatContent', { site: siteName }) }}</div>
      </div>
      <button class="contact__item__btn" @click="openLink('https://weixin.qq.com/r/W4G4oOPEY74crafD99RJ')">
        {{ $t('contact.join') }}
      </button>
    </div>

    <div class="contact__item">
      <i class="contact__item__icon--contact icon-wechat"></i>
      <div class="contact__item__text">
        <div class="contact__item__text__title">{{ $t('contact.wechat') }}</div>
        <div class="contact__item__text__content"></div>
      </div>
      <i
        class="contact__item__icon--dropdown"
        :class="{ open: isShowDetailWechat }"
        @click="isShowDetailWechat = !isShowDetailWechat"
      ></i>
      <transition name="slide-dropdown">
        <div class="contact__item__detail-btn" v-show="isShowDetailWechat">
          <button
            class="contact__item__detail-btn__item"
            v-for="item in wechat.DetailList"
            :key="item.Lst_ContactValueID"
            @click="openContactLink(wechat, item)"
          >
            {{ item.Lst_ContactValue }}
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import mixinContact from '@/mixins/contact';
import { mapGetters } from 'vuex';

export default {
  name: 'Contact',
  mixins: [mixinContact],
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn']),
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
  async mounted() {
    import(`@/styles/${this.siteFullCss}/contact.scss`);
  },
};
</script>
