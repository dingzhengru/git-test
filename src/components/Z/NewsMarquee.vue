<template>
  <div class="news-marquee">
    <!-- <i class="news-marquee__icon"></i> -->
    <img class="news-marquee__icon" :src="newsIcon" alt="" />
    <span class="news-marquee__label">{{ $t('header.menu.news') }}:</span>
    <!-- <div class="news-marquee__window" @click="$router.push({ name: 'News' })">
      <DynamicMarquee :direction="'row'" :reverse="true" :speed="{ type: 'pps', number: 50 }" :repeatMargin="50">
        <a v-for="(item, index) in marqueeList" :key="index">
          {{ item.text }}
        </a>
      </DynamicMarquee>
    </div> -->
    <div class="news-marquee__window" @click="$router.push({ name: 'News' })">
      <MarqueeText v-if="marqueeList.length > 0">
        <a href="javascript:;" v-for="(item, index) in marqueeListFiltered" :key="index">
          {{ item.Lst_Content }}
        </a>
      </MarqueeText>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MarqueeText from 'vue-marquee-text-component';
import mixinMessageNewsMarquee from '@/mixins/messageNewsMarquee';
export default {
  name: 'NewsMarquee',
  mixins: [mixinMessageNewsMarquee],
  components: {
    MarqueeText,
  },
  computed: {
    ...mapGetters(['siteFullCss']),
    newsIcon() {
      return require(`@/assets/${this.siteFullCss}/ui/ui-horn.png`);
    },
  },
};
</script>
