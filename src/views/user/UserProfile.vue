<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{ username, currency, createdDatetime: createdDatetime.replace('T', ' ') }"
      :registerList="registerList"
      :bankList="bankList"
      v-if="!isAccessed"
      @instantAccess="submitInstantAccess"
    ></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :profile="{ username, currency, createdDatetime: createdDatetime.replace('T', ' ') }"
      :list="accessList"
      v-else-if="isAccessed"
      @changeWithdrawPassword="changeWithdrawPassword"
    ></UserProfileListAccess>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { registerAdvanceNew } from '@/api/user';
export default {
  name: 'Profile',
  components: {
    UserProfileList: () => import('../../components/user/UserProfileList'),
    UserProfileListAccess: () => import('../../components/user/UserProfileListAccess'),
  },
  computed: {
    ...mapGetters(['isAccessed', 'siteID', 'siteFullCss', 'username', 'currency', 'createdDatetime']),
  },
  data() {
    return {
      profile: {},
      registerList: [],
      bankList: [],
      accessList: [
        {
          name: 'Add_RealName',
          content: 'first last',
        },
        {
          name: 'Add_Email',
          content: 'asdf@gmail.com',
        },
        {
          name: 'Add_Birthday',
          content: '2020/07/14',
        },
        {
          name: 'Add_BankId1',
          content: '123',
        },
        {
          name: 'Add_BankBranchName1',
          content: '1111111',
        },
        {
          name: 'Add_BankAccount1',
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
    submitInstantAccess(data) {
      console.log('[InstantAccess]', data);
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
        // const result = await this.$store.dispatch('user/getInfo');

        const result = await registerAdvanceNew();

        console.log('[RegisterAdvanceNew]', result);

        if (this.isAccessed) {
          // this.profileList = this.accessList;
          // this.list = this.accessList.map(item => {
          //   if (result.RetObj[item.name]) {
          //     item.value = result.RetObj[item.name];
          //   }
          // });
        } else {
          // this.list = this.notAccessList.map(item => {
          //   if (result.RetObj[item.name]) {
          //     item.value = result.RetObj[item.name];
          //   }
          // });

          this.bankList = result.RetObj.Add_BankList;
          this.registerList = result.RetObj.Register;
        }
      },
    },
  },
};
</script>

<style scoped></style>
