<!-- omit in toc -->

# cms-fend-client <!-- omit in toc -->

H3 前後端分離的前端專案，使用 vue & vue-cli 框架

- [API 詢問](#api-詢問)
- [畫面](#畫面)
- [其他](#其他)
  - [點擊輪播無法正常換頁](#點擊輪播無法正常換頁)
  - [Agreement 頁面的規章頁籤 .active 沒有設定](#agreement-頁面的規章頁籤-active-沒有設定)
  - [登入方式](#登入方式)
  - [取得網站資訊不同步，將處理放置 watch](#取得網站資訊不同步將處理放置-watch)
  - [optgroup 的前面空格，無法實現](#optgroup-的前面空格無法實現)
  - [notification 的 nav 圖片大小不同](#notification-的-nav-圖片大小不同)
- [Library](#library)
  - [axios](#axios)
  - [jsencrypt](#jsencrypt)
  - [encryptlong](#encryptlong)
  - [numeral](#numeral)
  - [vue-awesome-swiper](#vue-awesome-swiper)
  - [vue-scrollto](#vue-scrollto)
  - [vue-slider-component](#vue-slider-component)
  - [vue-js-toggle-button](#vue-js-toggle-button)

## API 詢問

- register
  - field list
  - bank list

## 畫面
- 還未能看見
  - 取款的詳細頁面(需請QA操作)


## 其他

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

### optgroup 的前面空格，無法實現

於 transaction/transfer 中

### notification 的 nav 圖片大小不同

StarBets 的圖片大小跟其他不同，造成位置不同

## Library

詳細可於 package.json 查看

### axios

### jsencrypt

### encryptlong

### numeral

### vue-awesome-swiper

### vue-scrollto

### vue-slider-component

### vue-js-toggle-button