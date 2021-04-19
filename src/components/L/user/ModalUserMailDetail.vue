<template>
  <AppModal :isShow="isShow" @close="closeModal">
    <div class="user-mail-detail">
      <div class="ui-box-close" @click="closeModal"></div>

      <ValidationObserver tag="div" class="user-mail-detail__container" v-slot="{ invalid, handleSubmit, reset }">
        <form class="user-mail-detail__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
          <table class="ui-table user-mail-detail__table">
            <tr>
              <th colspan="2">主旨</th>
            </tr>
            <tr v-for="(item, index) in list" :key="String(index) + String(item.Lst_Key)">
              <td>
                <div>
                  <span>{{ $t('user.mailDetail.label.sender') }}: </span>
                  <span>{{ item.Lst_OwnAccount }}</span>
                </div>
                <div>
                  <span>{{ $t('user.mailDetail.label.date') }}: </span>
                  <span>{{ item.Lst_SendTime_Date }}</span>
                </div>
                <div>
                  <span>{{ $t('user.mailDetail.label.time') }}: </span>
                  <span>{{ getTime(item.Lst_SendTime) }}</span>
                </div>
                <div>
                  <span>{{ $t('user.mailDetail.label.category') }}: </span>
                  <span>{{ item.Lst_CategoryName }}</span>
                </div>
              </td>
              <td v-html="item.Lst_Content"></td>
            </tr>
            <tr>
              <th colspan="2" class="mailDetail__titleReply">{{ $t('user.mailDetail.label.reply') }}</th>
            </tr>
            <tr>
              <td>
                <div>
                  <span>{{ $t('ui.label.account') }}: </span>
                  <span>{{ userAccount }}</span>
                </div>
              </td>
              <td>
                <ValidationProvider :rules="{ required: true }">
                  <textarea id="user-mail-detail-content" cols="30" rows="7" v-model="mail.Add_Content"></textarea>
                </ValidationProvider>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button type="submit" :disabled="invalid">{{ $t('ui.button.send') }}</button>
                <button type="reset" @click="resetForm">{{ $t('ui.button.cancel') }}</button>
              </td>
            </tr>
          </table>
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
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn', 'userAccount']),
    getDatetime: () => datetime => {
      return datetime.replace('T', ' ');
    },
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
