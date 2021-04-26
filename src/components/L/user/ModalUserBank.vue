<template>
  <AppModal @close="closeModal">
    <div class="user-bank">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="user-bank__container">
        <div class="user-bank__field">
          <label for="">{{ $t('ui.label.bankName') }}</label>
          <select name="" id=""></select>
        </div>
        <div class="user-bank__field">
          <label for="">{{ $t('ui.label.bankName') }}</label>
          <input type="text" />
        </div>

        <div class="user-bank__btn">
          <button>{{ $t('ui.button.save') }}</button>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import mixinUserChangePassword from '@/mixins/userChangePassword';
import { mapGetters } from 'vuex';
// import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalUserBank',
  mixins: [mixinUserChangePassword],
  components: {
    AppModal: () => import('@/components/AppModal'),
    // ValidationObserver,
    // ValidationProvider,
  },
  props: {
    bankId: {
      type: Object,
      default: () => {
        return { name: '', value: '' };
      },
    },
    bankAccount: {
      type: Object,
      default: () => {
        return { name: '', value: '' };
      },
    },
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
