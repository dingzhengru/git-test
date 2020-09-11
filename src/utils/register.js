import dayjs from 'dayjs';

export const registerFieldList = [
  {
    name: 'Add_RelatedAccount',
    class: 'register__form__field--recommend',
    type: 'text',
    error: '',
    isRequired: false,
    maxlength: 30,
    regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Account',
    class: 'register__form__field--account',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 3,
    maxlength: 15,
    regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$', //* 英文字母開頭、英數字、長度: 3~15
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Password',
    class: 'register__form__field--password',
    type: 'password',
    error: '',
    isRequired: false,
    minlength: 6,
    maxlength: 30,
    regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_PasswordCheck',
    class: 'register__form__field--password',
    type: 'password',
    error: '',
    isRequired: false,
    minlength: 6,
    maxlength: 30,
    regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Mobile',
    class: 'register__form__field--callphone',
    type: 'tel',
    error: '',
    isRequired: false,
    minlength: 5,
    maxlength: 20,
    regex: '^[0-9]*$', //* 英數字、長度: 5~20
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Email',
    class: 'register__form__field--name',
    type: 'email',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 50,
    regex: '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', //* email regex，需有 @ 與後面要有 .
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Line',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    maxlength: 50,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Skype',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    maxlength: 12,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_QQ',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    maxlength: 20,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_FirstName',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_LastName',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_RealName',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_NickName',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    maxlength: 30,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Birthday',
    class: 'register__form__field--name',
    type: 'date',
    error: '',
    isRequired: false,
    min: '1900-01-01',
    max: dayjs()
      .subtract(18, 'year')
      .format('YYYY-MM-DD'),
    regex: '^[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankId1',
    class: 'register__form__field--name',
    type: 'select',
    error: '',
    isRequired: false,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankBranchName1',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankAccount1',
    class: 'register__form__field--account',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 30,
    regex: '^[0-9]+[0-9]*$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankId2',
    class: 'register__form__field--name',
    type: 'select',
    error: '',
    isRequired: false,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankBranchName2',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankAccount2',
    class: 'register__form__field--account',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 30,
    regex: '^[0-9]+[0-9]*$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankId3',
    class: 'register__form__field--name',
    type: 'select',
    error: '',
    isRequired: false,
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankBranchName3',
    class: 'register__form__field--name',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 70,
    regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_BankAccount3',
    class: 'register__form__field--account',
    type: 'text',
    error: '',
    isRequired: false,
    minlength: 1,
    maxlength: 30,
    regex: '^[0-9]+[0-9]*$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Withdrawals_Password',
    class: 'register__form__field--password',
    type: 'password',
    error: '',
    isRequired: false,
    minlength: 6,
    maxlength: 30,
    regex: '^[a-zA-Z0-9]*$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
  {
    name: 'Add_Withdrawals_CheckPassword',
    class: 'register__form__field--password',
    type: 'password',
    error: '',
    isRequired: false,
    minlength: 6,
    maxlength: 30,
    regex: '^[a-zA-Z0-9]*$',
    value: '',
    isShow: false,
    isModifiable: false,
  },
];

//* 驗證註冊欄位，回傳錯誤訊息，回傳空值代表沒問題
export function validateField(field, fieldList) {
  if (!field.isShow) {
    return '';
  } else if (!field.isRequired && !field.value) {
    //* 非必填 && 空值
    return '';
  } else if (field.isRequired && !field.value) {
    //* 必填 && 空值
    return `register.${field.name}.error.required`;
  } else if (!!field.minlength && field.value.length < field.minlength) {
    //* 是否有最小長度 && 低於最小長度
    return `register.${field.name}.error.length`;
  } else if (!!field.maxlength && field.value.length > field.maxlength) {
    //* 是否有最大長度 && 高於最大長度
    return `register.${field.name}.error.length`;
  } else if (field.regex && !RegExp(field.regex).test(field.value)) {
    //* 是否有正規表示式 && 不符合正規表示式
    return `register.${field.name}.error.regex`;
  } else if (field.name == 'Add_Birthday' && dayjs(field.value).isAfter(field.max)) {
    //* 是否為生日欄位 && 是否超過指定最大日期(18歲限制)
    return `register.${field.name}.error.invalid`;
  } else if (field.name == 'Add_PasswordCheck') {
    //* 密碼確認
    const password = fieldList.find(item => item.name == 'Add_Password');
    if (field.value != password.value) {
      return `register.${field.name}.error.invalid`;
    }
  } else if (field.name == 'Add_Withdrawals_CheckPassword') {
    //* 取款密碼確認
    const passwordWithdrawal = fieldList.find(item => item.name == 'Add_Withdrawals_Password');
    if (field.value != passwordWithdrawal.value) {
      return `register.${field.name}.error.invalid`;
    }
  }
  return '';
}
