<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="service-term">
      <div class="service-term__close" @click="$emit('close')"></div>
      <div class="service-term__title">{{ $t('register.modalServiceTerm.title') }}</div>
      <div class="service-term__container">
        <div class="service-term__sub-title">
          <div class="service-term__header__content" v-html="$t('register.modalServiceTerm.subTitle')"></div>
        </div>
        <div class="service-term__body">
          <div class="service-term__body__item" v-for="item in termList" :key="item.title">
            <div class="service-term__body__item__title" @click="openTerm(item)">
              {{ $t(`register.modalServiceTerm.${item.name}.title`) }}
              <i class="service-term__body__item__title__icon" :class="{ open: item.isOpen }"></i>
            </div>
            <transition name="slide-dropdown-height">
              <div class="service-term__body__item__content" v-show="item.isOpen">
                <p v-if="$te(`register.modalServiceTerm.${item.name}.subTitle`)">
                  {{ $t(`register.modalServiceTerm.${item.name}.subTitle`) }}
                </p>
                <ul>
                  <li
                    v-for="index in item.count"
                    :key="index"
                    v-html="$t(`register.modalServiceTerm.${item.name}.${index}`, { siteOrigin, site: siteName })"
                  ></li>
                </ul>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="service-term__footer">
        <button class="ui-btn ui-btn--block" @click="$emit('close')">{{ $t('ui.button.close') }}</button>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ModalServiceTerm',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['siteName']),
    siteOrigin() {
      return window.location.origin;
    },
  },
  data() {
    return {
      termList: [
        {
          name: 'definition',
          count: 4,
          isOpen: false,
        },
        {
          name: 'agreement',
          count: 3,
          isOpen: false,
        },
        {
          name: 'amendment',
          count: 2,
          isOpen: false,
        },
        {
          name: 'bet',
          count: 3,
          isOpen: false,
        },
        {
          name: 'condition',
          count: 17,
          isOpen: false,
        },
        {
          name: 'openBettingAccount',
          count: 9,
          isOpen: false,
        },
        {
          name: 'betAcceptance',
          count: 21,
          isOpen: false,
        },
        {
          name: 'bettingSoftwareRight',
          count: 6,
          isOpen: false,
        },
        {
          name: 'transactionSettlement',
          count: 6,
          isOpen: false,
        },
        {
          name: 'jackpot',
          count: 5,
          isOpen: false,
        },
        {
          name: 'promotion',
          count: 4,
          isOpen: false,
        },
        {
          name: 'compensation',
          count: 1,
          isOpen: false,
        },
        {
          name: 'disclaimer',
          count: 8,
          isOpen: false,
        },
        {
          name: 'closeService',
          count: 14,
          isOpen: false,
        },
        {
          name: 'externalWebsite',
          count: 4,
          isOpen: false,
        },
        {
          name: 'linkOrFrame',
          count: 1,
          isOpen: false,
        },
        {
          name: 'addOrSuspendBetting',
          count: 1,
          isOpen: false,
        },
        {
          name: 'violation',
          count: 1,
          isOpen: false,
        },
        {
          name: 'priority',
          count: 2,
          isOpen: false,
        },
        {
          name: 'forceMajeure',
          count: 1,
          isOpen: false,
        },
        {
          name: 'abstention',
          count: 1,
          isOpen: false,
        },
        {
          name: 'severability',
          count: 1,
          isOpen: false,
        },
        {
          name: 'governingLawAndJurisdiction',
          count: 2,
          isOpen: false,
        },
      ],
    };
  },
  methods: {
    openTerm(item) {
      item.isOpen = !item.isOpen;
    },
  },
};
</script>
