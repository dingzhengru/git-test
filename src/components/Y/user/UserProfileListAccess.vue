<template>
  <div class="user-profile-access">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <div class="user-profile-access__main theme-content-box">
        <ul class="user-profile-access__main__ul theme-ul-dataView">
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.username`) }}</span>
            <p class="theme-dataView-data">{{ userAccount }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.currency`) }}</span>
            <p class="theme-dataView-data">{{ userCurrency }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.createdDatetime`) }}</span>
            <p class="theme-dataView-data">{{ userCreatedDatetime.replace('T', ' ') }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.realName`) }}</span>
            <p class="theme-dataView-data">{{ userRealName }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.email`) }}</span>
            <p class="theme-dataView-data">{{ userEmail }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.birthday`) }}</span>
            <p class="theme-dataView-data">{{ userBirthday.split('T')[0] }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.bankName1`) }}</span>
            <p class="theme-dataView-data">{{ userBankName1 }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.bankAccount1`) }}</span>
            <p class="theme-dataView-data">{{ userBankAccount1 }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.bankBrach1`) }}</span>
            <p class="theme-dataView-data">{{ userBankBrach1 }}</p>
          </li>
          <li class="theme-li-dataView">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.bankAccountName1`) }}</span>
            <p class="theme-dataView-data">{{ userBankAccountName1 }}</p>
          </li>
          <form
            class="user-profile-access__main__form"
            id="formPasswordChange"
            @submit.prevent="handleSubmit(submitChangeWithdrawPassword)"
          >
            <ValidationProvider
              tag="li"
              class="theme-li-dataView"
              name="OldPassword"
              :rules="{
                'change-withdraw-password-required': true,
                'change-withdraw-password-min': 6,
                'change-withdraw-password-max': 30,
                'change-withdraw-password-regex': '^[a-zA-Z0-9]*$',
              }"
              v-slot="{ errors }"
            >
              <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordOld') }}</span>
              <input class="ui-ipt" type="password" v-model="OldPassword" />
              <div class="theme-errorMsg" v-if="errors[0]">
                <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              tag="li"
              class="theme-li-dataView"
              name="Password"
              :rules="{
                'change-withdraw-password-required': true,
                'change-withdraw-password-min': 6,
                'change-withdraw-password-max': 30,
                'change-withdraw-password-regex': '^[a-zA-Z0-9]*$',
              }"
              v-slot="{ errors }"
            >
              <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordNew') }}</span>
              <input class="ui-ipt" type="password" v-model="Password" />
              <div class="theme-errorMsg" v-if="errors[0]">
                <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
            <ValidationProvider
              tag="li"
              class="theme-li-dataView"
              name="CheckPassword"
              :rules="{
                'change-withdraw-password-required': true,
                'change-withdraw-password-confirmed': 'Password',
                'change-withdraw-password-min': 6,
                'change-withdraw-password-max': 30,
                'change-withdraw-password-regex': '^[a-zA-Z0-9]*$',
              }"
              v-slot="{ errors }"
            >
              <span class="theme-dataView-header">{{ $t('user.profile.accessed.withdrawalPasswordCheck') }}</span>
              <input class="ui-ipt" type="password" v-model="CheckPassword" />
              <div class="theme-errorMsg" v-if="errors[0]">
                <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </form>
        </ul>
      </div>
      <div class="theme-errorMsg" v-if="error">
        <span class="theme-txt-errorMsg">{{ error }}</span>
      </div>
      <div class="user-profile-access__button-div">
        <button
          type="submit"
          class="user-profile-access__button--submit ui-btn ui-btn--long"
          form="formPasswordChange"
          :disabled="invalid"
        >
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserProfileListAccess',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userCurrency',
      'userCreatedDatetime',
      'userRealName',
      'userEmail',
      'userBirthday',
      'userBankName1',
      'userBankAccount1',
      'userBankBrach1',
      'userBankAccountName1',
    ]),
  },
  data() {
    return {
      OldPassword: '',
      Password: '',
      CheckPassword: '',
      error: '',
    };
  },
  methods: {
    submitChangeWithdrawPassword() {
      const requestData = {
        OldPassword: this.OldPassword,
        Password: this.Password,
        CheckPassword: this.CheckPassword,
      };

      this.$emit('change-withdrawal-password', requestData);
      this.resetForm();
    },
    resetForm() {
      this.OldPassword = '';
      this.Password = '';
      this.CheckPassword = '';
      this.error = '';
    },
  },
};
</script>
