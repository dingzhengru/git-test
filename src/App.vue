<template>
  <div id="app" class="lay-container" :class="lang">
    <TypeYAppHeader></TypeYAppHeader>

    <div class="reg-main">
      <div class="lay-screen">
        <router-view />
      </div>
    </div>

    <TypeYAppFooter></TypeYAppFooter>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TypeYAppHeader: () => import('@/components/Y/AppHeader'),
    TypeYAppFooter: () => import('@/components/Y/AppFooter'),
  },
  computed: {
    ...mapGetters(['type', 'lang']),
  },
  mounted() {
    // * 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', '/manifest01.json');

    // * 根據版型引入 css
    import(`@/styles/${this.type}/layout.scss`);
  },
};
</script>

<style lang="scss"></style>
