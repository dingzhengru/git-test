<template>
  <AppModal @close="closeModal">
    <div class="ui-modal contact modal-contact">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__content contact__container">
        <template v-for="contactItem in contactList">
          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="clickServiceHandler"
            v-if="isShowService(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">Online service</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgService" />
              {{ $t('contact.serviceTitle') }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.GroupList[0].DetailList[0])"
            v-if="isShowService(contactItem) === false"
          >
            <button class="ui-modal__item__btn contact__item__btn">
              {{ contactTitleMapper[contactItem.Lst_ContactType] }}
            </button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="getImgByContact(contactItem)" />
              {{ contactItem.GroupList[0].DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <!-- <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowMobile(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">Call phone</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgMobile" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowMail(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">Email</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgMail" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowSkype(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">SKYPE</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgSkype" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowLine(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">LINE</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgLine" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowWechat(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">WECHAT</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgWechat" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowFacebook(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">Facebook</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgFacebook" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div>

          <div
            class="ui-modal__item contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowTelegram(contactItem)"
          >
            <button class="ui-modal__item__btn contact__item__btn">Telegram</button>
            <span class="ui-modal__item__content contact__item__content">
              <img :src="imgTelegram" />
              {{ contactItem.DetailList[0].Lst_ContactValue }}
            </span>
          </div> -->
        </template>
      </div>
    </div>
  </AppModal>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinContact from '@/mixins/contact';
import { mapGetters } from 'vuex';

export default {
  name: 'ModalContact',
  mixins: [mixinStyleLoader, mixinContact],
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn']),

    getImgByContact: app => contact => {
      if (contact === app.skype) {
        return app.imgSkype;
      } else if (contact === app.line) {
        return app.imgLine;
      } else if (contact === app.mobile) {
        return app.imgMobile;
      } else if (contact === app.mail) {
        return app.imgMail;
      } else if (contact === app.wechat) {
        return app.imgWechat;
      } else if (contact === app.service) {
        return app.imgService;
      } else if (contact === app.facebook) {
        return app.imgFacebook;
      } else if (contact === app.telegram) {
        return app.imgTelegram;
      }
    },

    imgService() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/service.png`);
      } catch {
        return '';
      }
    },

    imgMobile() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/mobile.png`);
      } catch {
        return '';
      }
    },

    imgMail() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/mail.png`);
      } catch {
        return '';
      }
    },
    imgSkype() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/skype.png`);
      } catch {
        return '';
      }
    },
    imgLine() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/line.png`);
      } catch {
        return '';
      }
    },
    imgWechat() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/wechat.png`);
      } catch {
        return '';
      }
    },
    imgFacebook() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/facebook.png`);
      } catch {
        return '';
      }
    },
    imgTelegram() {
      try {
        return require(`@/assets/${this.siteFullCss}/contact/telegram.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      contactTitleMapper: {
        1: 'SKYPE',
        2: 'Line',
        3: 'Call phone',
        4: 'Email',
        5: 'WECHAT',
        6: 'Online service',
        7: 'Facebook',
        8: 'Telegram',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
  mounted() {
    this.importStyleByFilename('contact');
  },
};
</script>
