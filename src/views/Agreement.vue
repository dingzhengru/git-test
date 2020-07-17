<template>
  <div class="agreement">
    <div class="are-agree">
      <a class="ui-btn01 lnk-notice-agree" href="/Y/AlreadyLogin/MainPage/?log=1">Agree</a>
      <a class="ui-btn02 lnk-notice-disagree" href="/Y/NoneLogin/MainPage/">Disagree</a>
    </div>
    <div class="are-tabs">
      <ul class="cpn-boxzero cpn-inBlock-row ul-notice-tabs">
        <li
          class="li-notice-tabs"
          :class="{ active: selectedNotice == noticeObjectKey }"
          v-for="(noticeObject, noticeObjectKey) in notice"
          :key="noticeObjectKey"
        >
          <a href="javascript:;" class="lnk-notice-tabs" @click="selectedNotice = noticeObjectKey">
            {{ noticeObjectKey }}
          </a>
        </li>
      </ul>
    </div>
    <div class="are-contents">
      <div class="blk-notice">
        <ul>
          <li v-for="noticeItem in notice[selectedNotice]" :key="noticeItem">
            {{ noticeItem }}
          </li>
        </ul>
      </div>
    </div>
    <a href="javascript:;" class="lnk-notice-top" v-scroll-to="'#app'"></a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Agreement',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteCssClass', 'siteCssVersion', 'siteCssType', 'siteCssFestival']),
  },
  data() {
    return {
      selectedNotice: 'generalPrinciples',
      notice: {
        generalPrinciples: ['General Principles 01', 'General Principles 02', 'General Principles 03'],
        liveCasino: ['Live Casino 01', 'Live Casino 02', 'Live Casino 03'],
        RNG: ['RNG 01', 'RNG 02', 'RNG 03'],
        Sports: ['Sports 01', 'Sports 02', 'Sports 03'],
        P2P: [
          'P2P 01',
          'P2P 02',
          'P2P 03',
          'P2P 04',
          'P2P 05',
          'P2P 06',
          'P2P 07',
          'P2P 08',
          'P2P 09',
          'P2P 10',
          'P2P 11',
          'P2P 12',
          'P2P 13',
          'P2P 14',
          'P2P 15',
        ],
      },
    };
  },
  mounted() {
    // * 根據版型引入 css
    const cssPath = `${this.siteCssClass}/${this.siteCssVersion}/${this.siteCssType}`;
    import(`@/styles/${cssPath}/agreement.scss`);
  },
};
</script>

<style scoped>
.agreement {
  padding-top: 88px;
}

.are-contents {
  width: 90%;
  margin: 0 auto;
}

.are-agree {
  margin: 0 0 50px 0;
  text-align: center;
}
.lnk-notice-top {
  display: block;
  width: 104px;
  height: 104px;
  position: absolute;
  bottom: -177px;
  left: 0;
}
.lnk-notice-agree,
.lnk-notice-disagree {
  margin: 0 5px;
}
.ul-notice-tabs {
  text-align: center;
}
.li-notice-tabs {
  height: 62px;
  margin: 10px;
  padding: 0 40px;
  line-height: 62px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
}
.lnk-notice-tabs {
  /* color: #000; */
  font-size: 2.307em;
}
.blk-notice > ul > li {
  margin-bottom: 30px;
  /* color: #fff; */
  font-size: 2.153em;
  list-style: decimal;
}
</style>
