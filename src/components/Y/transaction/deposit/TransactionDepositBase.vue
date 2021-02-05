<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="div">
    <form class="deposit-form" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <div class="theme-content-box">
        <h3 class="deposit-form__title theme-h3-boxTitle">{{ $t('transaction.deposit.title') }}</h3>

        <!-- <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: JSON.stringify(depositBankList) === JSON.stringify(transferBankList) }"
          v-if="JSON.stringify(depositBankList) === JSON.stringify(transferBankList)"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.bankDepositAccount') }}
          </span>
          <input class="ui-ipt" type="text" v-model="depositBankAccount" />
        </ValidationProvider> -->

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box" :rules="{ 'object-not-empty': true }">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.depositBank') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.depositBank"
            v-model="depositBank"
          >
            <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.depositBank`) }}</option>
            <option :value="item" v-for="item in depositInfo.BankAccount" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>

          <div v-if="depositBank && Object.keys(depositBank).length > 0">
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankBranchName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankBranchName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankAccountName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankAccountName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankAccount') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankAccount }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box" :rules="{ 'object-not-empty': true }">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.transferBank') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.transferBank"
            v-model="transferBank"
          >
            <option :value="{}" selected>{{ $t('transaction.deposit.placeholder.transferBank') }}</option>
            <option :value="item" v-for="item in depositInfo.BankURL" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: true, 'date-max': $dayjs().format('YYYY-MM-DDTHH:mm') }"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.datetime') }}
          </span>
          <input
            required
            class="ui-ipt"
            type="datetime-local"
            v-model="datetime"
            :max="$dayjs().format('YYYY-MM-DDTHH:mm')"
          />
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box" :rules="{ required: true }">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.method') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.method"
            v-model="method"
          >
            <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
            <option :value="item.Value" v-for="item in depositInfo.DepositMethod" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <div class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.amount') }}
          </span>
          <ValidationProvider
            :rules="{ required: true }"
            v-if="depositInfo.BaseCurrencyItem && depositInfo.BaseCurrencyItem.length > 0"
          >
            <select
              class="deposit-form__field__select ui-ddl"
              :id="$idMapper.transaction.deposit.field.currency"
              v-model="currency"
            >
              <option value="">{{ $t(`transaction.deposit.placeholder.currency`) }}</option>
              <option :value="item.Value" v-for="item in depositInfo.BaseCurrencyItem" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </ValidationProvider>
        </div>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
        >
          <input
            class="ui-ipt"
            :id="$idMapper.transaction.deposit.field.amount"
            type="number"
            step="100"
            v-model.number="amount"
            @change="inputAmount"
          />
          <p
            class="deposit-form__field__hint"
            v-html="
              $t('transaction.deposit.hint.amount', {
                amountLimitMin: amountMin,
                amountLimitMax: amountMax,
              })
            "
          ></p>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ image: true, size: 2048 }"
          v-slot="{ validate }"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.receipt') }}
          </span>
          <label
            class="deposit-form__field__receipt-upload__label ui-btn ui-btn--long"
            :for="$idMapper.transaction.deposit.button.upload"
          >
            {{ $t('transaction.deposit.button.upload') }}
            <input
              class="deposit-form__field__receipt-upload__input"
              :id="$idMapper.transaction.deposit.button.upload"
              type="file"
              accept=".jpg,.png"
              @change="onFileChange($event, validate)"
            />
          </label>
          <p class="deposit-form__field__hint deposit-form__field__hint--receipt-upload">{{ receipt.name }}</p>
          <p class="deposit-form__field__hint" v-html="$t('transaction.deposit.hint.receipt')"></p>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.remark') }}
          </span>
          <input class="ui-ipt" :id="$idMapper.transaction.deposit.field.remark" type="text" v-model="remark" />
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.promotion') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.promotion"
            v-model="promotion"
          >
            <option :value="item.Value" v-for="item in depositInfo.AllActivityList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <p class="deposit-form__field__hint text-height-light" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </p>
        </ValidationProvider>

        <ol class="ui-ol-memberNotice">
          <li v-for="item in noticeList" :key="item">
            <span v-html="$t(item)"></span>
          </li>
        </ol>
      </div>
      <div class="deposit-form__button-div">
        <button class="ui-btn deposit-form__button-div--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <router-link class="ui-btn deposit-form__button-div--cancel" :to="{ name: 'Home' }">
          {{ $t('ui.button.cancel') }}
        </router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositBase from '@/mixins/transactionDepositBase';
export default {
  name: 'DepositFormBase',
  mixins: [mixinTransactionDepositBase],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
