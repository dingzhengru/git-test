<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiSendProxyCode } from '@/api/site';
export default {
  name: 'ProxyCode',
  computed: {
    ...mapGetters(['userIsLoggedIn']),
  },
  async mounted() {
    if (this.userIsLoggedIn) {
      return this.$router.replace({ name: 'Home' });
    }
    // const proxyCode = location.pathname.split('/')[1];
    const proxyCode = this.$route.params.proxyCode;
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
