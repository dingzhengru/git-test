<template>
  <AppModal @close="closeModal">
    <div class="contact modal-contact">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="contact__container">
        <template v-for="contactItem in contactList">
          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="clickServiceHandler"
            v-if="isShowService(contactItem)"
          >
            <i class="contact__item__icon--contact icon-service"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.serviceTitle') }}</div>
              <div class="contact__item__text__content">{{ $t('contact.serviceContent') }}</div>
            </div>
          </div>

          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="isShowDetailMobile = !isShowDetailMobile"
            v-if="isShowMobile(contactItem)"
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
            :key="contactItem.Lst_ContactID"
            @click="isShowDetailSkype = !isShowDetailSkype"
            v-if="isShowSkype(contactItem)"
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
            :key="'contactItemButton' + String(contactItem.Lst_ContactID)"
            v-if="isShowLine(contactItem)"
          >
            <i class="contact__item__icon--contact icon-line"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.lineTitle') }}</div>
              <div class="contact__item__text__content">
                {{ $t('contact.lineContent', { site: line.DetailList[0].Lst_ContactValue }) }}
              </div>
            </div>
            <button class="contact__item__btn" @click="openContactLink(line, line.DetailList[0])">
              {{ $t('contact.join') }}
            </button>
          </div>

          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="isShowDetailLine = !isShowDetailLine"
            v-if="isShowLineDropdown(contactItem)"
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
                  v-for="item in line.DetailList.slice(1)"
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
            :key="'contactItemButton' + String(contactItem.Lst_ContactID)"
            v-if="isShowWechat(contactItem)"
          >
            <i class="contact__item__icon--contact icon-wechat"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.wechatTitle') }}</div>
              <div class="contact__item__text__content">
                {{ $t('contact.wechatContent', { site: wechat.DetailList[0].Lst_ContactValue }) }}
              </div>
            </div>
            <button class="contact__item__btn" @click="openContactLink(wechat, wechat.DetailList[0])">
              {{ $t('contact.join') }}
            </button>
          </div>

          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="isShowDetailWechat = !isShowDetailWechat"
            v-if="isShowWechatDropdown(contactItem)"
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
                  v-for="item in wechat.DetailList.slice(1)"
                  :key="item.Lst_ContactValueID"
                  @click="openContactLink(wechat, item)"
                >
                  {{ item.Lst_ContactValue }}
                </button>
              </div>
            </transition>
          </div>

          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="openContactLink(contactItem, contactItem.DetailList[0])"
            v-if="isShowFacebook(contactItem)"
          >
            <i class="contact__item__icon--contact icon-facebook"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">Facebook</div>
              <div class="contact__item__text__content"></div>
            </div>
          </div>

          <div
            class="contact__item"
            :key="contactItem.Lst_ContactID"
            @click="isShowDetailTelegram = !isShowDetailTelegram"
            v-if="isShowTelegram(contactItem)"
          >
            <i class="contact__item__icon--contact icon-telegram"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">Telegram</div>
              <div class="contact__item__text__content"></div>
            </div>
            <i class="contact__item__icon--dropdown" :class="{ open: isShowDetailTelegram }"></i>
            <transition name="slide-dropdown">
              <div class="contact__item__detail" v-show="isShowDetailTelegram">
                <div
                  class="contact__item__detail__item"
                  v-for="item in contactItem.DetailList"
                  :key="item.Lst_ContactValueID"
                  @click="openContactLink(contactItem, item)"
                >
                  {{ item.Lst_ContactValue }}
                </div>
              </div>
            </transition>
          </div>
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
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeModalContact');
      this.$emit('close');
    },
  },
  mounted() {
    this.importStyleByFilename('contact');
  },
};
</script>
