<template>
  <ValidationObserver class="modal-register" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form
      class="modal-register-form"
      @submit.prevent="handleSubmit(submitRegister)"
      @reset.prevent="reset"
      autocomplete="off"
    >
      <ValidationProvider
        class="ui-field"
        tag="div"
        :class="[field.class]"
        :name="field.name"
        :rules="field.rules"
        v-for="field in fieldList"
        :key="field.name"
        v-slot="{ errors, invalid }"
        v-show="field.isShow"
      >
        <span class="ui-field__star" v-show="field.isRequired">*</span>

        <div class="ui-field__group">
          <input
            class="ui-field__group__input"
            :id="$idMapper.register.input[field.name]"
            :type="field.type"
            :placeholder="$t(`register.${field.name}.placeholder`)"
            :min="field.min"
            :max="field.max"
            :readonly="!field.isModifiable"
            :autocomplete="field.type === 'password' ? 'new-password' : 'off'"
            :name="field.name"
            v-model="field.value"
            v-if="field.type != 'select'"
            @change="checkField(field, invalid)"
          />

          <select
            class="ui-field__select"
            :id="$idMapper.register.input[field.name]"
            v-model="field.value"
            v-if="field.type == 'select'"
          >
            <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
          </select>
        </div>

        <img
          class="ui-field__captcha"
          :id="$idMapper.register.image.captcha"
          :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
          :width="captchaImage.Width / 1.5"
          :height="captchaImage.Height / 1.5"
          border="0"
          @click="changeCaptcha"
          v-if="field.name == 'CaptchaValue' && captchaImage.ImgBase64 != ''"
        />

        <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
          {{ errors[0] }}
        </div>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field modal-register__field--check"
        tag="div"
        :rules="{ required: { allowFalse: false } }"
      >
        <div class="ui-field__group ui-field__group--checkbox">
          <input id="register-remember" type="checkbox" v-model="isAgreeServiceTerm" />
          <label for="register-remember">
            <span>{{ $t('register.service.read', { site: siteName }) }}</span>
            <a href="javascript:;" @click="isShowModalServiceTerm = true">{{ $t('register.service.term') }}</a>
          </label>
        </div>
      </ValidationProvider>

      <div class="modal-register__btn">
        <button class="modal-register__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
          {{ $t('register.button.submit') }}
        </button>
        <button class="modal-register__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
    <component :is="ModalServiceTerm" v-if="isShowModalServiceTerm" @close="isShowModalServiceTerm = false" />
  </ValidationObserver>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinRegister from '@/mixins/register';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalRegister',
  mixins: [mixinStyleLoader, mixinRegister],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteName']),
    ModalServiceTerm() {
      return () => import(`@/${this.siteSetting.components.register.ModalServiceTerm}`);
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/register.scss`);
    this.importStyleByFilename('register');

    this.$store.commit('setPageTitle', 'register.title');
  },
};
</script>
