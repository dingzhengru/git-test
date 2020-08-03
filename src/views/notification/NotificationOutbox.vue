<template>
  <div class="notification-outbox">
    <form class="notification-outbox__box theme-content-box" id="notification-outbox-form" @submit.prevent="submitMail">
      <div class="notification-outbox__field theme-input-box" v-for="field in fieldList" :key="field.name">
        <span class="theme-input-header">
          {{ $t(field.text) }}
        </span>

        <template v-if="field.name == 'category'">
          <select class="notification-outbox__field__select ui-ddl" v-model="mail.category">
            <option :value="{}" selected>{{ $t('notification.outbox.categoryList.placeholder') }}</option>
            <option :value="category" v-for="category in categoryList" :key="category.value">
              {{ $t(category.text) }}
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
        {{ $t('ui.button.submit') }}
      </button>
      <button class="notification-outbox__button--cancel ui-btn" @click="$router.go(-1)">
        {{ $t('ui.button.cancel') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationOutbox',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      categoryList: [
        {
          name: 'registerIssue',
          text: 'notification.outbox.categoryList.registerIssue',
          value: '01',
        },
        {
          name: 'accountSearch',
          text: 'notification.outbox.categoryList.accountSearch',
          value: '02',
        },
        {
          name: 'depositIssue',
          text: 'notification.outbox.categoryList.depositIssue',
          value: '03',
        },
        {
          name: 'withdrawalRelated',
          text: 'notification.outbox.categoryList.withdrawalRelated',
          value: '04',
        },
        {
          name: 'betIssue',
          text: 'notification.outbox.categoryList.betIssue',
          value: '05',
        },
        {
          name: 'gameIssue',
          text: 'notification.outbox.categoryList.gameIssue',
          value: '06',
        },
        {
          name: 'limitedGambling',
          text: 'notification.outbox.categoryList.limitedGambling',
          value: '07',
        },
        {
          name: 'promotion',
          text: 'notification.outbox.categoryList.promotion',
          value: '08',
        },
        {
          name: 'technologyRelated',
          text: 'notification.outbox.categoryList.technologyRelated',
          value: '09',
        },
        {
          name: 'aboutUs',
          text: 'notification.outbox.categoryList.aboutUs',
          value: '10',
        },
      ],
      fieldList: [
        {
          name: 'category',
          text: 'notification.outbox.category',
        },
        {
          name: 'title',
          text: 'notification.outbox.title',
        },
        {
          name: 'content',
          text: 'notification.outbox.content',
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
  font-size: 2.5rem;
}

.notification-outbox__button-div {
  margin: 40px 0;
  text-align: center;
}
.notification-outbox__button-div button {
  margin: 0 10px;
}
</style>
