<template>
  <div class="user lay-are-pageContent">
    <ul class="ui-ul-tabs ul-tabs-account">
      <li class="ui-li-tabs ui-li-tabs-account" :class="{ 'ui-li-tabsActive': $route.name == 'UserProfile' }">
        <router-link :to="{ name: 'UserProfile' }" class="ui-lnk-tabs">Personal Info</router-link>
      </li>
      <li class="ui-li-tabs ui-li-tabs-password" :class="{ 'ui-li-tabsActive': $route.name == 'UserChangePassword' }">
        <router-link :to="{ name: 'UserChangePassword' }" class="ui-lnk-tabs">Password</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'UserHome',
};
</script>

<style scoped>
.user {
  padding-top: 88px;
  padding-bottom: 20px;
}
</style>
