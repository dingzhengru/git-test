<template>
  <div class="promotion-content" :class="{ 'promotion-content-auth': isLoggedIn }">
    <div class="promotion-content__image">
      <img class="promotion-content__image__img" :src="image" alt="" />
    </div>
    <div class="promotion-content__main">
      <div class="promotion-content__main__content" v-for="content in contentList" :key="content.name">
        <h3 class="promotion-content__main__content__title">{{ $t(content.title) }}</h3>
        <div class="promotion-content__main__content__desc" v-html="content.content"></div>
      </div>
      <div class="promotion-content__main__button">
        <button class="promotion-content__main__button--back ui-btn ui-btn-long" @click="$router.go(-1)">
          {{ $t('promotionContent.button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import event01 from '@/assets/Y/01/imgs/promotion/event01.jpg';
export default {
  name: 'PromotionContent',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      image: event01,
      contentList: [
        {
          name: 'date',
          title: 'promotionContent.title.date',
          content: 'Starts 07/08/2017 at 11:00 (During the time member second deposit maximum can get 99,999THB.)',
        },
        {
          name: 'content',
          title: 'promotionContent.title.content',
          content: `<div class="promotion-content__main__content__desc"><ul class="cpn-ul-decimal"><li>Minimum deposit 500 THB can join this promotion</li><li>Bonus up to 5% the amount of deposit . highest to 99,999THB and rolling request multiple by 5 times to cash out.</li><li>Exp.Deposit 500 bath get bonus 10% (1,000x5%=50) The member can withdraw if summary of wagering more than (1,000+50)x5 = 5,250</li></ul></div>`,
        },
        {
          name: 'rule',
          title: 'promotionContent.title.rule',
          content: `<ul class="cpn-ul-decimal"><li>Maximum bonus up to99,999</li><li>The same deposit amount. Can only get bonus one time.</li><li>Roling 5 times to cash out (Deposit+Bonus) and rolling will be counted when the amount of money taken bets will be win or lose</li><li>Member account multiple applications behavior will be reserves the right to cancel. If multiple players in the common use of an account or a single player use multiple accounts or any fraudulent activity, all wagers will be canceled</li><li>Live Casino: Baccaract bet “Banker+Player”, Roulette : Bet on “Red+ Black”，”Even+Odds“，”Big+Small“ are all does not count.</li><li>Live Casino Roulette , one game wagers over 25th will not count. Below 24(or including 24 ) will be normal betting.</li><li>Sport (SABA):Same match can not be bets opposite side.</li><li>We also reserve the right to change rules or confidentiality regulations at any time. Any change will be published and displayed at the website of『LIONKING88』</li></ul>`,
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
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/promotion-content.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.promotion-content {
  padding-bottom: 160px;
}

.promotion-content-auth {
  padding-top: 88px;
}

.promotion-content__image {
  margin: 20px auto;
  text-align: center;
}

.promotion-content__main__content {
  margin-bottom: 40px;
  width: 95%;
  margin: 0 auto;
}
.promotion-content__main__content .ui-table04 {
  font-size: 1em;
}
.promotion-content__main__content ul > li {
  margin-bottom: 20px;
}
.promotion-content__main__content ul > li > a {
  border-radius: 6px;
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
}
.promotion-content__main__content__title {
  height: 68px;
  margin: 20px 0;
  padding: 30px 0 0 95px;
  font-size: 2.461em;
  font-weight: normal;
}
.promotion-content__main__content__desc {
  font-size: 2.307em;
}
.promotion-content__main__button {
  text-align: center;
}
</style>
