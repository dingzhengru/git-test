<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList :list="list" v-if="!isAccessed" @instantAccess="instantAccess"></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :list="list"
      v-else-if="isAccessed"
      @changeWithdrawPassword="changeWithdrawPassword"
    ></UserProfileListAccess>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters(['isAccessed', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [],
      notAccessList: [
        {
          name: 'username',
          title: 'user.profile.notAccessed.username',
          content: 'ding01',
        },
        {
          name: 'currency',
          title: 'user.profile.notAccessed.currency',
          content: 'THB',
        },
        {
          name: 'datetime',
          title: 'user.profile.notAccessed.datetime',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
      ],
      accessList: [
        {
          name: 'username',
          title: 'user.profile.accessed.username',
          content: 'ding01',
        },
        {
          name: 'currency',
          title: 'user.profile.accessed.currency',
          content: 'THB',
        },
        {
          name: 'datetime',
          title: 'user.profile.accessed.datetime',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
        {
          name: 'fullName',
          title: 'user.profile.accessed.fullName',
          content: 'first last',
        },
        {
          name: 'email',
          title: 'user.profile.accessed.email',
          content: 'asdf@gmail.com',
        },
        {
          name: 'birthday',
          title: 'user.profile.accessed.birthday',
          content: '2020/07/14',
        },
        {
          name: 'bank',
          title: 'user.profile.accessed.bank',
          content: '123',
        },
        {
          name: 'bankAccount',
          title: 'user.profile.accessed.bankAccount',
          content: '1111111',
        },
        {
          name: 'bankBrach',
          title: 'user.profile.accessed.bankBrach',
          content: '分行00000',
        },
        {
          name: 'bankAccountName',
          title: 'user.profile.accessed.bankAccountName',
          content: 'first last',
        },
      ],
    };
  },
  mounted() {
    if (this.isAccessed) {
      this.list = this.accessList;
    } else {
      this.list = this.notAccessList;
    }
  },
  methods: {
    instantAccess() {
      console.log('instantAccess');
    },
    changeWithdrawPassword() {
      console.log('changeWithdrawPassword');
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/user/profile.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped></style>
