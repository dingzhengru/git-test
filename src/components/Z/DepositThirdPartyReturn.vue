<template>
  <div></div>
</template>

<script>
export default {
  name: 'DepositThirdPartyReturn',
  beforeCreate() {
    window.parent.postMessage('DepositThirdPartyReturn Message', window.location.origin);
  },
};
</script>
