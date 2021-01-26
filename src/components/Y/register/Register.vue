<template>
  <div class="register">
    <ValidationObserver v-slot="{ invalid, handleSubmit, reset }" tag="div">
      <form class="register__form" @submit.prevent="handleSubmit(submitRegister)" @reset.prevent="reset">
        <ValidationProvider
          v-slot="{ errors, invalid }"
          tag="div"
          class="register__form__field"
          :class="[field.class]"
          :name="field.name"
          :rules="field.rules"
          v-for="field in fieldList"
          :key="field.name"
          v-show="field.isShow"
        >
          <div class="register__form__field__input-block">
            <span class="register__form__field__star" v-if="field.isRequired">*</span>
            <input
              class="register__form__field__input"
              :id="$idMapper.register.input[field.name]"
              :type="field.type"
              :placeholder="$t(`register.${field.name}.placeholder`)"
              :disabled="!field.isModifiable"
              :min="field.min"
              :max="field.max"
              v-model="field.value"
              @change="changeField(field, invalid)"
              v-if="field.type != 'select'"
            />

            <select
              class="register__form__field__select"
              :class="{ 'register__form__field__select--default': field.value == '' }"
              :id="$idMapper.register.input[field.name]"
              v-model="field.value"
              v-else
            >
              <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
            </select>

            <img
              v-if="field.name == 'CaptchaValue' && captchaImage.ImgBase64 != ''"
              class="register__form__field__image--code"
              :id="$idMapper.register.image.captcha"
              :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
              :width="captchaImage.Width"
              :height="captchaImage.Height"
              border="0"
              @click="changeCaptcha"
            />
          </div>

          <div class="register__form__field__hint" v-if="$te(`register.${field.name}.hint`)">
            <template v-if="field.name == 'Add_RelatedAccount' && !field.isModifiable">
              {{ $t(`register.${field.name}.hintHasValue`, { proxyCode: field.value }) }}
              <br />
            </template>

            {{ $t(`register.${field.name}.hint`) }}
          </div>

          <div class="theme-errorMsg" v-if="errors.length > 0 && errors[0]">
            <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <div class="register__button-div">
          <button class="register__button-div__submit ui-btn" type="submit" :disabled="invalid">
            {{ $t('ui.button.submit') }}
          </button>
          <button class="register__button-div__reset ui-btn" type="reset" @click="resetForm">
            {{ $t('ui.button.reset') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
    <div class="register__notice">
      <ol class="register__notice__ol">
        <li class="register__notice__ol__li" v-for="(item, index) in noticeList" :key="index" v-html="$t(item)"></li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { apiGetCaptcha } from '@/api/captcha';
import { apiGetRegisterFieldList, apiCheckRegisterFieldExist } from '@/api/register';

import { registerFieldList } from '@/utils/register';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Register',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userToken', 'userPublicKey']),
    fullName() {
      let fullName = '';
      const firstName = this.fieldList.find(item => item.name == 'Add_FirstName').value;
      const lastName = this.fieldList.find(item => item.name == 'Add_LastName').value;

      if (this.lang == 'zh-cn') {
        fullName = `${lastName}${firstName}`.trim();
      } else {
        fullName = `${firstName} ${lastName}`.trim();
      }

      return fullName;
    },
  },
  data() {
    return {
      fieldList: [...registerFieldList],
      noticeList: ['register.notice.required', 'register.notice.recommend', 'register.notice.contact'],
      bankList: [],
      captchaImage: {
        Width: 147,
        Height: 58,
        ImgBase64: '',
      },
      error: '',
    };
  },
  methods: {
    async changeCaptcha() {
      const requestDataCaptcha = { pageCode: 'MemberRegister' };
      const result = await apiGetCaptcha(requestDataCaptcha);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        const captcha = this.fieldList.find(item => item.name == 'CaptchaValue');
        captcha.value = '';
      }
    },
    resetForm() {
      for (const field of this.fieldList) {
        field.value = '';
      }
    },
    async submitRegister() {
      const requestData = {};

      for (const field of this.fieldList) {
        if (field.value && field.isShow) {
          requestData[field.name] = field.value;
        }
      }

      const result = await this.$store.dispatch('user/register', requestData);

      if (result.Code == 500) {
        this.error = result.ErrMsg;
      } else if (result.Code == 502 || result.Code == 615) {
        //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
        //* 615: JsonError，推測是公鑰與私鑰沒對上，已於攔截器上換新的公鑰
        //* 重新送出請求 (現在放在攔截器)
        // this.submitRegister();
      }
    },
    async changeField(field, invalid) {
      //* 即時驗證欄位資料是否通過
      if (invalid) {
        return;
      }
      if (field.name == 'Add_RelatedAccount' && field.value) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          window.alert(this.$t('register.Add_RelatedAccount.invalid'));
        }
      } else if (field.name == 'Add_FirstName' || field.name == 'Add_LastName') {
        const firstNameField = this.fieldList.find(item => item.name == 'Add_FirstName');
        const lastNameField = this.fieldList.find(item => item.name == 'Add_LastName');
        //* 姓跟名都有填的時候才檢查
        if (!(firstNameField.value && lastNameField.value)) {
          return;
        }
        const requestData = { field: 'Add_RealName', strValue: this.fullName };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          window.alert(this.$t('register.Add_RealName.invalid'));
        }
      } else if (field.isOnly == true && field.value) {
        const requestData = { field: field.name, strValue: field.value };
        const result = await apiCheckRegisterFieldExist(requestData);
        if (result == false) {
          field.value = '';
          window.alert(this.$t(`register.${field.name}.invalid`));
        }
      }
    },
  },
  async mounted() {
    import(`@/styles/${this.siteFullCss}/register.scss`);

    //* 取得公鑰 & token
    if (!this.userToken || !this.userPublicKey) {
      await this.$store.dispatch('user/getTokenAndPublicKey');
    }

    apiGetRegisterFieldList().then(result => {
      this.bankList = result.RetObj.Add_BankList;

      for (const registerField of result.RetObj.Register) {
        const field = this.fieldList.find(item => item.name == registerField.Lst_Field);

        if (field) {
          // field.value = registerField.Lst_Value;
          field.isShow = registerField.Lst_Phase == 1;
          field.isOnly = registerField.Lst_isOnly;
          field.isRequired = registerField.Lst_isRequired;
          field.rules['register-required'] = registerField.Lst_isRequired;

          //* 目前只有 Add_RelatedAccount 有可能需要賦予值
          if (field.name == 'Add_RelatedAccount') {
            field.value = registerField.Lst_Value;
          }

          //* Add_RealName 是不可修改
          //* 推薦人若已有值，就也不能修改
          if (field.name == 'Add_RealName') {
            field.isModifiable = false;
          } else if (field.name == 'Add_RelatedAccount' && field.value) {
            field.isModifiable = false;
          } else {
            field.isModifiable = true;
          }
        }
      }
    });

    this.changeCaptcha();
  },
  watch: {
    fullName() {
      const realName = this.fieldList.find(item => item.name == 'Add_RealName');
      realName.value = this.fullName;
    },
  },
};
</script>
