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
            <option :value="product.Product_id" v-for="product in fromList" :key="product.Product_id">
              {{ product.Product_Name }}
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
            <option :value="product.Product_id" v-for="product in toList" :key="product.Product_id">
              {{ product.Product_Name }}
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
import mixinTransactionTransfer from '@/mixins/transactionTransfer';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'TransactionTransfer',
  mixins: [mixinTransactionTransfer],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
