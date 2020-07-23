<template>
  <div class="user">
    <ul class="ui-ul-tabs ul-tabs-account">
      <li
        class="ui-li-tabs"
        :class="[route.class, { 'ui-li-tabsActive': route.link == $route.name }]"
        v-for="route in userRouteList"
        :key="route.link"
      >
        <router-link :to="{ name: route.link }" class="ui-lnk-tabs">{{ route.name }}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data() {
    return {
      userRouteList: [
        {
          name: 'Personal Info',
          link: 'UserProfile',
          class: 'ui-li-tabs-account',
        },
        {
          name: 'Password',
          link: 'UserChangePassword',
          class: 'ui-li-tabs-password',
        },
      ],
    };
  },
};
</script>

<style scoped>
.user {
  padding: 88px 20px 160px 20px;
}
</style>
