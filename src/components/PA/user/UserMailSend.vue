<template>
  <ValidationObserver class="user-mail-send" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-mail-send__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
      <div class="ui-panel-tab">
        <component :is="PanelTabs" :list="tabList" />

        <div class="ui-panel-tab__content user-mail-send__content">
          <div class="nav-tab">
            <div class="nav-tab__item">
              <img :src="imgMail" />
              <span>{{ $t('user.mail.nav.add') }}</span>
            </div>
          </div>

          <div class="user-mail-send__content__main">
            <ValidationProvider
              class="ui-field user-mail-send__field user-mail-send__field--category"
              tag="div"
              :rules="{ required: true }"
            >
              <select class="ui-field__select user-mail-send__field__select" v-model="mail.Add_Category">
                <option value="" selected>{{ $t('user.mailSend.placeholder.categoryList') }}</option>
                <option :value="item.Value" v-for="item in categoryList" :key="item.Value">
                  {{ item.Text }}
                </option>
              </select>
            </ValidationProvider>

            <ValidationProvider
              class="ui-field user-mail-send__field user-mail-send__field--subject"
              tag="div"
              :rules="{ required: true }"
            >
              <input
                class="ui-field__group__input"
                type="text"
                :placeholder="$t('user.mail.field.subject')"
                v-model="mail.Add_Subject"
              />
            </ValidationProvider>

            <ValidationProvider
              class="ui-field user-mail-send__field user-mail-send__field--content column"
              tag="div"
              :rules="{ required: true }"
            >
              <label for="user-mail-send-content">{{ $t('user.mailSend.label.desc') }}</label>
              <textarea id="user-mail-send-content" cols="30" rows="5" v-model="mail.Add_Content"></textarea>
            </ValidationProvider>

            <div class="user-mail-send__btn">
              <button class="ui-btn ui-btn--lg" type="reset" @click="resetForm">
                {{ $t('ui.button.reset') }}
              </button>
              <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">
                {{ $t('ui.button.send') }}
              </button>
            </div>
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
    imgMail() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-plus.png`);
      } catch {
        return '';
      }
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
    };
  },
  mounted() {
    this.$store.commit('setPageTitle', 'user.mailSend.title');
  },
};
</script>
