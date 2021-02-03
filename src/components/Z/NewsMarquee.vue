<template>
  <div class="news-marquee">
    <i class="news-marquee__icon"></i>
    <span class="news-marquee__label">{{ $t('notification.nav.news') }}:</span>
    <div class="news-marquee__window">
      <DynamicMarquee :direction="'row'" :reverse="true" :speed="{ type: 'pps', number: 50 }" :repeatMargin="50">
        <a v-for="(item, index) in marqueeList" :key="index" href="javascript:;">
          {{ item.text }}
        </a>
      </DynamicMarquee>
    </div>
  </div>
</template>

<script>
import DynamicMarquee from 'vue-dynamic-marquee';
import mixinMessageNewsMarquee from '@/mixins/messageNewsMarquee';
export default {
  name: 'NewsMarquee',
  mixins: [mixinMessageNewsMarquee],
  components: {
    DynamicMarquee,
  },
};
</script>
