<template>
  <AppModal @close="closeModal">
    <div class="user-change-password">
      <div class="ui-box-close" @click="closeModal"></div>
      <!-- <ValidationObserver tag="div" class="user-mail-detail__container" v-slot="{ invalid, handleSubmit, reset }">
        <form class="user-mail-detail__form" @submit.prevent="handleSubmit(submitMail)" @reset.prevent="reset">
          
        </form>
      </ValidationObserver> -->
    </div>
  </AppModal>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinUserMailDetail from '@/mixins/userMailDetail';
import { mapGetters } from 'vuex';
// import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalUserChangePassword',
  mixins: [mixinStyleLoader, mixinUserMailDetail],
  components: {
    AppModal: () => import('@/components/AppModal'),
    // ValidationObserver,
    // ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteName', 'siteFullCss', 'userIsLoggedIn', 'userAccount']),
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
