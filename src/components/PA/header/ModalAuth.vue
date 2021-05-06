<template>
  <AppModal @close="closeModal">
    <div class="ui-modal modal-auth">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__nav modal-auth__nav">
        <div class="modal-auth__nav__item" :class="{ active: type === 'login' }" @click="type = 'login'">
          {{ $t('ui.button.login') }}
        </div>
        <div class="modal-auth__nav__item" :class="{ active: type === 'register' }" @click="type = 'register'">
          {{ $t('ui.button.register') }}
        </div>
      </div>

      <div class="ui-modal__content modal-auth__main">
        <component :is="ModalLogin" v-show="type === 'login'" />
        <component :is="ModalRegister" v-show="type === 'register'" />
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinLang from '@/mixins/lang';

export default {
  name: 'ModalLangMenu',
  mixins: [mixinLang],
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteSetting']),
    ModalLogin() {
      return () => import(`@/${this.siteSetting.components.header.ModalLogin}`);
    },
    ModalRegister() {
      return () => import(`@/${this.siteSetting.components.header.ModalRegister}`);
    },
  },
  data() {
    return {
      type: 'login',
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');

      window.setTimeout(() => {
        this.type = 'login';
      }, 500);
    },
  },
};
</script>
