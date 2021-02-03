<template>
  <div class="user-change-password">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form
        class="theme-content-box user-change-password__form"
        id="user-change-passowrd-form"
        @submit.prevent="handleSubmit(submitChangePassword)"
      >
        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
          :rules="{
            'change-password-required': true,
            'change-password-min': 6,
            'change-password-max': 30,
            'change-password-regex': '^[a-zA-Z0-9]*$',
          }"
          name="Add_OldPassword"
          v-slot="{ errors }"
        >
          <span class="theme-input-header">{{ $t('user.changePassword.passwordOld') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordOld" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
          :rules="{
            'change-password-required': true,
            'change-password-min': 6,
            'change-password-max': 30,
            'change-password-regex': '^[a-zA-Z0-9]*$',
          }"
          name="Add_NewPassword"
          v-slot="{ errors }"
        >
          <span class="theme-input-header">{{ $t('user.changePassword.passwordNew') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordNew" autocomplete="off" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="user-change-password__form__field theme-input-box"
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
          <span class="theme-input-header">{{ $t('user.changePassword.passwordCheck') }}</span>
          <input class="ui-ipt" type="password" v-model="passwordCheck" autocomplete="off" />
          <div class="theme-errorMsg" v-if="errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="user-change-password__form__field theme-input-box">
          <span class="theme-input-header">{{ $t('user.changePassword.passwordRemember') }}</span>
          <toggle-button
            v-model="isRememberPassword"
            :width="640"
            :height="80"
            :sync="true"
            :margin="0"
            :color="{ checked: 'purple', unchecked: 'gray' }"
            :labels="{
              checked: $t('user.changePassword.switch.on'),
              unchecked: $t('user.changePassword.switch.off'),
            }"
            :font-size="40"
            @change="changeRemember"
          />
        </div>
      </form>
      <div class="user-change-password__button-div">
        <button
          class="user-change-password__button--submit ui-btn ui-btn--long"
          type="submit"
          form="user-change-passowrd-form"
          :disabled="invalid"
        >
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </ValidationObserver>
    <ol class="ui-ol-memberNotice">
      <li v-for="item in noticeList" :key="item">
        {{ $t(item) }}
      </li>
    </ol>
  </div>
</template>

<script>
import mixinUserChangePassword from '@/mixins/userChangePassword';
import { ToggleButton } from 'vue-js-toggle-button';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserChangePassword',
  mixins: [mixinUserChangePassword],
  components: {
    ToggleButton,
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
