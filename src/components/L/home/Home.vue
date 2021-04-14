<template>
  <div class="home">
    <div class="ui-panel-tab home__main">
      <div class="ui-panel-tab__tabs home__main__tabs">
        <div
          class="ui-panel-tab__tabs__item"
          :class="{ active: productClassifyCurrent === item.Lst_Game_Classify }"
          v-for="item in productClassifyListNoAll"
          :key="item.Lst_Game_Classify"
          @click="productClassifyCurrent = item.Lst_Game_Classify"
        >
          {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
        </div>
      </div>

      <div class="ui-panel-tab__content home__main__content">
        <component :is="NewsMarquee" />
        <component
          :is="HomeProductBlock"
          :list="productListByClassify(productClassifyCurrent)"
          :classify="productClassifyCurrent"
        />
      </div>
    </div>
    <div class="home__footer">
      <div class="home__footer__left">
        <button @click="$router.push({ name: 'TransactionDepositHome' })">{{ $t('transaction.title') }}</button>
      </div>
      <div class="home__footer__center">
        <span class="home__footer__icon home__footer__icon--promotion"></span>
        <span class="home__footer__icon home__footer__icon--mail"></span>
        <span class="home__footer__icon home__footer__icon--fav"></span>
        <span class="home__footer__icon home__footer__icon--contact"></span>
      </div>
      <div class="home__footer__right">
        <button @click="$router.push({ name: 'TransactionDepositHome' })">{{ $t('transaction.nav.deposit') }}</button>
        <button @click="$router.push({ name: 'TransactionWithdrawal' })">{{ $t('transaction.nav.withdrawal') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters([
      'lang',
      'siteSetting',
      'siteFullCss',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
      'userIsLoggedIn',
      'productList',
      'productClassifyList',
      'productListByClassify',
    ]),
    NewsMarquee() {
      return () => import(`@/${this.siteSetting.components.home.NewsMarquee}`);
    },
    HomeProductBlock() {
      return () => import(`@/${this.siteSetting.components.home.HomeProductBlock}`);
    },
    productClassifyListNoAll() {
      return this.productClassifyList.slice(1);
    },
  },
  data() {
    return {
      productClassifyCurrent: 1,
    };
  },
  mounted() {
    this.importStyleByFilename('home');
  },
};
</script>

<style></style>
