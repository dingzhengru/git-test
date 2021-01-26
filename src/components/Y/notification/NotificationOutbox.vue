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

<style lang="scss" scoped>
.notification-outbox {
  margin: 30px 0;

  &__field {
    margin: 30px 0;

    &__select {
      padding: 0 1.5%;
      font-size: 2.5rem;
    }
  }

  &__button-div {
    margin: 40px 0;
    text-align: center;

    button {
      margin: 0 10px;
    }
  }
}
</style>
