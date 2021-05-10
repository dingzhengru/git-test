<template>
  <div class="ui-panel-tab__tabs">
    <div
      class="ui-panel-tab__tabs__item"
      :class="{ active: item.name === $route.name || item.otherActiveRoute.includes($route.name) }"
      v-for="item in tabList"
      :key="item.name"
      @click="$router.push({ name: item.name })"
    >
      {{ $t(item.text) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelTabsNews',
  data() {
    return {
      tabList: [
        {
          name: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
        {
          name: 'News',
          text: 'news.title',
          otherActiveRoute: [],
        },
        // {
        //   name: 'About',
        //   text: 'about.title',
        //   otherActiveRoute: [],
        // },
      ],
    };
  },
};
</script>

<style></style>
