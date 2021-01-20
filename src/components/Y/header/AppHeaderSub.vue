<template>
  <div class="header-sub">
    <div class="header-sub__member">
      <div class="header-sub__member__item">{{ $t('header.user.username') }}：{{ userAccount }}</div>
      <div class="header-sub__member__item">
        {{ $t('header.user.total') }}：{{ $numeral(userTotalBalance).format('0,0.00') }}
      </div>
      <div class="header-sub__member__item">{{ $t('header.user.vip') }}：{{ userPILevel }}</div>
      <div class="header-sub__member__item">
        {{ $t('header.user.roll') }}：{{ $numeral(userPIBetAmount).format('0,0.00') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeaderSub',
  computed: {
    ...mapGetters(['userTotalBalance', 'userAccount', 'userPILevel', 'userPIBetAmount']),
  },
};
</script>
