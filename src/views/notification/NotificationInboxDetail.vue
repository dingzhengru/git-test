<template>
  <div class="notification-inbox-detail">
    <div v-for="item in list" :key="item.Lst_Key">
      <ul class="notification-inbox-detail__ul">
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.title')}：${item.Lst_Subject}` }}
        </li>
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.sender')}：${item.Lst_SenderAccount}` }}
        </li>
        <li class="notification-inbox-detail__ul__li">
          {{ `${$t('notification.inboxDetail.datetime')}：${item.Lst_SendTime}` }}
        </li>
      </ul>
      <div class="theme-content-box notification-inbox-detail__content" v-html="item.Lst_Content"></div>
    </div>
    <form
      class="notification-inbox-detail__replay-box theme-content-box"
      id="notification-inbox-detail-form"
      @submit.prevent="submitMail"
    >
      <div class="theme-input-box">
        <span class="theme-input-header">{{ $t('notification.inboxDetail.reply') }}</span>
        <textarea class="ui-tar" cols="80" rows="5" v-model="content"></textarea>
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
import { getInboxDetail, sendMail } from '@/api/notification';

export default {
  name: 'NotificationInboxDetail',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [],
      content: '',
    };
  },
  methods: {
    async getInboxDetail() {
      const requestData = { KEY: this.$route.params.key };
      const result = await getInboxDetail(requestData);
      console.log('[Inbox]', result);

      this.list = result.RetObj.Rows;
    },
    async submitMail() {
      const requestData = {
        Add_Category: this.list[0].Lst_Category,
        Add_Subject: this.list[0].Lst_Subject,
        Add_Content: this.content,
        Add_ReplyPath: this.list.map(item => item.Lst_Key).join(':'),
      };
      const result = await sendMail(requestData);

      if (result.Code == 200) {
        console.log('[SendMail]', result);
        window.alert(this.$t('notification.inboxDetail.alert.success'));
        this.content = '';
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
        import(`@/styles/${this.siteFullCss}/notification/notification-inbox-detail.scss`);

        this.getInboxDetail();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-inbox-detail {
  margin: 30px 0;

  &__ul {
    padding: 0;
    margin: 0;
    font-size: 2.307em;
    list-style: none;

    &__li {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px dotted #fff;
    }
    &__li:last-child {
      border-bottom: none;
    }
  }

  &__content {
    margin-bottom: 30px;
    padding-bottom: 30px;
    font-size: 2.769em;
  }

  &__replay-box {
    margin-bottom: 30px;
    padding: 30px 3%;
  }

  &__button-div {
    margin: 20px 0;
    text-align: center;

    button {
      margin: 0 10px;
    }
  }
}
</style>

<style scoped>
/* .notification-inbox-detail {
  margin: 30px 0;
} */
/* .notification-inbox-detail__ul {
  padding: 0;
  margin: 0;
  font-size: 2.307em;
  list-style: none;
} */

/* .notification-inbox-detail__ul__li {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #fff;
} */

/* .notification-inbox-detail__ul__li:last-child {
  border-bottom: none;
} */

/* .notification-inbox-detail__content {
  margin-bottom: 30px;
  padding-bottom: 30px;
  font-size: 2.769em;
} */

/* .notification-inbox-detail__replay-box {
  margin-bottom: 30px;
  padding: 30px 3%;
} */

/* .notification-inbox-detail__button-div {
  margin: 20px 0;
  text-align: center;
} */

/* .notification-inbox-detail__button-div button {
  margin: 0 10px;
} */
</style>
