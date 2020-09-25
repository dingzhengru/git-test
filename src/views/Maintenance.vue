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
          <li
            class="maintenance__footer__logo1"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo1.png)` }"
          ></li>
          <li
            class="maintenance__footer__logo2"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo2.png)` }"
          ></li>
          <!-- <li
            class="maintenance__footer__logo3"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo3.png)` }"
          ></li> -->
          <li
            class="maintenance__footer__logo4"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo4.png)` }"
          ></li>
          <li
            class="maintenance__footer__logo5"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo5.png)` }"
          ></li>
          <li
            class="maintenance__footer__logo6"
            :style="{ 'background-image': `url(${resourceUrlMaintain}/imgs/footer_logo6.png)` }"
          ></li>
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
      'siteID',
      'siteFullCss',
      'resourceUrlMaintain',
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
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        //* 非維護時，轉去首頁
        if (this.siteStatus != 10) {
          this.$router.replace({ name: 'Home' });
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/maintenance.scss`);

        console.log(`${this.resourceUrlMaintain}/imgs/footer_logo5.png`);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.maintenance {
  padding: 10px 10%;
  p {
    margin-bottom: 30px;
    line-height: 50px;
    // font-size: 20px;
    font-size: 2.5rem;
  }

  button {
    margin-top: 35px;
    margin-bottom: 60px;
    width: 100%;
  }

  &__footer {
    // background-color: transparent;
    padding: 0 0 20px 0;

    &__logo {
      padding: 20px 10%;

      ul {
        text-align: center;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          vertical-align: top;
          list-style: none;
          // height: 49px;
          height: 73px;
          background-position: left center;
          background-repeat: no-repeat;
          margin: 0 10px;

          transform: scale(1.5); //* 因原網站是用 viewport=480，跟此網站 720 差 1.5 倍
        }
      }
    }
    &__copyright {
      color: #575757;
      font-size: 2.3rem;
      text-align: center;
    }

    &__logo1 {
      // width: 144px;
      width: 216px;
    }
    &__logo2 {
      // width: 59px;
      width: 88px;
    }
    // &__logo3 {
    //   width: 56px;
    // }
    &__logo4 {
      // width: 41px;
      width: 61px;
    }
    &__logo5 {
      // width: 118px;
      width: 177px;
    }
    &__logo6 {
      // width: 49px;
      width: 73px;
    }
  }
}
</style>
