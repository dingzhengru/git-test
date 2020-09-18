<template>
  <div class="user-profile">
    <div class="user-profile__table-div theme-content-box">
      <table class="ui-table02">
        <tbody>
          <tr v-for="(value, key) in profile" :key="key">
            <th>{{ $t(`user.profile.notAccessed.${key}`) }}</th>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <form
      class="user-profile__instant-access-form theme-content-box"
      id="instant-access-form"
      v-if="isShowRegisterList"
    >
      <div
        class="user-profile__instant-access-form__field theme-input-box"
        v-for="field in registerFieldList"
        :key="field.name"
      >
        <template v-if="field.isShow">
          <span class="user-profile__instant-access-form__field__title theme-input-header">
            {{ field.type != 'select' ? $t(`register.${field.name}.placeholder`) : $t(`register.${field.name}.title`) }}
          </span>
          <input
            v-if="field.type != 'select'"
            class="user-profile__instant-access-form__field__input ui-ipt"
            :id="idMapper.register.input[field.name]"
            :type="field.type"
            :required="field.isRequired"
            :minlength="field.minlength"
            :maxlength="field.maxlength"
            :min="field.min"
            :max="field.max"
            :pattern="field.regex"
            v-model="field.value"
            @input="validateField(field)"
            :disabled="!field.isModifiable"
          />

          <select
            v-if="field.type == 'select'"
            class="ui-ddl"
            :id="idMapper.register.input[field.name]"
            v-model="field.value"
            @change="validateField(field)"
            :disabled="!field.isModifiable"
          >
            <option :value="bank.Value" :selected="bank.Selected" v-for="bank in bankList" :key="bank.Value">
              {{ bank.Text }}
            </option>
          </select>

          <div class="theme-errorMsg" v-if="field.error">
            <span class="theme-txt-errorMsg">{{ field.error }}</span>
          </div>
        </template>
      </div>
    </form>

    <div class="user-profile__button-div">
      <button class="user-profile__button--instant ui-btn ui-btn-long" type="button" @click.prevent="instantAccess">
        {{ isShowRegisterList ? $t('ui.button.submit') : $t('user.profile.notAccessed.button.access') }}
      </button>
    </div>
    <ol class="user-profile__notice ui-ol-memberNotice">
      <li v-for="(notice, index) in noticeList" :key="index">{{ $t(`user.profile.notAccessed.notice.${notice}`) }}</li>
    </ol>
  </div>
</template>

<script>
import idMapper from '@/idMapper';
import { registerFieldList, validateField } from '@/utils/register';

export default {
  name: 'UserProfileList',
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
    registerList: {
      type: Array,
      default: () => [],
    },
    bankList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      idMapper: idMapper,
      registerFieldList: registerFieldList,
      isShowRegisterList: false,
      noticeList: ['access', 'suggest', 'contact'],
    };
  },
  methods: {
    instantAccess() {
      if (!this.isShowRegisterList) {
        this.isShowRegisterList = true;
        return;
      }

      if (!this.validateForm()) {
        return;
      }

      const requestData = {};
      for (const field of this.registerFieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      this.$emit('instantAccess', requestData);
    },
    validateForm() {
      let invalidFieldList = [];
      for (const field of this.registerFieldList) {
        //* 檢查欄位自己的屬性(required, minlength, maxlength, min, max)
        const validateReulst = this.validateField(field);
        if (validateReulst != '') {
          invalidFieldList.push(field);
        }
      }
      console.log('[ValidateForm]', invalidFieldList);
      return invalidFieldList.length == 0;
    },
    validateField(field) {
      field.error = this.$t(validateField(field, this.registerFieldList));
      return field.error;
    },
  },
  watch: {
    registerList() {
      for (const registerField of this.registerList) {
        const field = this.registerFieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          field.isShow = registerField.Lst_Phase != 0;
          field.isRequired = registerField.Lst_isRequired;
          field.isModifiable = registerField.Lst_isModifiable || registerField.Lst_Phase == 2;
          field.value = registerField.Lst_Value;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  &__table-div {
    margin: 40px 0;
  }
  &__instant-access-form {
    padding: 3%;

    &__field {
      margin: 20px 0;

      input:disabled {
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }
  &__button-div {
    margin: 40px 0;
    text-align: center;
  }
}
</style>

<style scoped>
/* .user-profile__table-div {
  margin: 40px 0;
} */

/* .user-profile__button-div {
  margin: 40px 0;
  text-align: center;
} */

/* .user-profile__instant-access-form {
  padding: 3%;
} */

/* .user-profile__instant-access-form__field {
  margin: 20px 0;
} */

/* .user-profile__instant-access-form__field input:disabled {
  opacity: 0.6;
  pointer-events: none;
} */
</style>
