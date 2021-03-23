export function getQueryValueByKey(key) {
  return new URLSearchParams(window.location.search).get(key) || '';
}

export function checkQueryByKey(key) {
  return new URLSearchParams(window.location.search).has(key);
}

//* 檢查是否這些 key 是否都存在，一個沒有就 false
export function checkQueryByKeyMultiple(...keyList) {
  return !keyList.some(item => {
    return !new URLSearchParams(window.location.search).has(item);
  });
}
