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
          content: 'ding01',
        },
        {
          name: 'currency',
          content: 'THB',
        },
        {
          name: 'datetime',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
      ],
      accessList: [
        {
          name: 'username',
          content: 'ding01',
        },
        {
          name: 'currency',
          content: 'THB',
        },
        {
          name: 'datetime',
          content: '2020/07/10 15:53:06 (GMT+8)',
        },
        {
          name: 'fullName',
          content: 'first last',
        },
        {
          name: 'email',
          content: 'asdf@gmail.com',
        },
        {
          name: 'birthday',
          content: '2020/07/14',
        },
        {
          name: 'bank',
          content: '123',
        },
        {
          name: 'bankAccount',
          content: '1111111',
        },
        {
          name: 'bankBrach',
          content: '分行00000',
        },
        {
          name: 'bankAccountName',
          content: 'first last',
        },
      ],
    };
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
      async handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/user/profile.scss`);

        //* 取得使用者資訊
        const result = await this.$store.dispatch('user/getInfo');

        console.log('[UserInfo]', result);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    // isAccessed: {
    //   immediate: true,
    //   handler() {
    //     if (this.isAccessed) {
    //       this.list = this.accessList;
    //     } else {
    //       this.list = this.notAccessList;
    //     }
    //   },
    // },
  },
};
</script>

<style scoped></style>
