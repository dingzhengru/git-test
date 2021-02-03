<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit, reset }">
    <form class="notification-outbox" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
      <div class="theme-content-box">
        <ValidationProvider class="notification-outbox__field theme-input-box" tag="div" :rules="{ required: true }">
          <span class="theme-input-header">{{ $t('notification.outbox.category') }}</span>
          <select class="notification-outbox__field__select ui-ddl" required v-model="mail.Add_Category">
            <option value="" selected>{{ $t('notification.outbox.categoryList.placeholder') }}</option>
            <option :value="item.Value" v-for="item in categoryList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <ValidationProvider class="notification-outbox__field theme-input-box" tag="div" :rules="{ required: true }">
          <span class="theme-input-header">{{ $t('notification.outbox.title') }}</span>
          <input class="ui-ipt" type="text" required maxlength="20" v-model="mail.Add_Subject" />
        </ValidationProvider>

        <ValidationProvider class="notification-outbox__field theme-input-box" tag="div" :rules="{ required: true }">
          <span class="theme-input-header">{{ $t('notification.outbox.content') }}</span>
          <textarea class="ui-tar" cols="33" rows="5" required v-model="mail.Add_Content"></textarea>
        </ValidationProvider>
      </div>
      <div class="notification-outbox__button-div">
        <button class="notification-outbox__button--submit ui-btn" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="notification-outbox__button--cancel ui-btn" type="reset" @click="resetForm">
          {{ $t('ui.button.cancel') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinUserMailSend from '@/mixins/userMailSend';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'NotificationOutbox',
  mixins: [mixinUserMailSend],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
