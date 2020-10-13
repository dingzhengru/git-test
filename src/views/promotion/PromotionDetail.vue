<template>
  <div class="promotion-detail" :class="{ 'promotion-detail-auth': isLoggedIn }">
    <img class="promotion-detail__image" :src="image" alt="" />
    <div class="promotion-detail__main">
      <div
        class="promotion-detail__main__content"
        v-for="promotionDetail in promotionDetailList"
        :key="promotionDetail.name"
      >
        <h3 class="promotion-detail__main__content__title">
          {{ $t(promotionDetail.ContentTitle) }}
        </h3>
        <div class="promotion-detail__main__content__desc" v-html="promotionDetail.ContentHtml"></div>
      </div>
      <div class="promotion-detail__main__button">
        <button
          class="promotion-detail__main__button--back ui-btn ui-btn-long"
          @click="$router.push({ name: 'Promotion' })"
        >
          {{ $t('promotionDetail.button.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getPromotionDetail } from '@/api/promotion';
export default {
  name: 'PromotionDetail',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      image: '',
      promotionDetailList: [],
      contentList: [
        {
          name: 'date',
          title: 'promotionDetail.title.date',
          content: 'Starts 07/08/2017 at 11:00 (During the time member second deposit maximum can get 99,999THB.)',
        },
        {
          name: 'content',
          title: 'promotionDetail.title.content',
          content: `<div class="promotion-detail__main__content__desc"><ul class="cpn-ul-decimal"><li>Minimum deposit 500 THB can join this promotion</li><li>Bonus up to 5% the amount of deposit . highest to 99,999THB and rolling request multiple by 5 times to cash out.</li><li>Exp.Deposit 500 bath get bonus 10% (1,000x5%=50) The member can withdraw if summary of wagering more than (1,000+50)x5 = 5,250</li></ul></div>`,
        },
        {
          name: 'rule',
          title: 'promotionDetail.title.rule',
          content: `<ul class="cpn-ul-decimal"><li>Maximum bonus up to99,999</li><li>The same deposit amount. Can only get bonus one time.</li><li>Roling 5 times to cash out (Deposit+Bonus) and rolling will be counted when the amount of money taken bets will be win or lose</li><li>Member account multiple applications behavior will be reserves the right to cancel. If multiple players in the common use of an account or a single player use multiple accounts or any fraudulent activity, all wagers will be canceled</li><li>Live Casino: Baccaract bet “Banker+Player”, Roulette : Bet on “Red+ Black”，”Even+Odds“，”Big+Small“ are all does not count.</li><li>Live Casino Roulette , one game wagers over 25th will not count. Below 24(or including 24 ) will be normal betting.</li><li>Sport (SABA):Same match can not be bets opposite side.</li><li>We also reserve the right to change rules or confidentiality regulations at any time. Any change will be published and displayed at the website of『LIONKING88』</li></ul>`,
        },
      ],
    };
  },
  methods: {
    async getPromotionDetail() {
      console.log('[GetPromotionDetail]', this.$route.params.id);

      const requestData = { PromotionId: Number(this.$route.params.id) };
      const result = await getPromotionDetail(requestData);
      console.log('[PromotionDetail]', result);
      if (result.Code == 200) {
        this.image = result.RetObj.ImageUrl;
        this.promotionDetailList = result.RetObj.ReturnList;
      }
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/promotion/promotion-detail.scss`);

        this.getPromotionDetail();
      },
    },
  },
};
</script>

<style lang="scss">
/**
 ** 因為 normalize 有設定 font-size，無法寫在 scoped
 ** 看是要去改 normalize 還是現在這種另外覆蓋寫
*/
.promotion-detail__main__content__desc {
  h1 {
    font-size: 4.6em;
  }
  h2 {
    font-size: 3.45em;
  }
  h3 {
    font-size: 2.69em;
  }
  h4 {
    font-size: 2.3em;
  }
  h5 {
    font-size: 1.9em;
  }
  h6 {
    font-size: 1.54em;
  }
}
</style>

<style lang="scss" scoped>
.promotion-detail {
  padding-bottom: 160px;

  &-auth {
    padding-top: 88px;
  }

  &__image {
    display: block;
    width: 600px;
    height: 190px;
    margin: 20px auto;
  }

  &__main {
    &__content {
      margin-bottom: 40px;
      width: 95%;
      margin: 0 auto;

      &__title {
        height: 68px;
        margin: 20px 0;
        padding: 30px 0 0 95px;
        font-size: 2.461em;
        font-weight: normal;
      }

      &__desc {
        // font-size: 2.307em;
        font-size: 2.3em;
        word-break: break-word;

        // h1 {
        //   font-size: 4em;
        // }
        // h2 {
        //   font-size: 3em;
        // }
        // h3 {
        //   font-size: 2.34em;
        // }
        // h4 {
        //   font-size: 2em;
        // }
        // h5 {
        //   font-size: 1.66em;
        // }
        // h6 {
        //   font-size: 1.34em;
        // }
      }

      .ui-table04 {
        font-size: 1em;
      }

      ul > li {
        margin-bottom: 20px;
      }

      ul > li > a {
        border-radius: 6px;
        padding: 5px 10px;
        margin: 5px;
        display: inline-block;
      }
    }
    &__button {
      text-align: center;
    }
  }
}
</style>

<style scoped>
/* .promotion-detail {
  padding-bottom: 160px;
} */

/* .promotion-detail-auth {
  padding-top: 88px;
} */

/* .promotion-detail__image {
  margin: 20px auto;
  text-align: center;
} */

/* .promotion-detail__main__content {
  margin-bottom: 40px;
  width: 95%;
  margin: 0 auto;
} */
/* .promotion-detail__main__content .ui-table04 {
  font-size: 1em;
} */
/* .promotion-detail__main__content ul > li {
  margin-bottom: 20px;
} */
/* .promotion-detail__main__content ul > li > a {
  border-radius: 6px;
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
} */
/* .promotion-detail__main__content__title {
  height: 68px;
  margin: 20px 0;
  padding: 30px 0 0 95px;
  font-size: 2.461em;
  font-weight: normal;
} */
/* .promotion-detail__main__content__desc {
  font-size: 2.307em;
} */
/* .promotion-detail__main__button {
  text-align: center;
} */
</style>
