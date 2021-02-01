<!-- omit in toc -->

# cms-fend-client <!-- omit in toc -->

H3 前後端分離的前端專案，使用 vue & vue-cli 框架

- [Z 版筆記](#z-版筆記)
  - [API](#api)
- [Token & 公鑰](#token--公鑰)
- [workbox](#workbox)
  - [workbox 預緩存設定(precache)](#workbox-預緩存設定precache)
- [其他](#其他)
  - [vee-validate](#vee-validate)
    - [ValidationObserver 的 invalid 失效問題(已解決)](#validationobserver-的-invalid-失效問題已解決)
  - [IOS input[type=datetime-local] 自動驗證錯誤(已解決)](#ios-inputtypedatetime-local-自動驗證錯誤已解決)
  - [Wechat 無法開啟指定用戶](#wechat-無法開啟指定用戶)
  - [維護畫面](#維護畫面)
  - [IOS 擋開啟新視窗(已解決)](#ios-擋開啟新視窗已解決)
  - [點擊輪播無法正常換頁(已解決)](#點擊輪播無法正常換頁已解決)
  - [取得網站資訊不同步，將處理放置 watch(已解決)](#取得網站資訊不同步將處理放置-watch已解決)
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
  - [vee-validate](#vee-validate-1)

## Z 版筆記

### API

- 紀錄: 因跟 Y 版顯示的欄位架構不同，所以缺少各種欄位
- 投注紀錄-未結算投注: 缺少綁定金額欄位、report 連結 (點擊館別)

## Token & 公鑰

- 存 cookie
- 目前會遇到兩個錯誤
  - 502: ToeknError，前端不顯示錯誤訊息內容(不正常操作)
  - 615: 公鑰沒跟私鑰會回傳此錯誤，傳入參數條件錯誤(判斷必填)，正確流程不該出現這個回應，前端不顯示錯誤訊息內容(不正常操作)

兩者都可直接靠重新獲取來解決，再來就是看要，**重整頁面**或是**重新發送請求**
不過現在確定 token 與 公鑰沒有期限，所以不會因為過期而觸發這兩個錯誤，只有被踢線時會觸發，所以目前只有**重新取得 token 與 公鑰**

## workbox

- 原本使用 importScript 方式引入，現在改用配合 webpack 引入的方式使用
- 使用的套件是 workbox-webpack-plugin，引入方法可以參考: https://webpack.docschina.org/guides/progressive-web-application
- 於 vue.config.js 中引入設定，參考: https://cli.vuejs.org/guide/webpack.html
- workbox-webpack-plugin 設定的參數，參考以下網址
  - GenerateSW: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
  - InjectManifest: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.InjectManifest

### workbox 預緩存設定(precache)

- 於 vue.config.js 中設定要預緩存的範圍、最大檔案大小
  - 詳細參數可以參考上面的 workbox-webpack-plugin 設定的參數的網址
- 使用配合 webpack 方式引入，都強制要使用 precache，預設是會預緩存 dist 底下所有檔案，無法關閉，只能靠設定範圍來不使用
- 目前是設定 `exclude: [/.*/]` 來不使用預緩存功能

## 其他

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

### 取得網站資訊不同步，將處理放置 watch(已解決)

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

### vee-validate
