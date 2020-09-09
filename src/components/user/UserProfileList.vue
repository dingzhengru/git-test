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
    <form class="instant-access__form theme-content-box" id="instant-access-form" v-if="isShowRegisterList">
      <div class="instant-access__form__field theme-input-box" v-for="field in registerFieldList" :key="field.name">
        <template v-if="field.isShow">
          <span class="instant-access__form__field__title theme-input-header">
            {{ field.type != 'select' ? $t(`register.${field.name}.placeholder`) : $t(`register.${field.name}.title`) }}
          </span>
          <input
            v-if="field.type != 'select'"
            class="instant-access__form__field__input ui-ipt"
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
import dayjs from 'dayjs';
import { validateField } from '@/utils/register';

export default {
  name: 'UserProfileList',
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
    profileList: {
      type: Array,
      default: () => [],
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
      registerFieldList: [
        {
          name: 'Add_RelatedAccount',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 30,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Account',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 3,
          maxlength: 15,
          regex: '^[a-zA-Z]{1}[a-zA-Z0-9]*$', //* 英文字母開頭、英數字、長度: 3~15
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_PasswordCheck',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$', //* 英數字、長度: 6~20
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Mobile',
          type: 'tel',
          error: '',
          isRequired: false,
          minlength: 5,
          maxlength: 20,
          regex: '^[0-9]*$', //* 英數字、長度: 5~20
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Email',
          type: 'email',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 50,
          regex: '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', //* email regex，需有 @ 與後面要有 .
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Line',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 50,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Skype',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 12,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_QQ',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 20,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_FirstName',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_LastName',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_RealName',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z]+$|^[\u4e00-\u9fa5\uF900-\uFA2D]+$|^[\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_NickName',
          type: 'text',
          error: '',
          isRequired: false,
          maxlength: 30,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Birthday',
          type: 'date',
          error: '',
          isRequired: false,
          min: '1900-01-01',
          max: dayjs()
            .subtract(18, 'year')
            .format('YYYY-MM-DD'),
          regex: '^[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankId1',
          type: 'select',
          error: '',
          isRequired: false,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankBranchName1',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankAccount1',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          regex: '^[0-9]+[0-9]*$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankId2',
          type: 'select',
          error: '',
          isRequired: false,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankBranchName2',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankAccount2',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          regex: '^[0-9]+[0-9]*$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankId3',
          type: 'select',
          error: '',
          isRequired: false,
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankBranchName3',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 70,
          regex: '^[A-Za-z0-9\u4E00-\u9FA5\uF900-\uFA2D\u0e00-\u0e5b]+$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_BankAccount3',
          type: 'text',
          error: '',
          isRequired: false,
          minlength: 1,
          maxlength: 30,
          regex: '^[0-9]+[0-9]*$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Withdrawals_Password',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
        {
          name: 'Add_Withdrawals_CheckPassword',
          type: 'password',
          error: '',
          isRequired: false,
          minlength: 6,
          maxlength: 30,
          regex: '^[a-zA-Z0-9]*$',
          value: '',
          isShow: false,
          isModifiable: false,
        },
      ],
      isShowRegisterList: false,
      noticeList: ['access', 'suggest', 'contact'],
    };
  },
  methods: {
    instantAccess() {
      console.log('instantAccess');
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
      console.log('[ValidateForm]');
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
          field.isShow = registerField.Lst_Phase == 2;
          field.isRequired = registerField.Lst_isRequired;
          field.isModifiable = registerField.Lst_isModifiable;
          field.value = registerField.Lst_Value;
        }
      }
    },
  },
};
</script>

<style scoped>
.user-profile__table-div {
  margin: 40px 0;
}
.user-profile__button-div {
  margin: 40px 0;
  text-align: center;
}

.instant-access__form {
  padding: 3%;
}

.instant-access__form__field {
  margin: 20px 0;
}

.instant-access__form__field input:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
