<template>
  <ValidationObserver class="user-change-password" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form
      class="user-change-password__form"
      @submit.prevent="handleSubmit(submitChangePassword)"
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

      <div class="ui-field user-change-password__field user-change-password__field--remember">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('user.changePassword.passwordRemember') }}
          </label>
          <toggle-button
            v-model="isRememberPassword"
            :width="300"
            :height="70"
            :font-size="32"
            :sync="true"
            :margin="0"
            :switch-color="'linear-gradient(to bottom, #545252 0%, #eee 100%)'"
            :color="{
              checked: '#b99961',
              unchecked: '#999999',
            }"
            :labels="{
              checked: $t('user.changePassword.switch.on'),
              unchecked: $t('user.changePassword.switch.off'),
            }"
            @change="changeRemember"
          />
        </div>
      </div>
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
