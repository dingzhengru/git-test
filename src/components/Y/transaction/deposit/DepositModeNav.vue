<template>
  <div class="deposit-mode-nav">
    <button
      class="ui-btn deposit-mode-nav__base"
      :class="{ active: $route.name == 'TransactionDepositBase' }"
      @click="$router.push({ name: 'TransactionDepositBase' })"
    >
      {{ $t('transaction.deposit.nav.base') }}
    </button>
    <button
      class="ui-btn deposit-mode-nav__third-party"
      :class="{ active: $route.name == 'TransactionDepositThirdParty' }"
      @click="$router.push({ name: 'TransactionDepositThirdParty' })"
    >
      {{ $t('transaction.deposit.nav.thirdParty') }}
    </button>
  </div>
</template>

<script>
export default {};
</script>
