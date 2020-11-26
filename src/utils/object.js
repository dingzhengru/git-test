//* 用字串來實現取得物件的值(EX: transaction.nav.withdrawal => 取得相對應位置的值)
export function getObjectValueByDotString(obj, dotString) {
  return dotString.split('.').reduce((item, key) => {
    return item[key];
  }, obj);
}
