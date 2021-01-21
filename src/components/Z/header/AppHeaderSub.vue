<template>
  <div class="header-sub">
    <div class="header-sub__not-logged" v-if="!userIsLoggedIn">
      <button class="header-sub__not-logged__btn--login ui-btn">{{ $t('ui.button.login') }}</button>
      <button class="header-sub__not-logged__btn--register ui-btn">{{ $t('ui.button.register') }}</button>
    </div>
    <div class="header-sub__member" @click="isShowDropdown = !isShowDropdown" v-else>
      <i class="header-sub__member__icon--status" :class="'class-2'"></i>
      <div class="header-sub__member__item header-sub__member__item--account">
        {{ userAccount }}
      </div>
      <div class="header-sub__member__item header-sub__member__item--wallet">
        {{ $t('ui.label.wallet') }}：{{ $numeral(userGamePointWallet.Point).format('0,0.00') }}
      </div>
      <i class="header-sub__member__icon--dropdown"></i>
    </div>
    <transition name="slide-dropdown">
      <div class="header-sub__dropdown" v-show="isShowDropdown">
        <button class="ui-btn ui-btn--long">{{ $t('transaction.transfer.button.refresh') }}</button>
        <button class="ui-btn ui-btn--long">{{ $t('transaction.transfer.button.allToMyWallet') }}</button>

        <div class="header-sub__dropdown__info">
          <div class="header-sub__dropdown__info__item">
            <div class="header-sub__dropdown__info__item__label">
              {{ $t('header.user.total') }}
            </div>
            <div class="header-sub__dropdown__info__item__content">
              {{ $numeral(userTotalBalance).format('0,0.00') }}
            </div>
          </div>
          <div class="header-sub__dropdown__info__item">
            <div class="header-sub__dropdown__info__item__label">
              {{ $t('header.user.total') }}
            </div>
            <div class="header-sub__dropdown__info__item__content">
              {{ $numeral(userTotalBalance).format('0,0.00') }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeaderSub',
  computed: {
    ...mapGetters(['userIsLoggedIn', 'userAccount', 'userGamePointWallet', 'userTotalBalance']),
  },
  data() {
    return {
      isShowDropdown: false,
    };
  },
};
</script>
