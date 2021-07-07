<template>
  <div class="promotion">
    <div class="ui-panel-tab">
      <div
        class="ui-panel-tab__tabs promotion__tabs"
        ref="promotionPanelTabs"
        @scroll.passive="handelScrollArrowY($event.target)"
      >
        <transition-group class="promotion__tabs__group" tag="div" name="panel-tabs">
          <div
            class="ui-panel-tab__tabs__item panel-tabs-item promotion__tabs__item"
            :class="{ active: item.Lst_PromotionID == $route.params.id }"
            v-for="item in promotionListByCategory"
            :key="item.Lst_PromotionID"
            @click="goPromotionDetail(item)"
          >
            {{ item.Lst_Title }}
          </div>
        </transition-group>

        <div class="ui-panel-tab__tabs__arrow ui-panel-tab__tabs__arrow--bottom" v-show="isShowBottomArrow"></div>
      </div>

      <div class="ui-panel-tab__content promotion__content">
        <component
          :is="PromotionNavTab"
          :category="category"
          :categoryList="categoryList"
          @change-category="changeCategory"
        />

        <component :is="PromotionDetail" v-if="isShowPromotionDetail" />
      </div>
    </div>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinPromotion from '@/mixins/promotion';
import mixinScrollArrow from '@/mixins/_scrollArrow';
import { mapGetters } from 'vuex';

export default {
  name: 'Promotion',
  mixins: [mixinStyleLoader, mixinPromotion, mixinScrollArrow],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'userIsLoggedIn']),
    PromotionNavTab() {
      return () => import(`@/${this.siteSetting.components.promotion.PromotionNavTab}`);
    },
    PromotionDetail() {
      return () => import(`@/${this.siteSetting.components.promotion.PromotionDetail}`);
    },
    isShowPromotionDetail() {
      return this.$route.params.id !== undefined;
    },
  },
  mounted() {
    this.importStyleByFilename('promotion');
  },
  watch: {
    promotionListByCategory() {
      this.initScrollArrowY(this.$refs.promotionPanelTabs);
      if (this.isShowPromotionDetail) {
        return;
      }
      const promotion = this.promotionListHasDetail[0];
      if (promotion) {
        this.$router.push({ name: 'PromotionDetail', params: { id: promotion.Lst_PromotionID } }).catch(() => {});
      }
    },
  },
};
</script>
