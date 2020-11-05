<template>
  <form class="notification-outbox" @submit.prevent="submitMail">
    <!-- <form class="notification-outbox__box theme-content-box" id="notification-outbox-form" @submit.prevent="submitMail"> -->
    <div class="theme-content-box">
      <div class="notification-outbox__field theme-input-box">
        <span class="theme-input-header">{{ $t('notification.outbox.category') }}</span>
        <select class="notification-outbox__field__select ui-ddl" required v-model="mail.Add_Category">
          <option value="" selected>{{ $t('notification.outbox.categoryList.placeholder') }}</option>
          <option :value="category.Value" v-for="category in categoryList" :key="category.Value">
            {{ category.Text }}
          </option>
        </select>
      </div>

      <div class="notification-outbox__field theme-input-box">
        <span class="theme-input-header">{{ $t('notification.outbox.title') }}</span>
        <input class="ui-ipt" type="text" required maxlength="20" v-model="mail.Add_Subject" />
      </div>

      <div class="notification-outbox__field theme-input-box">
        <span class="theme-input-header">{{ $t('notification.outbox.content') }}</span>
        <textarea class="ui-tar" cols="33" rows="5" required v-model="mail.Add_Content"></textarea>
      </div>
    </div>
    <div class="notification-outbox__button-div">
      <button class="notification-outbox__button--submit ui-btn" type="submit">
        {{ $t('ui.button.submit') }}
      </button>
      <button class="notification-outbox__button--cancel ui-btn" @click.prevent="$router.go(-1)">
        {{ $t('ui.button.cancel') }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetMailCategoryList, apiSendMail } from '@/api/notification';

export default {
  name: 'NotificationOutbox',
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
        console.log('[SendMail]', result);
        this.resetMail();

        window.alert(this.$t('alert.sendEmailSuccess'));
      }
    },
    async getMailCategoryList() {
      const result = await apiGetMailCategoryList();
      console.log('[MailCategoryList]', result);

      this.categoryList = result.RetObj;
    },
    resetMail() {
      this.mail = { Add_Category: '', Add_Subject: '', Add_Content: '', Add_ReplyPath: '' };
    },
  },
  mounted() {
    // * 根據版型引入 css
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

<style scoped>
/* .notification-outbox {
  margin: 30px 0;
} */

/* .notification-outbox__field {
  margin: 30px 0;
} */

/* .notification-outbox__field__select {
  padding: 0 1.5%;
  font-size: 2.5rem;
} */

/* .notification-outbox__button-div {
  margin: 40px 0;
  text-align: center;
} */
/* .notification-outbox__button-div button {
  margin: 0 10px;
} */
</style>
