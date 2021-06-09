<template>
  <ValidationObserver class="user-profile" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-profile__form" @submit.prevent="handleSubmit(submitUserProfile)" @reset.prevent="reset">
      <div class="user-profile__field-box">
        <div class="ui-field user-profile__field">
          <div class="ui-field__group">
            <label class="ui-field__group__label">
              {{ $t('user.profile.field.registerTime') }}
            </label>
            <input class="ui-field__group__input" type="text" :value="userCreatedDatetime" />
          </div>
        </div>
      </div>

      <div class="user-profile__field-box" v-for="field in fieldList" :key="field.name">
        <div class="ui-step" v-if="field.name === 'Add_BankId1'">{{ $t('user.profile.step.bank') }}</div>

        <ValidationProvider
          class="ui-field user-profile__field"
          tag="div"
          :class="[field.class]"
          :name="field.name"
          :rules="field.rules"
          v-show="field.isShow"
          v-slot="{ errors, invalid }"
        >
          <div class="ui-field__group">
            <label class="ui-field__group__label">
              {{ $t(`register.${field.name}.placeholder`) }}
            </label>
            <input
              class="ui-field__group__input"
              :id="$idMapper.register.input[field.name]"
              :type="field.type"
              :placeholder="$t(`register.${field.name}.placeholder`)"
              :min="field.min"
              :max="field.max"
              v-model="field.value"
              @change="checkField(field, invalid)"
              v-if="field.type !== 'select' && field.isModifiable"
            />

            <input
              class="ui-field__group__input"
              :id="$idMapper.register.input[field.name]"
              :type="field.type"
              :placeholder="$t(`register.${field.name}.placeholder`)"
              :min="field.min"
              :max="field.max"
              :readonly="!field.isModifiable"
              :value="field.value"
              @change="checkField(field, invalid)"
              v-else-if="field.type !== 'select' && !field.isModifiable"
            />

            <select
              class="ui-field__select"
              :id="$idMapper.register.input[field.name]"
              v-model="field.value"
              v-else-if="field.type === 'select' && field.isModifiable"
            >
              <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
            </select>

            <input
              class="ui-field__group__input"
              :id="$idMapper.register.input[field.name]"
              type="text"
              :placeholder="$t(`register.${field.name}.placeholder`)"
              :readonly="!field.isModifiable"
              :value="getBankById(field.value).Text"
              v-else-if="field.type === 'select' && !field.isModifiable"
            />
          </div>
          <div class="ui-field__error" v-if="errors.length > 0 && errors[0]">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>

      <div class="user-profile__btn">
        <button class="user-profile__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="user-profile__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinUserProfile from '@/mixins/userProfile';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: 'UserProfile',
  mixins: [mixinUserProfile],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
  },
  mounted() {
    this.$store.commit('setPageTitle', 'user.title');
  },
};
</script>
