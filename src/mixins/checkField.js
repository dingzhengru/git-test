import { apiCheckRegisterFieldExist } from '@/api/register';

export default {
  name: 'MixinCheckField',
  methods: {
    async checkField(field, invalid) {
      //* 即時驗證欄位資料是否通過
      if (invalid) {
        return;
      }
      if (field.name == 'Add_RelatedAccount' && field.value) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result === false) {
          field.value = '';
          window.alert(this.$t('register.Add_RelatedAccount.invalid'));
        }
      } else if (field.name == 'Add_FirstName' || field.name == 'Add_LastName') {
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
  },
};
