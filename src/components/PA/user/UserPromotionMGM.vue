<template>
  <div class="user-promotion-gmg">
    <div class="ui-panel-tab">
      <component :is="PanelTabs" :list="tabList" />

      <div class="ui-panel-tab__content user-promotion-gmg__content">
        <div class="user-promotion-gmg__nav">
          <div
            class="user-promotion-gmg__nav__item"
            :class="{ active: $route.name === 'UserPromotionMGMDetail' }"
            @click="$router.push({ name: 'UserPromotionMGMDetail' }).catch(() => {})"
          >
            {{ $t('user.mgm.nav.detail') }}
          </div>
          <div
            class="user-promotion-gmg__nav__item"
            :class="{ active: $route.name === 'UserPromotionMGMBonus' }"
            @click="$router.push({ name: 'UserPromotionMGMBonus' }).catch(() => {})"
          >
            {{ $t('user.mgm.nav.bonus') }}
          </div>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinUserPromotionMGM from '@/mixins/userPromotionMGM';
// import VueQr from 'vue-qr';
export default {
  name: 'UserPromotionMGM',
  mixins: [mixinUserPromotionMGM],
  // components: {
  //   VueQr,
  // },
  computed: {
    ...mapGetters(['lang', 'siteSetting']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
  },
  data() {
    return {
      tabList: [
        {
          route: 'UserProfile',
          text: 'header.menu.profile',
          otherActiveRoute: [],
        },
        {
          route: 'UserPromotionMGMDetail',
          text: 'user.nav.promotionMGM',
          otherActiveRoute: ['UserPromotionMGMBonus'],
        },
      ],
    };
  },
};
</script>

<style></style>
