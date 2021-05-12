<template>
  <AppModal @close="closeModal">
    <div class="ui-modal user-mail-detail">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__title">{{ mail.Add_Subject }}</div>
      <ValidationObserver
        tag="div"
        class="ui-modal__content user-mail-detail__container"
        v-slot="{ invalid, handleSubmit, reset }"
      >
        <form class="user-mail-detail__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
          <div class="user-mail-detail__list ui-scrollbar">
            <div
              class="user-mail-detail__list__item"
              v-for="(item, index) in list"
              :key="String(index) + String(item.Lst_Key)"
            >
              <div class="user-mail-detail__list__item__info">
                <div>{{ $t('user.mailDetail.label.sender') }}: {{ item.Lst_OwnAccount }}</div>
                <div>{{ $t('user.mailDetail.label.date') }}: {{ $dayjs(item.Lst_SendTime).format('YYYY-MM-DD') }}</div>
                <div>{{ $t('user.mailDetail.label.time') }}: {{ $dayjs(item.Lst_SendTime).format('HH:mm:ss') }}</div>
                <div>{{ $t('user.mailDetail.label.category') }}: {{ item.Lst_CategoryName }}</div>
              </div>
              <div class="user-mail-detail__list__item__content" v-html="item.Lst_Content"></div>
            </div>
          </div>

          <div class="user-mail-detail__reply-title">{{ $t('user.mailDetail.label.reply') }}</div>
          <div class="user-mail-detail__reply">
            <ValidationProvider class="ui-field column" tag="div" :rules="{ required: true }">
              <label>{{ $t('ui.label.account') }}: {{ userAccount }}</label>
              <textarea id="user-mail-detail-content" cols="30" rows="3" v-model="mail.Add_Content"></textarea>
            </ValidationProvider>

            <div class="user-mail-detail__reply__btn">
              <button class="ui-btn ui-btn--lg" type="reset" @click="resetForm">{{ $t('ui.button.cancel') }}</button>
              <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">{{ $t('ui.button.send') }}</button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinUserMailDetail from '@/mixins/userMailDetail';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalUserMailDetail',
  mixins: [mixinStyleLoader, mixinUserMailDetail],
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn', 'userAccount']),
    getTime: () => time => {
      return time.split('T')[1];
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
