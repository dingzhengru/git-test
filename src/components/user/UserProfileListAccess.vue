<template>
  <div class="user-profile-access">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <div class="user-profile-access__main theme-content-box">
        <ul class="user-profile-access__main__ul theme-ul-dataView">
          <li class="theme-li-dataView" v-for="(value, key) in profile" :key="key">
            <span class="theme-dataView-header">{{ $t(`user.profile.accessed.${key}`) }}</span>
            <p class="theme-dataView-data">{{ value }}</p>
          </li>

          <!-- <li class="theme-li-dataView" v-for="item in list" :key="item.title">
          <span class="theme-dataView-header">{{ $t(`user.profile.accessed.${item.name}`) }}</span>
          <p class="theme-dataView-data">{{ item.content }}</p>
        </li> -->
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

<style lang="scss" scoped>
.user-profile-access {
  &__main {
    margin: 40px 0;

    &__ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  }
  &__button-div {
    margin: 40px 0;
    text-align: center;
  }
}
</style>
