<template>
  <ValidationObserver class="user-mail-send" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-mail-send__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
      <div class="ui-panel-tab">
        <component :is="PanelTabs" :list="tabList" />

        <div class="ui-panel-tab__content user-mail-send__content">
          <component :is="AppNavTab" :list="navList" />

          <ValidationProvider class="ui-field user-mail-send__field" tag="div" :rules="{ required: true }">
            <select class="ui-field__select user-mail-send__field__select" v-model="mail.Add_Category">
              <option value="" selected>{{ $t('user.mailSend.placeholder.categoryList') }}</option>
              <option :value="item.Value" v-for="item in categoryList" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </ValidationProvider>

          <ValidationProvider class="ui-field user-mail-send__field" tag="div" :rules="{ required: true }">
            <div class="ui-field__group">
              <label class="ui-field__group__label" for="user-mail-send-subject">{{ $t('ui.label.subject') }}</label>
              <input
                class="ui-field__group__input"
                id="user-mail-send-subject"
                type="text"
                v-model="mail.Add_Subject"
              />
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
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinUserMailSend from '@/mixins/userMailSend';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserMailSend',
  mixins: [mixinUserMailSend],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
  },
  data() {
    return {
      tabList: [
        {
          route: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
        {
          route: 'News',
          text: 'news.title',
          otherActiveRoute: [],
        },
        // {
        //   route: 'About',
        //   text: 'about.title',
        //   otherActiveRoute: [],
        // },
      ],

      navList: [
        {
          name: 'UserMail',
          text: 'user.mail.nav.inbox',
          link: 'UserMail',
          class: '',
          otherActiveRoute: [],
        },
        {
          name: 'UserMailSend',
          text: 'user.mail.nav.add',
          link: 'UserMailSend',
          class: '',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
      ],
    };
  },
  mounted() {
    this.$store.commit('setPageTitle', 'user.mailSend.title');
  },
};
</script>
