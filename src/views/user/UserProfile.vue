<template>
  <div class="user-profile">
    <!-- 未開通的 -->
    <UserProfileList
      :profile="{ username, currency, createdDatetime: createdDatetime.replace('T', ' ') }"
      :registerList="registerList"
      :bankList="bankList"
      v-if="isAccessed == false"
      @instantAccess="submitInstantAccess"
    ></UserProfileList>

    <!-- 開通後的 -->
    <UserProfileListAccess
      :profile="{
        username,
        currency,
        createdDatetime: createdDatetime.replace('T', ' '),
        fullName,
        email,
        birthday: birthday.split('T')[0],
      }"
      :list="accessList"
      v-else-if="isAccessed == true"
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
    ...mapGetters([
      'isAccessed',
      'siteID',
      'siteFullCss',
      'username',
      'currency',
      'createdDatetime',
      'fullName',
      'email',
      'birthday',
    ]),
  },
  data() {
    return {
      profile: {},
      registerList: [],
      bankList: [],
      accessList: [
        // {
        //   name: 'fullName',
        //   content: 'first last',
        // },
        // {
        //   name: 'email',
        //   content: 'asdf@gmail.com',
        // },
        // {
        //   name: 'birthday',
        //   content: '2020/07/14',
        // },
        // {
        //   name: 'bankName',
        //   content: '123',
        // },
        // {
        //   name: 'bankAccount',
        //   content: '1111111',
        // },
        // {
        //   name: 'bankBrach',
        //   content: '分行00000',
        // },
        // {
        //   name: 'bankAccountName',
        //   content: 'first last',
        // },
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
      },
    },
    isAccessed: {
      immediate: true,
      async handler() {
        if (this.isAccessed == null) {
          return;
        }

        if (this.isAccessed) {
          // this.profileList = this.accessList;
          // this.list = this.accessList.map(item => {
          //   if (result.RetObj[item.name]) {
          //     item.value = result.RetObj[item.name];
          //   }
          // });
        } else {
          const result = await registerAdvanceNew();
          console.log('[RegisterAdvanceNew]', result);

          this.bankList = result.RetObj.Add_BankList;
          this.registerList = result.RetObj.Register;
        }
      },
    },
  },
};
</script>

<style scoped></style>
