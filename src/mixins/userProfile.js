import { mapGetters } from 'vuex';
import { apiGetRegisterAdvanceNew, apiGetBankInfoList, apiBankDefaultChange } from '@/api/user';
import { registerFieldList } from '@/utils/register';
import mixinCheckField from '@/mixins/checkField';

export default {
  name: 'MixinUserProfile',
  mixins: [mixinCheckField],
  computed: {
    ...mapGetters(['lang', 'userCreatedDatetime', 'userBindBank', 'siteIsLandscape']),
    getDatetime: () => datetime => {
      return `${datetime.split('.')[0].replace('T', ' ')} (GMT+8)`;
    },
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
    userBankById: app => id => {
      return app.userBankList.find(item => item.Lst_BankId === id) || {};
    },
    fieldListNoBank() {
      return this.fieldList.filter(item => item.name.includes('Bank') === false);
    },
    bankListEnabled() {
      return this.bankList.filter(item => item.Visibled);
    },
  },
  data() {
    return {
      fieldList: registerFieldList,
      bankList: [],
      fieldListOld: [],

      userBankList: [],

      fieldAccount: {},
      fieldNickname: {},
      fieldRealName: {},
      fieldMobile: {},
      fieldEmail: {},
      fieldBirthday: {},
      fieldSkype: {},
      fieldQQ: {},
      fieldLine: {},
      fieldBankId1: {},
      fieldBankAccount1: {},
      fieldBankBranchName1: {},
      fieldBankId2: {},
      fieldBankAccount2: {},
      fieldBankBranchName2: {},
      fieldBankId3: {},
      fieldBankAccount3: {},
      fieldBankBranchName3: {},

      bankDefault: 0,
      isAutoCashOpen: false,
    };
  },
  methods: {
    async getRegisterAdvanceNew() {
      const result = await apiGetRegisterAdvanceNew();
      this.bankList = result.RetObj.Add_BankList;

      if (this.$env === 'development') {
        this.isAutoCashOpen = result.RetObj.AutoCashOpen;
      }

      for (const registerField of result.RetObj.Register) {
        const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          field.isShow = registerField.Lst_Phase > 0;
          field.value = field.isShow ? registerField.Lst_Value : '';
          field.isOnly = registerField.Lst_isOnly;
          field.isRequired = registerField.Lst_isRequired;
          field.rules['register-required'] = registerField.Lst_isRequired;
          field.isModifiable =
            (registerField.Lst_Phase === 2 && registerField.Lst_Value === '') ||
            (registerField.Lst_Phase === 1 && registerField.Lst_isModifiable);
        }
      }
      this.fieldListOld = this.$deepClone(this.fieldList);
      this.setFields();
    },
    async submitUserProfile() {
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      const result = await this.$store.dispatch('user/changeUserProfile', requestData);
      if (result.Code == 200) {
        this.getRegisterAdvanceNew();
        window.alert(this.$t('alert.changeProfileSuccess'));
      } else if (result.Code === 500) {
        window.alert(result.ErrMsg);
      }
    },
    async submitChangeBankDefault(bankNumber) {
      const requestData = { Add_ab_bind_account: bankNumber };
      const result = await apiBankDefaultChange(requestData);

      console.log(requestData);

      if (result.Code === 200) {
        this.bankDefault = bankNumber;
      }
    },
    resetForm() {
      this.fieldList = this.$deepClone(this.fieldListOld);
    },
    setFields() {
      this.fieldList.forEach(item => {
        switch (item.name) {
          case 'Add_Account': {
            return (this.fieldAccount = item);
          }
          case 'Add_NickName': {
            return (this.fieldNickname = item);
          }
          case 'Add_RealName': {
            return (this.fieldRealName = item);
          }
          case 'Add_Mobile': {
            return (this.fieldMobile = item);
          }
          case 'Add_Email': {
            return (this.fieldEmail = item);
          }
          case 'Add_Birthday': {
            return (this.fieldBirthday = item);
          }
          case 'Add_Skype': {
            return (this.fieldSkype = item);
          }
          case 'Add_QQ': {
            return (this.fieldQQ = item);
          }
          case 'Add_Line': {
            return (this.fieldLine = item);
          }
          case 'Add_BankId1': {
            return (this.fieldBankId1 = item);
          }
          case 'Add_BankAccount1': {
            return (this.fieldBankAccount1 = item);
          }
          case 'Add_BankBranchName1': {
            return (this.fieldBankBranchName1 = item);
          }
          case 'Add_BankId2': {
            return (this.fieldBankId2 = item);
          }
          case 'Add_BankAccount2': {
            return (this.fieldBankAccount2 = item);
          }
          case 'Add_BankBranchName2': {
            return (this.fieldBankBranchName2 = item);
          }
          case 'Add_BankId3': {
            return (this.fieldBankId3 = item);
          }
          case 'Add_BankAccount3': {
            return (this.fieldBankAccount3 = item);
          }
          case 'Add_BankBranchName3': {
            return (this.fieldBankBranchName3 = item);
          }
        }
      });
    },
    getBankById(id) {
      if (!id) {
        return {};
      }

      return this.bankList.find(item => item.Value === id) || {};
    },

    async getUserBankList() {
      const result = await apiGetBankInfoList();
      if (result.Code === 200) {
        this.userBankList = result.RetObj;
      }
      return result;
    },
  },
  mounted() {
    this.getRegisterAdvanceNew();

    this.bankDefault = this.userBindBank;
  },
  watch: {
    fieldList() {
      this.setFields();
    },
    userBindBank() {
      this.bankDefault = this.userBindBank;
    },
  },
};
