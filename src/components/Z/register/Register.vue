<template>
  <ValidationObserver class="register" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form class="register-form" @submit.prevent="handleSubmit(submitRegister)" @reset.prevent="reset">
      <ValidationProvider
        v-slot="{ errors, invalid }"
        tag="div"
        class="ui-field"
        :class="[field.class]"
        :name="field.name"
        :rules="field.rules"
        v-for="field in fieldList"
        :key="field.name"
        v-show="field.isShow"
      >
        <span class="ui-field__star" v-if="field.isRequired">*</span>

        <div class="ui-field__main" v-if="field.type != 'select'">
          <label class="ui-field__label">
            {{ $t(`register.${field.name}.placeholder`) }}
          </label>
          <input
            class="ui-field__input"
            :id="$idMapper.register.input[field.name]"
            :type="field.type"
            :placeholder="$t(`register.${field.name}.placeholder`)"
            :disabled="!field.isModifiable"
            :min="field.min"
            :max="field.max"
            v-model="field.value"
            @change="changeField(field, invalid)"
          />
        </div>

        <select
          class="ui-field__select"
          :id="$idMapper.register.input[field.name]"
          v-model="field.value"
          v-if="field.type == 'select'"
        >
          <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
        </select>

        <img
          class="ui-field__captcha"
          :id="$idMapper.register.image.captcha"
          :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
          :width="captchaImage.Width"
          :height="captchaImage.Height"
          border="0"
          @click="changeCaptcha"
          v-if="field.name == 'CaptchaValue' && captchaImage.ImgBase64 != ''"
        />

        <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <div class="register__field--check ui-field">
        <div class="ui-field__main">
          <input class="ui-field__checkbox" id="register-remember" type="checkbox" />
          <label class="" for="register-remember">
            <span>{{ $t('register.service.read', { site: siteName }) }}</span>
            <a href="javascript:;" @click="isShowModalServiceTerm = true">{{ $t('register.service.term') }}</a>
          </label>
        </div>
      </div>

      <div class="register__btn">
        <button class="register__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
          {{ $t('register.button.submit') }}
        </button>
        <button class="register__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>

      <div class="ui-notice register__notice">
        <ol>
          <li v-for="(item, index) in noticeList" :key="index" v-html="$t(item)"></li>
        </ol>
      </div>
    </form>
    <component :is="ModalServiceTerm" :isShow="isShowModalServiceTerm" @close="isShowModalServiceTerm = false" />
  </ValidationObserver>
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
    ...mapGetters(['lang', 'siteSetting', 'siteFullCss', 'siteName', 'userToken', 'userPublicKey']),
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
    ModalServiceTerm() {
      console.log('123', this.siteSetting.components);
      return () => import(`@/${this.siteSetting.components.register.ModalServiceTerm}`);
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
      isShowModalServiceTerm: false,
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
