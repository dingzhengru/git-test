<template>
  <div class="notification-inbox-detail">
    <div v-for="item in list" :key="item.id">
      <ul class="notification-inbox-detail__ul">
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.title')}：${item.title}` }}
        </li>
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.sender')}：${item.sender}` }}
        </li>
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.datetime')}：${item.datetime}` }}
        </li>
      </ul>
      <div class="theme-content-box notification-inbox-detail__content" v-html="item.content"></div>
    </div>
    <form
      class="notification-inbox-detail__replay-box theme-content-box"
      id="notification-inbox-detail-form"
      @submit.prevent="submitChat"
    >
      <div class="theme-input-box">
        <span class="theme-input-header">{{ $t('notification.inboxDetail.reply') }}</span>
        <textarea class="ui-tar" cols="80" rows="5" v-model="chat"></textarea>
      </div>
    </form>
    <div class="notification-inbox-detail__button-div">
      <button
        class="notification-inbox-detail__button--submit ui-btn"
        type="submit"
        form="notification-inbox-detail-form"
      >
        Submit
      </button>
      <button class="notification-inbox-detail__button--cancel ui-btn">
        Cancellation
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationInboxDetail',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [
        {
          id: '111',
          group: 'group-id11111',
          title: 'ttestt',
          sender: 'ding01',
          datetime: '2020-07-29 10:31:26',
          content: `<h2>test11111</h2>`,
        },
        {
          id: '000',
          group: 'group-id11111',
          title: 'ttestt',
          sender: 'SysAdmin',
          datetime: '2020-07-29 10:33:28',
          content: `<h2>test00000</h2>`,
        },
      ],
      chat: '',
    };
  },
  methods: {
    submitChat() {
      console.log('submitChat', this.chat);
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
        import(`@/styles/${this.siteFullCss}/notification/notification-inbox-detail.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.notification-inbox-detail {
  margin: 30px 0;
}
.notification-inbox-detail__ul {
  padding: 0;
  margin: 0;
  font-size: 2.307em;
  list-style: none;
}

.notification-inbox-detail__ul__li {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #fff;
}

.notification-inbox-detail__ul__li:last-child {
  border-bottom: none;
}

.notification-inbox-detail__content {
  margin-bottom: 30px;
  padding-bottom: 30px;
  font-size: 2.769em;
}

.notification-inbox-detail__replay-box {
  margin-bottom: 30px;
  padding: 30px 3%;
}

.notification-inbox-detail__button-div {
  margin: 20px 0;
  text-align: center;
}

.notification-inbox-detail__button-div button {
  margin: 0 10px;
}
</style>
