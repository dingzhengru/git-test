<template>
  <div class="lay-are-pageContent">
    <div class="promotion__div--img">
      <img :src="promotion.img" alt="" />
    </div>
    <div class="are-eventContents">
      <div class="blk-eventContents-desc">
        <h3 class="h3-desc-title">Activity time</h3>
        <div class="panel-eventContents-desc">
          Starts 07/08/2017 at 11:00 (During the time member second deposit maximum can get 99,999THB.)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import event01 from '@/assets/Y/01/01/imgs/promotion/event01.jpg';
export default {
  name: 'PromotionContent',
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      promotion: {
        img: event01,
        activityTime: {
          title: 'Activity Time',
          content: 'Starts 07/08/2017 at 11:00 (During the time member second deposit maximum can get 99,999THB.)',
        },
        activityContent: {
          title: 'Activity Content',
          content: `<div class="panel-eventContents-desc"><ul class="cpn-ul-decimal"><li>Minimum deposit 500 THB can join this promotion</li><li>Bonus up to 5% the amount of deposit . highest to 99,999THB and rolling request multiple by 5 times to cash out.</li><li>Exp.Deposit 500 bath get bonus 10% (1,000x5%=50) The member can withdraw if summary of wagering more than (1,000+50)x5 = 5,250</li></ul></div>`,
        },
      },
    };
  },
  mounted() {
    // const id = this.$route.params.id;
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    // import(`@/styles/${this.templateType}/common/promotion.css`);
    import(`@/styles/${templatePath}/promotion.scss`);
  },
};
</script>

<style scoped>

.lay-are-pageContent {
  width: 100%;
  padding: 0;
}

.promotion__div--img {
  margin: 20px auto;
  text-align: center;
}

.blk-eventContents-desc {
  margin-bottom: 40px;
  width: 95%;
  margin: 0 auto;
}
.blk-eventContents-desc .ui-table04 {
  font-size: 1em;
}
.blk-eventContents-desc ul > li {
  margin-bottom: 20px;
}
.blk-eventContents-desc ul > li > a {
  color: #ffffff;
  background-color: #d40505;
  border-radius: 6px;
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
}
.h3-desc-title {
  height: 68px;
  margin: 20px 0;
  padding: 30px 0 0 95px;
  font-size: 2.461em;
  font-weight: normal;
}
.panel-eventContents-desc {
  font-size: 2.307em;
}
.img-event-poster {
  width: 100%;
  height: 545px;
}
</style>
