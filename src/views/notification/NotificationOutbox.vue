<template>
  <div class="notification-outbox">
    <form class="notification-outbox__box theme-content-box" id="notification-outbox-form" @submit.prevent="submitMail">
      <div class="notification-outbox__field theme-input-box" v-for="field in fieldList" :key="field.name">
        <span class="theme-input-header">{{ field.title }}</span>

        <template v-if="field.name == 'category'">
          <select class="notification-outbox__field__select ui-ddl" v-model="mail.category">
            <option :value="{}" selected>Please select the category of mail.</option>
            <option :value="category" v-for="category in categoryList" :key="category.value">
              {{ category.name }}
            </option>
          </select>
        </template>

        <template v-if="field.name == 'title'">
          <input class="ui-ipt" type="text" maxlength="20" v-model="mail.title" />
        </template>

        <template v-if="field.name == 'content'">
          <textarea class="ui-tar" cols="33" rows="5" v-model="mail.content"></textarea>
        </template>
      </div>
    </form>
    <div class="notification-outbox__button-div">
      <button class="notification-outbox__button--submit ui-btn" type="submit" form="notification-outbox-form">
        Submit
      </button>
      <button class="notification-outbox__button--cancel ui-btn">
        Cancellation
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationOutbox',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      categoryList: [
        {
          name: 'Register Issue',
          value: '01',
        },
        {
          name: 'Account Serch',
          value: '02',
        },
        {
          name: 'Deposit Issue',
          value: '03',
        },
        {
          name: 'Withdrawals Related',
          value: '04',
        },
        {
          name: 'Betting Issue',
          value: '05',
        },
        {
          name: 'Gaming Issue',
          value: '06',
        },
        {
          name: 'Limited gambling',
          value: '07',
        },
        {
          name: 'Promotions',
          value: '08',
        },
        {
          name: 'Technology Related',
          value: '09',
        },
        {
          name: 'About us',
          value: '10',
        },
      ],
      fieldList: [
        {
          name: 'category',
          title: 'Letter Category',
        },
        {
          name: 'title',
          title: 'Title',
        },
        {
          name: 'content',
          title: 'Content',
        },
      ],
      mail: {
        category: {},
        title: '',
        content: '',
      },
    };
  },
  methods: {
    submitMail() {
      console.log('submitMail', this.mail);
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
        import(`@/styles/${this.siteFullCss}/notification/notification-outbox.scss`);
      },
    },
  },
};
</script>

<style scoped>
.notification-outbox {
  margin: 30px 0;
}

.notification-outbox__field {
  margin: 30px 0;
}

.notification-outbox__field__select {
  padding: 0 1.5%;
}

.notification-outbox__button-div {
  margin: 40px 0;
  text-align: center;
}
.notification-outbox__button-div button {
  margin: 0 10px;
}
</style>
