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
import { apiGetInboxDetail, apiSendMail } from '@/api/notification';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'NotificationInboxDetail',
  components: {
    ValidationObserver,
    ValidationProvider,
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
    this.getInboxDetail();
  },
};
</script>
