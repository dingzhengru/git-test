<template>
  <ValidationObserver class="user-change-password" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form
      class="user-change-password__form"
      @submit.prevent="handleSubmit(submitChangeWithdrawPassword)"
      @reset.prevent="reset"
    >
      <ValidationProvider
        class="ui-field user-change-password__field"
        tag="div"
        :rules="{
          'change-password-required': true,
          'change-password-min': 6,
          'change-password-max': 30,
          'change-password-regex': '^[a-zA-Z0-9]*$',
        }"
        name="Add_OldPassword"
        v-slot="{ errors }"
      >
        <div class="ui-field__star">*</div>
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('user.changePassword.passwordOld') }}
          </label>
          <input class="ui-field__group__input" type="password" v-model="passwordOld" />
        </div>
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
        <div class="ui-field__star">*</div>
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('user.changePassword.passwordNew') }}
          </label>
          <input class="ui-field__group__input" type="password" v-model="passwordNew" autocomplete="off" />
        </div>
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
        <div class="ui-field__star">*</div>
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('user.changePassword.passwordCheck') }}
          </label>
          <input class="ui-field__group__input" type="password" v-model="passwordCheck" autocomplete="off" />
        </div>
        <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
          {{ errors[0] }}
        </div>
      </ValidationProvider>
      <div class="ui-notice user-change-password__notice">
        <ol>
          <li v-for="(item, index) in noticeList" :key="index" v-html="$t(item)"></li>
        </ol>
      </div>
      <div class="user-change-password__btn">
        <button class="user-change-password__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="user-change-password__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { apiChangePasswordWithdrawal } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserChangePassword',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      noticeList: ['user.changePasswordWithdrawal.notice.first'],
    };
  },
  methods: {
    async submitChangeWithdrawPassword() {
      const requestData = {
        OldPassword: this.passwordOld,
        Password: this.passwordNew,
        CheckPassword: this.passwordCheck,
      };

      const result = await apiChangePasswordWithdrawal(requestData);

      if (result.Code == 200) {
        window.alert(this.$t('alert.changeProfileSuccess'));
        this.resetForm();
      }
    },
    resetForm() {
      this.passwordOld = '';
      this.passwordNew = '';
      this.passwordCheck = '';
    },
  },
};
</script>
