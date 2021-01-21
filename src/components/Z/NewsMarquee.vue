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
import { apiGetMessageList } from '@/api/message';
import { mapGetters } from 'vuex';
export default {
  name: 'NewsMarquee',
  components: {
    DynamicMarquee,
  },
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      marqueeList: [
        {
          text: '最新消息1',
        },
        {
          text: '最新消息2',
        },
        {
          text: '最新消息3',
        },
      ],
      marqueePaused: false,
    };
  },
  methods: {
    async getMessageMarqueeList() {
      const requestDataMessageList = { msgtype: 'B' };
      await apiGetMessageList(requestDataMessageList);
      // if (result.Code == 200) {
      //   this.marqueeList = result.RetObj;
      // }
    },
  },
  mounted() {
    this.getMessageMarqueeList();
  },
  watch: {
    lang() {
      this.getMessageMarqueeList();
    },
  },
};
</script>
