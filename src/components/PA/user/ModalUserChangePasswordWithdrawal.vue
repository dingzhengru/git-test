<template>
  <AppModal @close="closeModal">
    <div class="ui-modal user-change-password">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__title">{{ $t('user.nav.changePasswordWithdrawal') }}</div>
      <ValidationObserver
        tag="div"
        class="ui-modal__content user-change-password__container"
        ref="validationObserver"
        v-slot="{ invalid, handleSubmit }"
      >
        <form class="user-change-password__form" @submit.prevent="handleSubmit(submitChangeWithdrawPassword)">
          <ValidationProvider
            class="ui-field user-change-password__field"
            tag="div"
            :rules="{
              'change-password-required': false,
              'change-password-min': 6,
              'change-password-max': 30,
              'change-password-regex': '^[a-zA-Z0-9]*$',
            }"
            name="Add_OldPassword"
            v-slot="{ errors }"
          >
            <input
              class="ui-field__group__input"
              type="password"
              v-model="passwordOld"
              :placeholder="$t('user.changePassword.passwordOld')"
            />
            <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>

          <ValidationProvider
            tag="div"
            class="ui-field user-change-password__field"
            :rules="{
              'change-password-required': true,
              'change-password-min': 6,
              'change-password-max': 30,
              'change-password-regex': '^[a-zA-Z0-9]*$',
            }"
            name="Add_NewPassword"
            v-slot="{ errors }"
          >
            <input
              class="ui-field__group__input"
              type="password"
              v-model="passwordNew"
              :placeholder="$t('user.changePassword.passwordNew')"
              autocomplete="off"
            />
            <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>

          <ValidationProvider
            tag="div"
            class="ui-field user-change-password__field"
            :rules="{
              'change-password-required': true,
              'change-password-confirmed': 'Add_NewPassword',
              'change-password-min': 6,
              'change-password-max': 30,
              'change-password-regex': '^[a-zA-Z0-9]*$',
            }"
            name="Add_PasswordCheck"
            v-slot="{ errors }"
          >
            <input
              class="ui-field__group__input"
              type="password"
              v-model="passwordCheck"
              :placeholder="$t('user.changePassword.passwordCheck')"
              autocomplete="off"
            />
            <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>

          <div class="user-change-password__btn">
            <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">
              {{ $t('ui.button.submit') }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import mixinUserChangePasswordWithdrawal from '@/mixins/userChangePasswordWithdrawal';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalUserChangePassword',
  mixins: [mixinUserChangePasswordWithdrawal],
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
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
