<!-- omit in toc -->


# cms-fend-client <!-- omit in toc -->

H3 前後端分離的前端專案，使用 vue & vue-cli 框架

- [其他](#其他)
  - [點擊輪播無法正常換頁](#點擊輪播無法正常換頁)
  - [Agreement 頁面的規章頁籤 .active 沒有設定](#agreement-頁面的規章頁籤-active-沒有設定)
  - [登入方式](#登入方式)

## 其他

### 點擊輪播無法正常換頁

- 解決方法是套件換版本即可: swiper@5.3.6 、vue-awesome-swiper@4.0.4

### Agreement 頁面的規章頁籤 .active 沒有設定

### 登入方式
- 原專案: 登入頁面 => 送出登入資料 => 規章頁面 => 同意 => 登入成功
- 建議: 登入頁面 => 送出登入資料(包含是否同意規章) => 登入成功
