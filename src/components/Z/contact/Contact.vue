<template>
  <div class="contact" :class="{ 'contact-auth': userIsLoggedIn }">
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

      <template v-if="isShowService(contactItem) === false">
        <div class="contact__wrapper" v-for="groupItem in contactItem.GroupList" :key="groupItem.Lst_ContactGroupID">
          <div class="contact__item contact__item--no-wrap" v-if="groupItem.DetailList.length === 1">
            <i class="contact__item__icon--contact" :class="`icon-${contactNameMap[contactItem.Lst_ContactType]}`"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">
                {{ $t(`contact.${contactNameMap[contactItem.Lst_ContactType]}`) }}
              </div>
              <div class="contact__item__text__content">
                {{ groupItem.Lst_ContactGroupName }}
              </div>
            </div>
            <button class="contact__item__btn" @click="openContactLink(contactItem, groupItem.DetailList[0])">
              {{ $t('contact.join') }}
            </button>
          </div>

          <div
            class="contact__item"
            @click="groupItem.isShowDetail = !groupItem.isShowDetail"
            v-else-if="groupItem.DetailList.length > 1"
          >
            <i class="contact__item__icon--contact" :class="`icon-${contactNameMap[contactItem.Lst_ContactType]}`"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">
                {{ $t(`contact.${contactNameMap[contactItem.Lst_ContactType]}`) }}
              </div>
              <div class="contact__item__text__content">{{ groupItem.Lst_ContactGroupName }}</div>
            </div>
            <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
            <transition name="slide-dropdown">
              <div class="contact__item__detail-btn" v-show="groupItem.isShowDetail">
                <div
                  class="contact__item__detail-btn__item"
                  v-for="item in groupItem.DetailList"
                  :key="item.Lst_ContactValueID"
                  @click="openContactLink(contactItem, item)"
                >
                  {{ item.Lst_ContactValue }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template>

      <!-- <template v-if="isShowMobile(contactItem)">
        <div
          class="contact__item"
          v-for="groupItem in contactItem.GroupList"
          :key="groupItem.Lst_ContactGroupID"
          @click="groupItem.isShowDetail = !groupItem.isShowDetail"
        >
          <i class="contact__item__icon--contact icon-mobile"></i>
          <div class="contact__item__text">
            <div class="contact__item__text__title">{{ $t('contact.mobile') }}</div>
            <div class="contact__item__text__content"></div>
          </div>
          <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
          <transition name="slide-dropdown">
            <div class="contact__item__detail" v-show="groupItem.isShowDetail">
              <div
                class="contact__item__detail__item"
                v-for="item in groupItem.DetailList"
                :key="item.Lst_ContactValueID"
                @click="openContactLink(contactItem, item)"
              >
                {{ item.Lst_ContactValue }}
              </div>
            </div>
          </transition>
        </div>
      </template> -->

      <!-- <template v-if="isShowSkype(contactItem)">
        <div
          class="contact__item"
          v-for="groupItem in contactItem.GroupList"
          :key="groupItem.Lst_ContactGroupID"
          @click="groupItem.isShowDetail = !groupItem.isShowDetail"
        >
          <i class="contact__item__icon--contact icon-skype"></i>
          <div class="contact__item__text">
            <div class="contact__item__text__title">{{ $t('contact.skype') }}</div>
            <div class="contact__item__text__content"></div>
          </div>
          <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
          <transition name="slide-dropdown">
            <div class="contact__item__detail" v-show="groupItem.isShowDetail">
              <div
                class="contact__item__detail__item"
                v-for="item in groupItem.DetailList"
                :key="item.Lst_ContactValueID"
                @click="openContactLink(contactItem, item)"
              >
                {{ item.Lst_ContactValue }}
              </div>
            </div>
          </transition>
        </div>
      </template> -->

      <!-- <template v-if="isShowLine(contactItem)">
        <div class="contact__wrapper" v-for="groupItem in contactItem.GroupList" :key="groupItem.Lst_ContactGroupID">
          <div class="contact__item contact__item--no-wrap" v-if="groupItem.DetailList.length <= 1">
            <i class="contact__item__icon--contact icon-line"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.lineTitle') }}</div>
              <div class="contact__item__text__content">
                {{ groupItem.Lst_ContactGroupName }}
              </div>
            </div>
            <button class="contact__item__btn" @click="openContactLink(contactItem, groupItem.DetailList[0])">
              {{ $t('contact.join') }}
            </button>
          </div>

          <div
            class="contact__item"
            @click="groupItem.isShowDetail = !groupItem.isShowDetail"
            v-else-if="groupItem.DetailList.length > 1"
          >
            <i class="contact__item__icon--contact icon-line"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.line') }}</div>
              <div class="contact__item__text__content">{{ groupItem.Lst_ContactGroupName }}</div>
            </div>
            <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
            <transition name="slide-dropdown">
              <div class="contact__item__detail-btn" v-show="groupItem.isShowDetail">
                <div
                  class="contact__item__detail-btn__item"
                  v-for="item in groupItem.DetailList"
                  :key="item.Lst_ContactValueID"
                  @click="openContactLink(contactItem, item)"
                >
                  {{ item.Lst_ContactValue }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template> -->

      <!-- <div
        class="contact__item contact__item--no-wrap"
        :key="'contactItemButton' + String(contactItem.Lst_ContactID)"
        v-if="isShowLine(contactItem)"
      >
        <i class="contact__item__icon--contact icon-line"></i>
        <div class="contact__item__text">
          <div class="contact__item__text__title">{{ $t('contact.lineTitle') }}</div>
          <div class="contact__item__text__content">
            {{ $t('contact.lineContent', { site: contactItem.GroupList[0].DetailList[0].Lst_ContactValue }) }}
          </div>
        </div>
        <button
          class="contact__item__btn"
          @click="openContactLink(contactItem, contactItem.GroupList[0].DetailList[0])"
        >
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
              v-for="item in contactItem.GroupList[0].DetailList.slice(1)"
              :key="item.Lst_ContactValueID"
              @click="openContactLink(contactItem, item)"
            >
              {{ item.Lst_ContactValue }}
            </div>
          </div>
        </transition>
      </div> -->

      <!-- <template v-if="isShowWechat(contactItem)">
        <div class="contact__wrapper" v-for="groupItem in contactItem.GroupList" :key="groupItem.Lst_ContactGroupID">
          <div class="contact__item contact__item--no-wrap" v-if="groupItem.DetailList.length <= 1">
            <i class="contact__item__icon--contact icon-line"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.wechatTitle') }}</div>
              <div class="contact__item__text__content">
                {{ groupItem.Lst_ContactGroupName }}
              </div>
            </div>
            <button class="contact__item__btn" @click="openContactLink(contactItem, groupItem.DetailList[0])">
              {{ $t('contact.join') }}
            </button>
          </div>

          <div
            class="contact__item"
            @click="groupItem.isShowDetail = !groupItem.isShowDetail"
            v-else-if="groupItem.DetailList.length > 1"
          >
            <i class="contact__item__icon--contact icon-wechat"></i>
            <div class="contact__item__text">
              <div class="contact__item__text__title">{{ $t('contact.wechat') }}</div>
              <div class="contact__item__text__content">{{ groupItem.Lst_ContactGroupName }}</div>
            </div>
            <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
            <transition name="slide-dropdown">
              <div class="contact__item__detail-btn" v-show="groupItem.isShowDetail">
                <div
                  class="contact__item__detail-btn__item"
                  v-for="item in groupItem.DetailList"
                  :key="item.Lst_ContactValueID"
                  @click="openContactLink(contactItem, item)"
                >
                  {{ item.Lst_ContactValue }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template> -->

      <!-- <template v-if="isShowFacebook(contactItem)">
        <div
          class="contact__item"
          v-for="groupItem in contactItem.GroupList"
          :key="groupItem.Lst_ContactGroupID"
          @click="openContactLink(contactItem, groupItem.DetailList[0])"
        >
          <i class="contact__item__icon--contact icon-facebook"></i>
          <div class="contact__item__text">
            <div class="contact__item__text__title">Facebook</div>
            <div class="contact__item__text__content"></div>
          </div>
        </div>
      </template> -->

      <!-- <template v-if="isShowTelegram(contactItem)">
        <div
          class="contact__item"
          v-for="groupItem in contactItem.GroupList"
          :key="groupItem.Lst_ContactGroupID"
          @click="groupItem.isShowDetail = !groupItem.isShowDetail"
        >
          <i class="contact__item__icon--contact icon-telegram"></i>
          <div class="contact__item__text">
            <div class="contact__item__text__title">Telegram</div>
            <div class="contact__item__text__content"></div>
          </div>
          <i class="contact__item__icon--dropdown" :class="{ open: groupItem.isShowDetail }"></i>
          <transition name="slide-dropdown">
            <div class="contact__item__detail" v-show="groupItem.isShowDetail">
              <div
                class="contact__item__detail__item"
                v-for="item in groupItem.DetailList"
                :key="item.Lst_ContactValueID"
                @click="openContactLink(contactItem, item)"
              >
                {{ item.Lst_ContactValue }}
              </div>
            </div>
          </transition>
        </div>
      </template> -->
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
