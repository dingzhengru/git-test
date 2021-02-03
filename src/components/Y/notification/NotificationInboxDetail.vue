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
import mixinUserMailDetail from '@/mixins/userMailDetail';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'NotificationInboxDetail',
  mixins: [mixinUserMailDetail],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
