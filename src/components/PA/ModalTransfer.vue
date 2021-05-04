<template>
  <AppModal @close="closeModal">
    <div class="modal-transfer">
      <div class="ui-box-close" @click="closeModal"></div>
      <ValidationObserver class="modal-transfer__container" tag="div" v-slot="{ invalid, handleSubmit }">
        <form class="modal-transfer__form" @submit.prevent="handleSubmit(submitTransfer)">
          <div class="modal-transfer__field">
            <label>{{ userGamePointWallet.Product_Name }}</label>
            <input type="text" :value="userGamePointWallet.Point" readonly />
          </div>
          <div class="modal-transfer__field">
            <label>{{ productPointCurrent.Product_Name }}</label>
            <input type="text" :value="productPointCurrent.Point" readonly />
          </div>
          <ValidationProvider
            class="modal-transfer__field"
            tag="div"
            :rules="{ required: true, integer: true, min_value: 1, max_value: userGamePointWallet.Point }"
          >
            <label for="modal-transfer-amount">{{ $t('ui.label.transferAmount') }}</label>
            <input id="modal-transfer-amount" type="number" v-model="amount" />
          </ValidationProvider>

          <ValidationProvider class="modal-transfer__field" tag="div" v-show="promotionList.length > 0">
            <label class="">{{ $t('ui.label.promotion') }}</label>
            <select class="" v-model="promotion">
              <option value="">{{ $t('ui.label.pleaseSelect') }}</option>
              <option :value="item.Value" v-for="item in promotionList" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </ValidationProvider>

          <div class="modal-transfer__btn">
            <button class="modal-transfer__btn--submit" type="submit" :disabled="invalid">
              {{ $t('ui.button.confirm') }}
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinModalTransfer from '@/mixins/modalTransfer';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'ModalTransfer',
  mixins: [mixinModalTransfer],
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.amount = 0;
    },
  },
  mounted() {
    this.isTransferAll = false;
    this.amount = this.walletPoint;
  },
};
</script>
