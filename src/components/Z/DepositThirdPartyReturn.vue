<template>
  <div></div>
</template>

<script>
export default {
  name: 'DepositThirdPartyReturn',
  mounted() {
    window.parent.postMessage('DepositThirdPartyReturn Message', window.location.origin);
  },
};
</script>
