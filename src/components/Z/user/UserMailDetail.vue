<template>
  <div class="user-mail-detail">
    <div class="user-mail-detail__title">寄件內容</div>
    <div class="user-mail-detail__item" v-for="item in list" :key="item.Lst_Key">
      <div class="user-mail-detail__item__date">
        <div class="user-mail-detail__item__date__label">{{ $t('ui.label.time') }}</div>
        <div class="user-mail-detail__item__date__content">{{ getDatetime(item.Lst_SendTime) }}</div>
      </div>
      <div class="user-mail-detail__item__sender">
        <div class="user-mail-detail__item__sender__label">{{ $t('user.mailDetail.label.sender') }}</div>
        <div class="user-mail-detail__item__sender__content">{{ item.Lst_SenderAccount }}</div>
      </div>
      <div class="user-mail-detail__item__subject">
        <div class="user-mail-detail__item__subject__label">{{ $t('ui.label.subject') }}</div>
        <div class="user-mail-detail__item__subject__content">{{ item.Lst_Subject }}</div>
      </div>
      <div class="user-mail-detail__item__content" v-html="item.Lst_Content"></div>
    </div>
    <ValidationObserver class="user-mail-detail__reply" tag="div" v-slot="{ invalid, handleSubmit, reset }">
      <form class="user-mail-detail__reply-form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
        <ValidationProvider class="user-mail-detail__reply__field" tag="div" :rules="{ required: true }">
          <div class="user-mail-detail__reply__field__label">{{ $t('notification.inboxDetail.reply') }}</div>
          <textarea
            class="user-mail-detail__reply__field__textarea"
            cols="30"
            rows="7"
            v-model="mail.Add_Content"
          ></textarea>
        </ValidationProvider>

        <div class="user-mail-detail__reply__btn">
          <button class="ui-btn ui-btn--block user-mail-detail__reply__btn--submit" type="submit" :disabled="invalid">
            {{ $t('ui.button.send') }}
          </button>
          <button class="ui-btn ui-btn--block user-mail-detail__reply__btn--reset" type="reset" @click="resetForm">
            {{ $t('ui.button.reset') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { apiGetInboxDetail, apiSendMail } from '@/api/notification';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserMailDetail',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    getDatetime: () => datetime => {
      return datetime.replace('T', ' ');
    },
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
