<template>
  <div class="user-profile lay-are-pageContent">
    <ul class="ui-ul-tabs ul-tabs-account">
      <li class="ui-li-tabs ui-li-tabs-account ui-li-tabsActive">
        <a href="/Y/AlreadyLogin/Profile/?Tag=ChangeAdvance" class="ui-lnk-tabs">Personal Info</a>
      </li>
      <li class="ui-li-tabs ui-li-tabs-password">
        <a href="/Y/AlreadyLogin/Profile/?Tag=ChangePwd" class="ui-lnk-tabs">Password</a>
      </li>
    </ul>

    <!-- 未開通的 -->
    <UserProfileList :list="list" v-if="!isAccessed"></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess :list="list" v-else-if="isAccessed"></UserProfileListAccess>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/Y/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/Y/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'isAccessed', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      list: [],
      noAccessList: [
        {
          title: 'Account',
          content: 'ding01',
        },
        {
          title: 'Specific Currency',
          content: 'THB',
        },
        {
          title: 'Registration time',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
      ],
      accessList: [
        {
          title: 'Account',
          content: 'ding01',
        },
        {
          title: 'Specific Currency',
          content: 'THB',
        },
        {
          title: 'Registration time',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
        {
          title: 'Your real name',
          content: 'first last',
        },
        {
          title: 'E-mail',
          content: 'asdf@gmail.com',
        },
        {
          title: 'Birthday',
          content: '2020/07/14',
        },
        {
          title: 'Name of Bank',
          content: '123',
        },
        {
          title: 'Bank Account',
          content: '1111111',
        },
        {
          title: 'Name of Branch',
          content: '分行00000',
        },
        {
          title: 'Account Name of Bank',
          content: 'first last',
        },
      ],
    };
  },
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/user/profile.scss`);

    // this.list = this.accessList;
    this.list = this.noAccessList;
  },
};
</script>

<style scoped>
.user-profile {
  padding-top: 88px;
  padding-bottom: 20px;
}
</style>
