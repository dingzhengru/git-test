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
          {{ `${$t('notification.inboxDetail.datetime')}：${item.Lst_SendTime.replace('T', ' ')}` }}
        </li>
      </ul>
      <div class="theme-content-box notification-inbox-detail__content" v-html="item.Lst_Content"></div>
    </div>
    <ValidationObserver v-slot="{ invalid, handleSubmit, reset }">
      <form
        class="notification-inbox-detail__replay-box theme-content-box"
        id="notification-inbox-detail-form"
        @submit.prevent="handleSubmit(submitMail)"
        @reset.prevent="reset"
      >
        <ValidationProvider class="theme-input-box" tag="div" :rules="{ required: true }">
          <span class="theme-input-header">{{ $t('notification.inboxDetail.reply') }}</span>
          <textarea class="ui-tar" cols="80" rows="5" v-model="mail.Add_Content"></textarea>
        </ValidationProvider>
      </form>

      <div class="notification-inbox-detail__button-div">
        <button
          class="notification-inbox-detail__button--submit ui-btn"
          type="submit"
          form="notification-inbox-detail-form"
          :disabled="invalid"
        >
          {{ $t('ui.button.submit') }}
        </button>
        <button class="notification-inbox-detail__button--cancel ui-btn" type="reset" @click="resetForm">
          {{ $t('ui.button.cancel') }}
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetInboxDetail, apiSendMail } from '@/api/notification';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'NotificationInboxDetail',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  data() {
    return {
      list: [],
      mail: {
        Add_Category: '',
        Add_Subject: '',
        Add_ReplyPath: '',
        Add_Content: '',
      },
    };
  },
  methods: {
    async getInboxDetail() {
      const requestData = { KEY: this.$route.params.key };
      const result = await apiGetInboxDetail(requestData);

      this.list = result.RetObj.Rows;
      this.mail.Add_Category = result.RetObj.Add_Category;
      this.mail.Add_Subject = result.RetObj.Add_Subject;
      this.mail.Add_ReplyPath = result.RetObj.Add_ReplyPath;
    },
    async submitMail() {
      const result = await apiSendMail(this.mail);

      if (result.Code == 200) {
        window.alert(this.$t('alert.replaySuccess'));
        this.resetForm();
      }
    },
    resetForm() {
      this.mail.Add_Content = '';
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/notification/notification-inbox-detail.scss`);

    this.getInboxDetail();
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
