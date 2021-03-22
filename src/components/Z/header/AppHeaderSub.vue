<template>
  <div class="header-sub" :class="{ 'header-sub-auth': userIsLoggedIn }">
    <div class="header-sub__not-logged" v-show="!userIsLoggedIn && this.$route.name == 'Home'">
      <button class="header-sub__not-logged__btn--login ui-btn" @click="$router.push({ name: 'Login' })">
        {{ $t('ui.button.login') }}
      </button>
      <button class="header-sub__not-logged__btn--register ui-btn" @click="$router.push({ name: 'Register' })">
        {{ $t('ui.button.register') }}
      </button>
    </div>
    <div class="header-sub__member" @click="isShowDropdown = !isShowDropdown" v-show="userIsLoggedIn">
      <!-- <i class="header-sub__member__icon--status" :class="'class-2'"></i> -->
      <div class="header-sub__member__item header-sub__member__item--account">
        {{ userAccount }}
      </div>
      <div class="header-sub__member__item header-sub__member__item--wallet">
        {{ $t('ui.label.wallet') }}：{{ $numeral(userGamePointWallet.Point).format('0,0.00') }}
      </div>
      <i class="header-sub__member__icon--dropdown" :class="{ open: isShowDropdown }"></i>
    </div>
    <transition name="slide-dropdown">
      <div class="header-sub__dropdown" v-show="isShowDropdown">
        <button
          class="ui-btn ui-btn--block header-sub__dropdown__btn--refresh"
          :disabled="refreshTimeCount !== refreshTimeInterval"
          @click="refreshWallet"
        >
          {{
            refreshTimeCount == refreshTimeInterval
              ? $t('transaction.transfer.button.refresh')
              : `(${refreshTimeCount})s`
          }}
        </button>
        <button class="ui-btn ui-btn--block header-sub__dropdown__btn--transfer-all" @click="transferAllPointToMain">
          {{ $t('transaction.transfer.button.allToMyWallet') }}
        </button>

        <div class="ui-point-list">
          <div class="ui-point-list__item">
            <div class="ui-point-list__item__label">
              {{ $t('header.user.total') }}
            </div>
            <div class="ui-point-list__item__content">
              {{ $numeral(userTotalBalance).format('0,0.00') }}
            </div>
          </div>
          <div class="ui-point-list__item" v-for="item in userGamePointList" :key="item.Product_id">
            <div class="ui-point-list__item__label">
              {{ item.Product_Name }}
            </div>
            <div class="ui-point-list__item__content">
              {{ $numeral(item.Point).format('0,0.00') }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinAccountWallet from '@/mixins/accountWallet';
export default {
  name: 'AppHeaderSub',
  mixins: [mixinAccountWallet],
  computed: {
    ...mapGetters(['userIsLoggedIn', 'userAccount', 'userGamePointWallet', 'userTotalBalance', 'userGamePointList']),
  },
  data() {
    return {
      isShowDropdown: false,
    };
  },
};
</script>
