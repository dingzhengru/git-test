<!-- omit in toc -->

# cms-fend-client <!-- omit in toc -->

H3 前後端分離的前端專案，使用 vue & vue-cli 框架

- [Token & 公鑰](#token--公鑰)
- [其他](#其他)
  - [子路徑傳值給父路徑](#子路徑傳值給父路徑)
  - [vee-validate](#vee-validate)
    - [ValidationObserver 的 invalid 失效問題(已解決)](#validationobserver-的-invalid-失效問題已解決)
  - [IOS input[type=datetime-local] 自動驗證錯誤(已解決)](#ios-inputtypedatetime-local-自動驗證錯誤已解決)
  - [Wechat 無法開啟指定用戶](#wechat-無法開啟指定用戶)
  - [維護畫面](#維護畫面)
  - [IOS 擋開啟新視窗(已解決)](#ios-擋開啟新視窗已解決)
  - [點擊輪播無法正常換頁(已解決)](#點擊輪播無法正常換頁已解決)
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
  - [vee-validate](#vee-validate-1)

## Token & 公鑰

- 存 cookie
- 目前會遇到兩個錯誤
  - 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
  - 615: 公鑰沒跟私鑰會回傳此錯誤，傳入參數條件錯誤(判斷必填)，正確流程不該出現這個回應，前端不顯示錯誤訊息內容(不正常操作)

兩者都可直接靠重新獲取來解決，再來就是看要，**重整頁面**或是**重新發送請求**
不過現在確定 token 與 公鑰沒有期限，所以不會因為過期而觸發這兩個錯誤，只有被踢線時會觸發，所以目前只有**重新取得 token 與 公鑰**

## 其他

### 子路徑傳值給父路徑

參考: https://stackoverflow.com/questions/42446809/child-component-to-use-parent-function-in-vue-js

父路徑，設置 `<view-router @event-name />`
子路徑，使用 `this.$parent.$emit('event-name')` 傳送

### vee-validate

#### ValidationObserver 的 invalid 失效問題(已解決)

- 將裡面的使用的 v-if 改成 v-show 即可

### IOS input[type=datetime-local] 自動驗證錯誤(已解決)

此錯誤發生在存款頁面，即使輸入正確，還是會一直顯示 enter a valid value
所以只好於 form 添加 novalidate 關掉自動驗證

### Wechat 無法開啟指定用戶

- 參考 https://stackoverflow.com/a/41297068/5134658
- 微信在 2016 年 9 月 5 日的 6.3.25 更新中，已經屏蔽了絕大部分外部發起的 URL Scheme 請求，只允許在微信內部或少量白名單應用中進行調用。
- 最多就利用 weixin:// 來開啟程式

### 維護畫面

- logo5 是該站台的 logo，但還沒有 API 可以取得，目前所有的 logo 都用拼網址的方式取得
- 雖然只有 logo5 是會根據站台而不同的圖片，但還是先所有 logo 放進各個版型

### IOS 擋開啟新視窗(已解決)

- 參考: https://stackoverflow.com/a/39387533/5134658
  IOS 預設會擋非同步後開啟的視窗，所以需於送出請求前打開

### 點擊輪播無法正常換頁(已解決)

- 解決方法是套件換版本即可: swiper@5.3.6 、vue-awesome-swiper@4.0.4

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

### vee-validate
