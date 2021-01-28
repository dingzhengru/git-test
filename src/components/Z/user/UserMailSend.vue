<template>
  <ValidationObserver class="user-mail-send" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-mail-send__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
      <ValidationProvider class="ui-field user-mail-send__field" tag="div" :rules="{ required: true }">
        <select class="ui-field__select user-mail-send__field__select" v-model="mail.Add_Category">
          <option value="" selected>{{ $t('notification.outbox.categoryList.placeholder') }}</option>
          <option :value="item.Value" v-for="item in categoryList" :key="item.Value">
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <ValidationProvider class="ui-field user-mail-send__field" tag="div" :rules="{ required: true }">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="user-mail-send-subject">{{ $t('ui.label.subject') }}</label>
          <input class="ui-field__group__input" id="user-mail-send-subject" type="text" v-model="mail.Add_Subject" />
        </div>
      </ValidationProvider>

      <ValidationProvider class="ui-field" tag="div" :rules="{ required: true }">
        <div class="ui-field__group--textarea">
          <label for="user-mail-send-content">{{ $t('user.mailSend.label.desc') }}</label>
          <textarea id="user-mail-send-content" cols="30" rows="7" v-model="mail.Add_Content"></textarea>
        </div>
      </ValidationProvider>

      <div class="user-mail-send__btn">
        <button class="ui-btn ui-btn--block user-mail-send__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.send') }}
        </button>
        <button class="ui-btn ui-btn--block user-mail-send__btn--reset" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetMailCategoryList, apiSendMail } from '@/api/notification';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'NotificationOutbox',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
  },
  data() {
    return {
      categoryList: [],
      mail: {
        Add_Category: '',
        Add_Subject: '',
        Add_Content: '',
        Add_ReplyPath: '',
      },
    };
  },
  methods: {
    async submitMail() {
      const result = await apiSendMail(this.mail);

      if (result.Code == 200) {
        this.resetForm();
        window.alert(this.$t('alert.sendEmailSuccess'));
      }
    },
    async getMailCategoryList() {
      const result = await apiGetMailCategoryList();

      this.categoryList = result.RetObj;
    },
    resetForm() {
      this.mail = { Add_Category: '', Add_Subject: '', Add_Content: '', Add_ReplyPath: '' };
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/notification/notification-outbox.scss`);

    this.getMailCategoryList();
  },
  watch: {
    lang() {
      this.getMailCategoryList();
    },
  },
};
</script>
