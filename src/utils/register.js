import dayjs from 'dayjs';

// export const registerFieldList = []

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
