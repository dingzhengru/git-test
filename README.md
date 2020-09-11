<!-- omit in toc -->

# cms-fend-client <!-- omit in toc -->

H3 前後端分離的前端專案，使用 vue & vue-cli 框架

- [Token & 公鑰](#token--公鑰)
- [待處理](#待處理)
- [其他](#其他)
  - [IOS 擋開啟新視窗](#ios-擋開啟新視窗)
  - [點擊輪播無法正常換頁](#點擊輪播無法正常換頁)
  - [Agreement 頁面的規章頁籤 .active 沒有設定](#agreement-頁面的規章頁籤-active-沒有設定)
  - [登入方式](#登入方式)
  - [取得網站資訊不同步，將處理放置 watch](#取得網站資訊不同步將處理放置-watch)
  - [notification 的 nav 圖片大小不同](#notification-的-nav-圖片大小不同)
- [Library](#library)
  - [axios](#axios)
  - [numeral](#numeral)
  - [dayjs](#dayjs)
  - [jsencrypt](#jsencrypt)
  - [JS-RSA 超長加密](#js-rsa-超長加密)
  - [vue-awesome-swiper](#vue-awesome-swiper)
  - [vue-scrollto](#vue-scrollto)
  - [vue-slider-component](#vue-slider-component)
  - [vue-js-toggle-button](#vue-js-toggle-button)
  - [javascript-winwheel](#javascript-winwheel)
  - [gsap](#gsap)

## Token & 公鑰

- 存 cookie
- 目前會遇到兩個錯誤
  - 502: ToeknError，前端不顯示錯誤訊息內容(不正常操作)
  - 615: 公鑰沒跟私鑰會回傳此錯誤，傳入參數條件錯誤(判斷必填)，正確流程不該出現這個回應，前端不顯示錯誤訊息內容(不正常操作)

兩者都可直接靠重新獲取來解決，再來就是看要，**重整頁面**或是**重新發送請求**

## 待處理

- 優惠活動左上方是回上一頁(箭頭圖案)
- 首頁的遊戲為維修中時，覆蓋上一層維修圖案

## 其他

### IOS 擋開啟新視窗

- 參考: https://stackoverflow.com/a/39387533/5134658
  IOS 預設會擋非同步後開啟的視窗，所以需於送出請求前打開

### 點擊輪播無法正常換頁

- 解決方法是套件換版本即可: swiper@5.3.6 、vue-awesome-swiper@4.0.4

### Agreement 頁面的規章頁籤 .active 沒有設定

### 登入方式

- 原專案: 登入頁面 => 送出登入資料 => 規章頁面 => 同意 => 登入成功
- 新專案: 登入頁面 => 送出登入資料(包含是否同意規章) => 登入成功

### 取得網站資訊不同步，將處理放置 watch

將關於需要用到 siteInfo 的處理都放置 watch，避免還沒取得 siteInfo (預設值是 null)，就去使用 API 或 去組靜態資源 URL

```js
watch: {
  siteID: {
    immediate: true,
    handler() {},
  },
},
```

### notification 的 nav 圖片大小不同

StarBets 的圖片大小跟其他不同，造成位置不同

## Library

詳細可於 package.json 查看

### axios

### numeral

### dayjs

### jsencrypt

<!-- ### encryptlong -->

### JS-RSA 超長加密

- 參考 https://www.jianshu.com/p/54cb90e6e183
- 參考 https://github.com/wangqinglongDo/github_demo/blob/master/libs/jsencrypt.min.js
- 使用第一個網址裡的 encryptLong2，與第二個網址的 hex2b64

### vue-awesome-swiper

### vue-scrollto

### vue-slider-component

### vue-js-toggle-button

### javascript-winwheel

- 轉盤，https://github.com/zarocknz/javascript-winwheel

### gsap

- 因轉盤需要用到，https://github.com/zarocknz/javascript-winwheel
