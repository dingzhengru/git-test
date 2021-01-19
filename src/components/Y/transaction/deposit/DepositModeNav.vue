<template>
  <div class="deposit-mode-nav">
    <button
      class="deposit-mode-nav__base ui-btn"
      :class="{ active: mode == 'base' }"
      @click="$emit('change-mode', 'base')"
    >
      {{ $t('transaction.deposit.nav.base') }}
    </button>
    <button
      class="deposit-mode-nav__third-party ui-btn"
      :class="{ active: mode == 'thirdParty' }"
      @click="$emit('change-mode', 'thirdParty')"
    >
      {{ $t('transaction.deposit.nav.thirdParty') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: () => 'base',
    },
  },
};
</script>
