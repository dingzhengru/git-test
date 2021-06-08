<template>
  <ValidationObserver class="transfer" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="transfer-form" @submit.prevent="handleSubmit(submitTransferPoint)">
      <ValidationProvider
        class="ui-field transfer__field transfer__field--from"
        tag="div"
        :rules="{ required: true, min_value: 0 }"
        v-slot="{ invalid }"
      >
        <select class="ui-field__select" :class="{ invalid: invalid }" v-model="from">
          <option :value="item.Product_id" v-for="item in fromList" :key="item.Product_id">
            {{ item.Product_Name }}
          </option>
        </select>
      </ValidationProvider>

      <div class="transfer__btn">
        <button class="ui-btn ui-btn--lg ui-btn--block transfer__btn--switch" type="button" @click="switchProduct">
          <img :src="imgSwitch" alt="" />
        </button>
      </div>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--to"
        tag="div"
        :rules="{ required: true, min_value: 0 }"
        v-slot="{ invalid }"
      >
        <select class="ui-field__select" :class="{ invalid: invalid }" v-model="to">
          <option :value="-1" selected v-if="from == 9999">{{ $t('transaction.transfer.placeholder.to') }}</option>
          <option :value="item.Product_id" v-for="item in toList" :key="item.Product_id">
            {{ item.Product_Name }}
          </option>
        </select>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--amount"
        tag="div"
        :rules="{ required: true, integer: true, min_value: 1, max_value: currentPoint }"
      >
        <input
          class="ui-field__group__input"
          type="number"
          :placeholder="$t('transaction.transfer.field.amount')"
          v-model.number="amount"
          @change="changeAmount"
        />
      </ValidationProvider>

      <ValidationProvider
        class="ui-field transfer__field transfer__field--promotion"
        tag="div"
        v-show="productPromotionList.length > 0 && from === 9999"
      >
        <select class="ui-field__select" v-model="promotion">
          <option :value="{}">{{ $t('ui.label.promotion') }}</option>
          <option
            :value="item"
            v-for="item in productPromotionList"
            :key="item.Value"
            :disabled="to > 0 && item.game !== to"
          >
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <div class="transfer__btn">
        <button class="ui-btn ui-btn--lg ui-btn--block transfer__btn--submit" type="submit" :disabled="invalid">
          {{ $t('transaction.transfer.button.transfer') }}
        </button>
      </div>
    </form>
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
    ...mapGetters(['siteFullCss', 'siteIsWalletTypeNoTransfer']),
    imgSwitch() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-transfer.png`);
      } catch {
        return '';
      }
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-transfer.scss`);
    this.importStyleByFilename('transaction-transfer');

    // if (this.siteIsWalletTypeNoTransfer) {
    //   this.$router.replace({ name: 'Home' });
    // }
  },
};
</script>
