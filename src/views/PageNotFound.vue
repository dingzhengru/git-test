<template>
  <div></div>
</template>

<script>
import { apiSendProxyCode } from '@/api/site';
export default {
  name: 'PageNotFound',
  async beforeCreate() {
    const proxyCode = location.pathname.split('/')[1];
    const requestData = { Code: proxyCode };
    const result = await apiSendProxyCode(requestData);
    if (result.Code === 200 && result.RetObj === true) {
      this.$router.replace({ name: 'Register' });
    } else {
      this.$router.replace({ name: 'Home' });
    }
  },
};
</script>

<style></style>
