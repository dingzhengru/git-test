<template>
  <AppModal @close="closeModal">
    <div class="ui-modal user-bank">
      <div class="ui-box-close" @click="closeModal"></div>
      <div class="ui-modal__title">{{ $t('user.profile.modal.bankTitle') }}</div>
      <ValidationObserver
        class="ui-modal__content user-bank__container"
        tag="div"
        v-slot="{ invalid, handleSubmit, reset }"
      >
        <form class="user-bank-form" @submit.prevent="handleSubmit(submitUserBank)" @reset.prevent="reset">
          <ValidationProvider
            class="ui-field user-bank__field"
            tag="div"
            :class="[bankId.class]"
            :name="bankId.name"
            :rules="bankId.rules"
            v-slot="{ errors }"
          >
            <label for="">{{ $t('ui.label.bankName') }}：</label>
            <select v-model="bankId.value">
              <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
            </select>
            <div class="user-bank__field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <ValidationProvider
            class="ui-field user-bank__field"
            tag="div"
            :class="[bankAccount.class]"
            :name="bankAccount.name"
            :rules="bankAccount.rules"
            v-slot="{ errors, invalid }"
          >
            <label for="">{{ $t('ui.label.bankAccount') }}：</label>
            <input type="text" v-model="bankAccount.value" @change="checkField(bankAccount, invalid)" />
            <div class="user-bank__field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>

          <ValidationProvider
            class="ui-field user-bank__field"
            tag="div"
            :class="[bankBranch.class]"
            :name="bankBranch.name"
            :rules="bankBranch.rules"
            v-slot="{ errors }"
          >
            <label for="">{{ $t('ui.label.bankBranch') }}： </label>
            <input type="text" v-model="bankBranch.value" />
            <div class="user-bank__field__error" v-if="errors.length > 0 && errors[0]">
              {{ errors[0] }}
            </div>
          </ValidationProvider>

          <div class="user-bank__btn">
            <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">{{ $t('ui.button.save') }}</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinCheckField from '@/mixins/checkField';
import { apiBankInfoChange } from '@/api/user';

export default {
  name: 'ModalUserBank',
  mixins: [mixinCheckField],
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    bankAddNumber: {
      type: Number,
      default: 0,
    },
    bankIdAdd: {
      type: Object,
      default: () => {
        return { name: '', value: '' };
      },
    },
    bankAccountAdd: {
      type: Object,
      default: () => {
        return { name: '', value: '' };
      },
    },
    bankBranchAdd: {
      type: Object,
      default: () => {
        return { name: '', value: '' };
      },
    },
    bankList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      bankId: {},
      bankAccount: {},
      bankBranch: {},
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    updateBank() {
      this.bankId = this.$deepClone(this.bankIdAdd);
      this.bankAccount = this.$deepClone(this.bankAccountAdd);
      this.bankBranch = this.$deepClone(this.bankBranchAdd);

      this.bankId.rules['register-required'] = true;
      this.bankAccount.rules['register-required'] = true;
      this.bankBranch.rules['register-required'] = true;
    },
    async submitUserBank() {
      const requestData = {};
      requestData.Add_BankType = this.bankAddNumber;
      requestData[this.bankId.name] = this.bankId.value;
      requestData[this.bankAccount.name] = this.bankAccount.value;
      requestData[this.bankBranch.name] = this.bankBranch.value;

      console.log(requestData);

      const result = await apiBankInfoChange(requestData);

      if (result.Code === 200) {
        this.$emit('update-bank', {
          bankId: this.bankId,
          bankAccount: this.bankAccount,
          bankBranch: this.bankBranch,
        });
      }
    },
  },
  mounted() {
    this.updateBank();
  },
  watch: {
    bankIdAdd() {
      this.updateBank();
    },
    bankAccountAdd() {
      this.updateBank();
    },
    bankBranchAdd() {
      this.updateBank();
    },
  },
};
</script>
