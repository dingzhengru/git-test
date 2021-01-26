<template>
  <div class="maintenance">
    <div class="maintenance__content-block" v-for="content in contentList" :key="content.lang">
      <p>
        <span v-html="content.htmlContent1"></span>
        <span class="text-red">{{ siteMaintainTimeStart }} ~ {{ siteMaintainTimeEnd }} (HK Time GMT +8)</span>
        <span v-html="content.htmlContent2"></span>
      </p>
    </div>
    <button class="ui-btn">Contact with online service</button>
    <footer class="maintenance__footer">
      <div class="maintenance__footer__logo">
        <ul class="maintenance__footer__ul">
          <li class="maintenance__footer__logo1"></li>
          <li class="maintenance__footer__logo2"></li>
          <!-- <li class="maintenance__footer__logo3"></li> -->
          <li class="maintenance__footer__logo4"></li>
          <li
            class="maintenance__footer__logo5"
            :style="{ 'background-image': `url(${siteResourceUrlMaintain}/footer_logo5.png)` }"
          ></li>
          <li class="maintenance__footer__logo6"></li>
        </ul>
      </div>
      <div class="maintenance__footer__copyright">Copyright © 2014 {{ siteName }} All Rights Reserved</div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Maintenance',
  computed: {
    ...mapGetters([
      'siteFullCss',
      'siteResourceUrlMaintain',
      'siteName',
      'siteStatus',
      'siteMaintainTimeStart',
      'siteMaintainTimeEnd',
    ]),
  },
  data() {
    return {
      contentList: [
        {
          lang: 'zh-tw',
          htmlContent1: `系統目前正在維護中，維護時間為:<br />`,
          htmlContent2: `<br />請您耐心等待，不便之處，我們為此十分抱歉!`,
        },
        {
          lang: 'zh-cn',
          htmlContent1: `系统目前正在维护中，维护時间为:<br />`,
          htmlContent2: `<br /> 请您耐心等待，不便之处，我们为此十分抱歉!`,
        },
        {
          lang: 'en-us',
          htmlContent1: `The system is currently maintenance,maintenance time is:<br />`,
          htmlContent2: `<br />  Please be patient, inconvenience,we therefore very sorry!`,
        },
        {
          lang: 'th-th',
          htmlContent1: `เนื่องจากขณะนี้ระบบอยู่ในช่วงปิดปรับปรุง！ช่วงเวลาปิดปรับปรุง:<br />`,
          htmlContent2: `<br />  ขออภัยในความไม่สะดวกด้วยครับ/ค่ะ`,
        },
      ],
    };
  },
  mounted() {
    //* 非維護時，轉去首頁
    if (this.siteStatus == 0) {
      this.$router.replace({ name: 'Home' });
    }

    import(`@/styles/${this.siteFullCss}/maintenance.scss`);
  },
};
</script>
