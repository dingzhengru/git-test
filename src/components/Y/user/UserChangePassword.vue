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
import { mapGetters } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';
import { apiChangePassword, apiChangeRemember } from '@/api/user';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'UserChangePassword',
  components: {
    ToggleButton,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['userIsEnableRememberOption']),
  },
  data() {
    return {
      passwordOld: '',
      passwordNew: '',
      passwordCheck: '',
      isRememberPassword: false,
      noticeList: [
        'user.changePassword.notice.suggest',
        'user.changePassword.notice.rule',
        'user.changePassword.notice.contact',
      ],
    };
  },
  methods: {
    async submitChangePassword() {
      const requestData = {
        Add_OldPassword: this.passwordOld,
        Add_NewPassword: this.passwordNew,
        Add_PasswordCheck: this.passwordCheck,
      };

      const result = await apiChangePassword(requestData);

      if (result.Code == 200) {
        window.alert(this.$t('alert.changeProfileSuccess'));
        this.resetForm();
      }
    },
    async changeRemember() {
      const requestData = { ReMember: this.isRememberPassword };
      const result = await apiChangeRemember(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setIsEnableRememberOption', this.isRememberPassword);
        window.alert(this.$t('alert.changeProfileSuccess'));
      }
    },
    resetForm() {
      this.passwordOld = '';
      this.passwordNew = '';
      this.passwordCheck = '';
    },
  },
  mounted() {
    //* 設置記憶密碼
    this.isRememberPassword = this.userIsEnableRememberOption;
  },
};
</script>
