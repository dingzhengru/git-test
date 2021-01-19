<template>
  <div class="user-profile">
    <div class="user-profile__table-div theme-content-box">
      <table class="ui-table02">
        <tr>
          <th>{{ $t('user.profile.notAccessed.username') }}</th>
          <td>{{ userAccount }}</td>
        </tr>
        <tr>
          <th>{{ $t('user.profile.notAccessed.currency') }}</th>
          <td>{{ userCurrency }}</td>
        </tr>
        <tr>
          <th>{{ $t('user.profile.notAccessed.createdDatetime') }}</th>
          <td>{{ userCreatedDatetime }}</td>
        </tr>
      </table>
    </div>

    <div class="user-profile__button-div" v-if="!isShowRegisterForm">
      <button
        class="user-profile__button--instant ui-btn ui-btn--long"
        type="button"
        @click.prevent="isShowRegisterForm = true"
      >
        {{ $t('user.profile.notAccessed.button.access') }}
      </button>
    </div>

    <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="div" v-show="isShowRegisterForm">
      <form
        class="user-profile__instant-access-form theme-content-box"
        id="instantAccessForm"
        @submit.prevent="handleSubmit(instantAccess(invalid))"
      >
        <ValidationProvider
          v-slot="{ errors, invalid }"
          tag="div"
          class="user-profile__instant-access-form__field theme-input-box"
          :class="[field.class]"
          :name="field.name"
          :rules="field.rules"
          v-for="field in fieldList"
          :key="field.name"
          v-show="field.isShow"
        >
          <span class="user-profile__instant-access-form__field__title theme-input-header">
            {{ field.type != 'select' ? $t(`register.${field.name}.placeholder`) : $t(`register.${field.name}.title`) }}
          </span>
          <input
            class="user-profile__instant-access-form__field__input ui-ipt"
            :type="field.type"
            :placeholder="$t(`register.${field.name}.placeholder`)"
            :disabled="!field.isModifiable"
            :min="field.min"
            :max="field.max"
            v-model="field.value"
            @change="
              $emit(
                'change-register-field',
                field,
                fieldList,
                invalid,
                originalRegisterFieldList.find(item => item.name == field.name)
              )
            "
            v-if="field.type != 'select'"
          />

          <select
            class="ui-ddl"
            :class="{ 'register__form__field__select--default': field.value == '' }"
            :id="$idMapper.register.input[field.name]"
            v-model="field.value"
            v-else
          >
            <option :value="bank.Value" v-for="bank in bankList" :key="bank.Value">{{ bank.Text }}</option>
          </select>

          <div class="theme-errorMsg" v-if="errors.length > 0 && errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </form>
      <div class="user-profile__button-div">
        <button
          class="user-profile__button--instant ui-btn ui-btn--long"
          type="submit"
          form="instantAccessForm"
          :disabled="invalid"
        >
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </ValidationObserver>
    <ol class="user-profile__notice ui-ol-memberNotice">
      <li v-for="(notice, index) in noticeList" :key="index">{{ $t(notice) }}</li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { registerFieldList } from '@/utils/register';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: 'UserProfileList',
  props: {
    registerList: {
      type: Array,
      default: () => [],
    },
    bankList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['userAccount', 'userCurrency', 'userCreatedDatetime']),
  },
  data() {
    return {
      fieldList: registerFieldList,
      originalRegisterFieldList: [], //* 存取原本欄位的值
      isShowRegisterForm: false,
      noticeList: [
        'user.profile.notAccessed.notice.access',
        'user.profile.notAccessed.notice.suggest',
        'user.profile.notAccessed.notice.contact',
      ],
    };
  },
  methods: {
    instantAccess(invalid) {
      if (invalid) {
        return;
      }

      const requestData = {};
      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      this.$emit('instantAccess', requestData);
    },
  },
  watch: {
    registerList() {
      for (const registerField of this.registerList) {
        const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          field.isShow = registerField.Lst_Phase != 0;
          field.isModifiable = registerField.Lst_isModifiable || registerField.Lst_Phase == 2;
          field.isOnly = registerField.Lst_isOnly;
          field.isRequired = registerField.Lst_isRequired;
          field.rules['register-required'] = registerField.Lst_isRequired;
          field.value = registerField.Lst_Value;
        }
      }

      this.originalRegisterFieldList = JSON.parse(JSON.stringify(this.fieldList));
    },
  },
};
</script>
