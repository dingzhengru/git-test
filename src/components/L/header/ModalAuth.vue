<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="modal-auth">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <div class="modal-auth__nav">
        <div class="modal-auth__nav__item" :class="{ active: type === 'login' }" @click="type = 'login'">
          {{ $t('ui.button.login') }}
        </div>
        <div class="modal-auth__nav__item" :class="{ active: type === 'register' }" @click="type = 'register'">
          {{ $t('ui.button.register') }}
        </div>
      </div>

      <component :is="ModalLogin" v-show="type === 'login'" />
      <component :is="ModalRegister" v-show="type === 'register'" />
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinLang from '@/mixins/lang';

export default {
  name: 'ModalLangMenu',
  mixins: [mixinLang],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
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
};
</script>
