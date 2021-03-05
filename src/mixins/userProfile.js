import { mapGetters } from 'vuex';
import { apiGetRegisterAdvanceNew } from '@/api/user';
import { apiCheckRegisterFieldExist } from '@/api/register';
import { registerFieldList } from '@/utils/register';
export default {
  name: 'MixinUserProfile',
  computed: {
    ...mapGetters(['lang']),
    getDatetime: () => datetime => {
      return `${datetime.split('.')[0].replace('T', ' ')} (GMT+8)`;
    },
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
  data() {
    return {
      fieldList: registerFieldList,
      bankList: [],
      fieldListOld: [],
    };
  },
  methods: {
    async getRegisterAdvanceNew() {
      const result = await apiGetRegisterAdvanceNew();
      this.bankList = result.RetObj.Add_BankList;

      for (const registerField of result.RetObj.Register) {
        const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          field.value = registerField.Lst_Value;
          field.isShow = registerField.Lst_Phase > 0;
          field.isOnly = registerField.Lst_isOnly;
          field.isRequired = registerField.Lst_isRequired;
          field.rules['register-required'] = registerField.Lst_isRequired;
          field.isModifiable =
            registerField.Lst_Phase === 2 || (registerField.Lst_Phase === 1 && registerField.Lst_isModifiable);
        }
      }
      this.fieldListOld = JSON.parse(JSON.stringify(this.fieldList));
    },
    async submitUserProfile() {
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      console.log(requestData);
    },
    async changeField(field, invalid) {
      //* 即時驗證欄位資料是否通過
      if (invalid) {
        return;
      }
      if (field.name == 'Add_FirstName' || field.name == 'Add_LastName') {
        const firstNameField = this.fieldList.find(item => item.name == 'Add_FirstName');
        const lastNameField = this.fieldList.find(item => item.name == 'Add_LastName');
        //* 姓跟名都有填的時候才檢查
        if (!(firstNameField.value && lastNameField.value)) {
          return;
        }
        const requestData = { field: 'Add_RealName', strValue: this.fullName };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result === false) {
          field.value = '';
          window.alert(this.$t('register.Add_RealName.invalid'));
        }
      } else if (field.isOnly && field.value) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result === false) {
          field.value = '';
          window.alert(this.$t(`register.${field.name}.invalid`));
        }
      }
    },
    resetForm() {
      this.fieldList = JSON.parse(JSON.stringify(this.fieldListOld));
    },
  },
  mounted() {
    this.getRegisterAdvanceNew();
  },
  watch: {},
};
