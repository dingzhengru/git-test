<template>
  <div class="deposit-third-party">
    <form class="deposit-third-party-form">
      <div class="deposit-third-party__field--btn deposit-third-party__field--method">
        <div class="deposit-third-party__field--btn__title">支付方式</div>
        <div class="deposit-third-party__field--btn__option">
          <button class="ui-btn ui-btn--block" type="button">網關支付</button>
          <button class="ui-btn ui-btn--block" type="button">QR Code</button>
        </div>
      </div>

      <div class="deposit-third-party__field--btn deposit-third-party__field--platform">
        <div class="deposit-third-party__field--btn__title">支付平台</div>
        <div class="deposit-third-party__field--btn__option">
          <button class="ui-btn ui-btn--block" type="button">ThaiPay</button>
          <button class="ui-btn ui-btn--block" type="button">三味線(維護中)</button>
        </div>
      </div>

      <div class="deposit-third-party__field--btn deposit-third-party__field--amount">
        <div class="deposit-third-party__field--btn__title">存款金額</div>
        <div class="deposit-third-party__field--btn__option">
          <button
            class="ui-btn ui-btn--block"
            type="button"
            v-for="item in amountList"
            :key="item"
            :class="{ active: amount == item && !isShowInputAmount }"
            @click="changeAmountByButton(item)"
          >
            {{ item }}
          </button>
          <button
            class="ui-btn ui-btn--block"
            type="button"
            :class="{ active: isShowInputAmount }"
            @click="showInputAmount"
          >
            自行輸入
          </button>
        </div>
        <div class="ui-field" v-show="isShowInputAmount">
          <div class="ui-field__group">
            <label class="ui-field__group__label">存款金額</label>
            <input class="ui-field__group__input" type="number" step="100" min="0" v-model.number="amount" />
          </div>
        </div>
      </div>

      <div class="ui-field deposit-third-party__field deposit-third-party__field--remark">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.remark') }}
          </label>
          <input class="ui-field__group__input" type="text" v-model="remark" />
        </div>
      </div>

      <div class="ui-field deposit-base__field deposit-base__field--bank">
        <select class="ui-field__select" v-model="promotion">
          <option :value="-1">請選擇優惠活動</option>
        </select>
        <div class="ui-field__error" v-if="promotion == -1">
          {{ $t('transaction.deposit.hint.promotion') }}
        </div>
      </div>

      <div tag="div" class="login__field ui-field" :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('login.placeholder.captcha') }}</label>
          <input
            class="ui-field__group__input"
            type="code"
            :placeholder="$t('login.placeholder.captcha')"
            v-model="captcha"
          />
          <img
            class="ui-field__captcha"
            :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
            :width="captchaImage.Width"
            :height="captchaImage.Height"
            v-if="captchaImage.ImgBase64 != ''"
          />
        </div>
      </div>

      <div class="ui-notice">
        <ul>
          <li v-for="item in noticeList" :key="item" v-html="$t(item)"></li>
        </ul>
      </div>

      <div class="deposit-third-party__btn">
        <button class="ui-btn ui-btn--block deposit-third-party__btn--submit" type="submit">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="ui-btn ui-btn--block deposit-third-party__btn--reset" type="reset">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TransactionDepositThirdParty',
  data() {
    return {
      method: '',
      platform: '',
      amount: 0,
      remark: '',
      promotion: -1,
      captcha: '',
      amountList: [100, 200, 500, 1000],
      isShowInputAmount: false,
      captchaImage: {
        ImgBase64:
          'iVBORw0KGgoAAAANSUhEUgAAAJMAAAA6CAYAAAC09mszAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASUSURBVHhe7ZrtdesgDIY7TwfJNp4lU/SvB8kemcM1iTEyFliAxIdB57znnrZJAenhlZzen8fjsQzVrb/fX/T7tekAUyub5pbkuXvK6XCmwroTbAMmZmk4enT5bmDqsbi5dYIpNem1FK13eEqcf7Q5h1qGUWLvlN+ZDaZSxeFct2XAYhVy5uFMQD3CApV6/gHTEJu6hKl3B5LScKYbqfQl8cKkNjdu8RBVUc50J8D0Wdo907TM7wWP97xM6Htk1Hyb69o5n6+NmjU+4DwX8J0t3ss8Ie8VUBaYXAWPAcF+T/0wwQK/lif6mggBkF5P62fTvCIEg3Fdj4Rhwm4KjHy3hlMhAEPz4Cuqyet7npCfrzou7H4do2RgOt2M6+A7rGeGcIRYoq2CcsE06QNezESH5V9P9DUuxTi+E6bY9rEfNCY4BsZTAa9Cyh0xV6bB5M+9viyEfcNcZBjGeZ0puJBIBN4gW74tqCKdInE9l/BLxeBM2vVJ+wZAl4Ap1pFi2gseNKfA93k1o53jNLwmaN+Ts83nGYR3wX0IXRooRmciFFIdiDBPRc8woc4oclvNpXrPs5WTzDDt+Uhr5VSD4YOJUMivCxChw9bwShcxc8EsHYdj+6yyezsWffp8/V1W3pWUCsBEaIcxjrE5Xo5HYOdNBa6LX5x8oJty5FuTDSbKUxwZpogEqPX3mwiCcya60l7A3QnKwGS6m/zQDRUMk+tWxsCEFf8boUmnABoOltOBMBmSwN5zw8S7XtD5V1XhTGeo6En4HJjQYk1IfK5kingENhdM/suUo/Ur3aLNBbG0RahL+XRub1oZYDI9bZmfniflDEN4EzD57dYuGD1YgNqHbszxcjnTWdgF47xAmJp3Jsq67kgtrnn8xltJOZg+som6cKfQGcnWLdocJnLrS7D//czOp6bCMK065kF2/dvCZHTVBiPX8rY3rfIwHf/iIPHwYdQBTJs8VhU+S5gz+J+UKoDpkG8DU2pLw3Q7mLxJOtxSE+GPzlduR49wkEOFwyShKmDSQ6yJL0wStwdzKBsmvnVrcCY4N402R1IIADZPch/q1QaT7Pr9zExQFk1yraYGmMAehD+4rAom0+7ikg7dye9UsMhy1q/2UBym/eLItjilIJh8BSrpTGZtasIATKJ/Wed1Jv8FwQRyPf6cQpA9AK0BZyC8AKbI4QUKEPL0KNdSbYE8Z/qvKHXCFHB417reoVoXWeC2UvKwh+ecTsjPTw/n3wEhzgSSEhtMmEPY8YXpaP0qaacISYDjsyMVuAtomAvMLwwKgTWfC37FB5OnqHsoJyC8LvhR3QfywX02kDPMD7LyuLvjIoq28018MK0imBMh4p869Pqo232iTTdqRawwkdzpKoBr5LhNQ3zihUnJYU9utwCRcVgc4hc/TEox/Y4RpOFoZSQDkxZ1KMfeO9ScZGES0h2c547u2SRMvatWEEVhijm0ZKJqKcIdXUkpmzNdJVD/3P53KI848v3TctFq23st+ym1jzEzeZRSlJYvaazYYBqJT9MdctCVMw1o/UrNz2hziRqAGn1gGgkZStdj+QfLhoVKP4bw9wAAAABJRU5ErkJggg==',
        Width: 147,
        Height: 60,
      },
      noticeList: [
        'transaction.deposit.notice.currency',
        'transaction.deposit.notice.depositLimit01',
        'transaction.deposit.notice.depositLimit02',
        'transaction.deposit.notice.userBear01',
        'transaction.deposit.notice.userBear02',
        'transaction.deposit.notice.suggest',
        'transaction.deposit.notice.contact',
      ],
    };
  },
  methods: {
    changeAmountByButton(amount) {
      this.amount = amount;
      this.isShowInputAmount = false;
    },
    showInputAmount() {
      this.amount = 0;
      this.isShowInputAmount = true;
    },
  },
};
</script>

<style></style>
