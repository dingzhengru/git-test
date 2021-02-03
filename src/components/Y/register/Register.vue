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
import mixinRegister from '@/mixins/register';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Register',
  mixins: [mixinRegister],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  async mounted() {
    import(`@/styles/${this.siteFullCss}/register.scss`);
  },
};
</script>
