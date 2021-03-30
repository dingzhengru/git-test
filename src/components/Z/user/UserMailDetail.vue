<template>
  <div class="user-mail-detail">
    <!-- <div class="user-mail-detail__title">{{ $t('user.mailDetail.title') }}</div> -->
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
        <ValidationProvider class="ui-field" tag="div" :rules="{ required: true }">
          <div class="ui-field__group--textarea">
            <label for="user-mail-detail-content">{{ $t('notification.inboxDetail.reply') }}</label>
            <textarea id="user-mail-detail-content" cols="30" rows="7" v-model="mail.Add_Content"></textarea>
          </div>
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
import mixinUserMailDetail from '@/mixins/userMailDetail';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserMailDetail',
  mixins: [mixinUserMailDetail],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    getDatetime: () => datetime => {
      return datetime.replace('T', ' ');
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', 'user.mailDetail.title');
  },
};
</script>
