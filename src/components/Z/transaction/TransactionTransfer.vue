<template>
  <ValidationObserver class="transfer" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="transfer-form" @submit.prevent="handleSubmit(submitTransferPoint)">
      <ValidationProvider
        class="ui-field transfer__field transfer__field--from"
        tag="div"
        :rules="{ required: true, min_value: 0 }"
      >
        <div class="ui-field__group">
          <span class="ui-field__group__label">{{ $t('transaction.transfer.field.from') }}</span>
          <select class="ui-field__select" v-model="from">
            <option :value="item.Product_id" v-for="item in fromList" :key="item.Product_id">
              {{ item.Product_Name }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <div class="transfer__btn">
        <button class="ui-btn ui-btn--block transfer__btn--switch" type="button" @click="switchProduct"></button>
      </div>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--to"
        tag="div"
        :rules="{ required: true, min_value: 0 }"
      >
        <div class="ui-field__group">
          <span class="ui-field__group__label">{{ $t('transaction.transfer.field.to') }}</span>
          <select class="ui-field__select" v-model="to">
            <option :value="-1" selected v-if="from == 9999">{{ $t('transaction.transfer.placeholder.to') }}</option>
            <option :value="item.Product_id" v-for="item in toList" :key="item.Product_id">
              {{ item.Product_Name }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--promotion"
        tag="div"
        v-show="productPromotionList.length > 0"
      >
        <div class="ui-field__group">
          <span class="ui-field__group__label">{{ $t('ui.label.promotion') }}</span>
          <select class="ui-field__select" v-model="promotion">
            <option value="">{{ $t('ui.label.pleaseSelect') }}</option>
            <option :value="item.Value" v-for="item in productPromotionList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--amount"
        tag="div"
        :rules="{ required: true, integer: true, min_value: 1, max_value: currentPoint }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('transaction.transfer.field.amount') }}</label>
          <input class="ui-field__group__input" type="number" v-model.number="amount" @change="changeAmount" />
        </div>
      </ValidationProvider>

      <div class="transfer__btn">
        <button class="ui-btn ui-btn--block transfer__btn--submit" type="submit" :disabled="invalid">
          {{ $t('transaction.transfer.button.transfer') }}
        </button>
      </div>
    </form>

    <div class="ui-point-list">
      <div class="ui-point-list__item" v-for="item in userGamePointList" :key="item.Product_id">
        <div class="ui-point-list__item__label">{{ item.Product_Name }}</div>
        <div class="ui-point-list__item__content">{{ $numeral(item.Point).format('0,0.00') }}</div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinTransactionTransfer from '@/mixins/transactionTransfer';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'TransactionTransfer',
  mixins: [mixinStyleLoader, mixinTransactionTransfer],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-transfer.scss`);
    this.importStyleByFilename('transaction-transfer');
  },
};
</script>
