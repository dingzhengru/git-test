<template>
  <div class="news-marquee">
    <i class="news-marquee__icon"></i>
    <span class="news-marquee__label">{{ $t('notification.nav.news') }}:</span>
    <!-- <div class="news-marquee__window" @click="$router.push({ name: 'News' })">
      <DynamicMarquee :direction="'row'" :reverse="true" :speed="{ type: 'pps', number: 50 }" :repeatMargin="50">
        <a v-for="(item, index) in marqueeList" :key="index">
          {{ item.text }}
        </a>
      </DynamicMarquee>
    </div> -->
    <div class="news-marquee__window" @click="$router.push({ name: 'News' })">
      <MarqueeText>
        <a href="javascript:;" v-for="(item, index) in marqueeList" :key="index">
          {{ item.Lst_Content }}
        </a>
      </MarqueeText>
    </div>
  </div>
</template>

<script>
import MarqueeText from 'vue-marquee-text-component';
import mixinMessageNewsMarquee from '@/mixins/messageNewsMarquee';
export default {
  name: 'NewsMarquee',
  mixins: [mixinMessageNewsMarquee],
  components: {
    MarqueeText,
  },
};
</script>
