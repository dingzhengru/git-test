<template>
  <div class="contact" :class="{ 'contact-auth': userIsLoggedIn }">
    <template v-for="item in contactList">
      <div
        class="contact__item"
        :key="item.Lst_ContactID"
        @click="clickServiceHandler"
        v-if="item === service && !$isObjEmpty(service)"
      >
        <i class="contact__item__icon--contact icon-service"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.serviceTitle') }}</div>
          <div class="contact__item__text__content">{{ $t('contact.serviceContent') }}</div>
        </div>
      </div>

      <div
        class="contact__item"
        :key="item.Lst_ContactID"
        @click="isShowDetailMobile = !isShowDetailMobile"
        v-if="item === mobile && !$isObjEmpty(mobile)"
      >
        <i class="contact__item__icon--contact icon-mobile"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.mobile') }}</div>
          <div class="contact__item__text__content"></div>
        </div>
        <i class="contact__item__icon--dropdown" :class="{ open: isShowDetailMobile }"></i>
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

      <div
        class="contact__item"
        :key="item.Lst_ContactID"
        @click="isShowDetailSkype = !isShowDetailSkype"
        v-if="item === skype && !$isObjEmpty(skype)"
      >
        <i class="contact__item__icon--contact icon-skype"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.skype') }}</div>
          <div class="contact__item__text__content"></div>
        </div>
        <i class="contact__item__icon--dropdown" :class="{ open: isShowDetailSkype }"></i>
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

      <div
        class="contact__item contact__item--no-wrap"
        :key="item.Lst_ContactID"
        v-if="item === line && !$isObjEmpty(line)"
      >
        <i class="contact__item__icon--contact icon-line"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.lineTitle') }}</div>
          <div class="contact__item__text__content">{{ $t('contact.lineContent', { site: siteName }) }}</div>
        </div>
        <button class="contact__item__btn" @click="openLink('http://line.me/ti/p/PylqIPpa3B')">
          {{ $t('contact.join') }}
        </button>
      </div>

      <div
        class="contact__item"
        :key="item.Lst_ContactID"
        @click="isShowDetailLine = !isShowDetailLine"
        v-if="item === line && !$isObjEmpty(line)"
      >
        <i class="contact__item__icon--contact icon-line"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.line') }}</div>
          <div class="contact__item__text__content"></div>
        </div>
        <i class="contact__item__icon--dropdown" :class="{ open: isShowDetailLine }"></i>
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

      <div
        class="contact__item contact__item--no-wrap"
        :key="item.Lst_ContactID"
        v-if="item === wechat && !$isObjEmpty(wechat)"
      >
        <i class="contact__item__icon--contact icon-wechat"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.wechatTitle') }}</div>
          <div class="contact__item__text__content">{{ $t('contact.wechatContent', { site: siteName }) }}</div>
        </div>
        <button class="contact__item__btn" @click="openLink('https://weixin.qq.com/r/W4G4oOPEY74crafD99RJ')">
          {{ $t('contact.join') }}
        </button>
      </div>

      <div
        class="contact__item"
        :key="item.Lst_ContactID"
        @click="isShowDetailWechat = !isShowDetailWechat"
        v-if="item === wechat && !$isObjEmpty(wechat)"
      >
        <i class="contact__item__icon--contact icon-wechat"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.wechat') }}</div>
          <div class="contact__item__text__content"></div>
        </div>
        <i class="contact__item__icon--dropdown" :class="{ open: isShowDetailWechat }"></i>
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
    </template>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinContact from '@/mixins/contact';
import { mapGetters } from 'vuex';

export default {
  name: 'Contact',
  mixins: [mixinStyleLoader, mixinContact],
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn']),
  },
  async mounted() {
    // import(`@/styles/${this.siteFullCss}/contact.scss`);
    this.importStyleByFilename('contact');
  },
};
</script>
