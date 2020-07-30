<template>
  <form class="transfer" @submit.prevent="submitTransfer">
    <div class="transfer__box theme-content-box">
      <div class="transfer__wallet">
        <span>From </span>
        <select class="transfer__wallet__select ui-ddl" v-model="from">
          <option :value="{}" selected>Wallet</option>
          <template v-for="product in productList">
            <option :value="product.value" :key="product.name">
              {{ product.name }}
            </option>

            <template v-if="product.children && product.children.length > 0">
              <optgroup v-for="(child, index) in product.children" :key="index" :label="child"></optgroup>
            </template>
          </template>
        </select>

        <span> To </span>
        <select class="transfer__wallet__select ui-ddl" v-model="to">
          <option :value="{}" selected>Please select</option>
          <option value="" v-for="product in toList" :key="product.name">
            {{ product.name }}
          </option>
        </select>
      </div>
      <table class="transfer__amount-table">
        <tbody>
          <tr>
            <th class="transfer__amount-table__th-1st">Amount</th>
            <td class="transfer__amount-table__td-2nd">
              <input
                class="transfer__amount-table__input"
                type="number"
                maxlength="12"
                size="20"
                step="0.01"
                placeholder="Please enter the point transfer amount"
                v-model="amount"
              />
              <div class="transfer__amount-table__range">
                <vue-slider v-model="amount" v-bind="rangeOptions" @error="rangeError" @change="rangeChange">
                  <template v-slot:dot>
                    <img src="~@/assets/common/imgs/main/sliderPoint.png" class="custom-dot" />
                  </template>
                  <template v-slot:process>
                    <div class="custom-process"></div>
                  </template>
                </vue-slider>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="transfer__button-div">
        <button type="submit" class="transfer__button--transfer ui-btn ui-btn-long">
          Transfer
        </button>
      </div>
      <div class="transfer__button-div">
        <button type="button" class="transfer__button--all-to-my-wallet ui-btn ui-btn-long" @click="backToWallet">
          All to my wallet
        </button>
      </div>
    </div>
    <table class="transfer__account-table">
      <tbody>
        <tr>
          <td colspan="2">
            <div class="transfer__button-div">
              <button class="transfer__button--reflash ui-btn ui-btn-long" @click="reflash()">
                Refresh
              </button>
            </div>
          </td>
        </tr>
        <tr v-for="product in productList" :key="product.name">
          <td class="transfer__account-table__th-1st">{{ product.name }}：</td>
          <td class="transfer__account-table__td-2nd">{{ numeral(product.amount).format('0,0.00') }}</td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  name: 'TransactionTransfer',
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    toList() {
      return this.productList.filter(item => item.name != 'Wallet');
    },
  },
  data() {
    return {
      numeral: numeral,
      productList: [
        {
          name: 'Wallet',
          value: '9999',
          amount: 1000000,
        },
        {
          name: 'SABA Sports',
          value: '1080',
          amount: 2000.22,
        },
        {
          name: 'BBIN',
          value: '1080',
          amount: 333333.3,
        },
        {
          name: 'JDB',
          value: '1180',
          amount: 44444.444,
        },
        {
          name: 'Royal Gaming',
          value: '1190',
          amount: 55555.55,
          children: ['☑ MG+ RNG', ' ☑ PNG', ' ☑ Gclub', '☑ DS RNG'],
        },
        {
          name: 'CQ9',
          value: '1200',
          amount: 666666,
        },
        {
          name: 'SBO Sports',
          value: '1220',
          amount: 7777,
        },
      ],
      from: {},
      to: {},
      amount: 0,
      totalAmount: 1000000,
      rangeOptions: {
        min: 0,
        max: 10000,
        tooltip: 'none',
      },
    };
  },
  methods: {
    submitTransfer() {
      console.log('submitTransfer');
    },
    backToWallet() {
      console.log('backToWallet');
    },
    reflash() {
      console.log('reflash');
    },
    rangeError(type, msg) {
      //* 參考 https://nightcatsama.github.io/vue-slider-component/#/zh-CN/advanced/input
      const ERROR_TYPE = {
        VALUE: 1,
        INTERVAL: 2,
        MIN: 3,
        MAX: 4,
        ORDER: 5,
      };
      switch (type) {
        case ERROR_TYPE.MIN:
          break;
        case ERROR_TYPE.MAX:
          break;
        case ERROR_TYPE.VALUE:
          break;
      }
      console.log(msg);
    },
    rangeChange() {
      //* 輸入超過最大，就變成最大值
      //* 輸入小於最小，就變成最小值
      //* 輸入非數字，就變成最小值，或回復上一動
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/transfer.scss`);
      },
    },
  },
};
</script>

<style>
.vue-slider-dot {
  z-index: 2;
}
</style>

<style scoped>
.transfer {
  margin-top: 30px;
}

.transfer__box {
  font-size: 2.461em;
}

.transfer__wallet {
  padding: 20px 0;
}

.transfer__wallet__select {
  padding: 0 1.5%;
  font-size: 1.125em;
}

.transfer__wallet__select optgroup {
  background-color: #2e2e2e;
}

.transfer__amount-table {
  width: 100%;
  margin: 20px 0;
}

.transfer__amount-table__th-1st,
.transfer__amount-table__td-2nd {
  /* padding: 3px 15px; */
  font-weight: normal;
  vertical-align: middle;
}

.transfer__amount-table__td-2nd {
  padding-left: 20px;
  padding-top: 10px;
}

.transfer__amount-table__input {
  display: block;
  width: 446px;
  height: 77px;
  margin-bottom: 40px;
  outline: none;
  text-align: center;
  line-height: 77px;
}

.transfer__button-div {
  padding: 20px 0;
}

.transfer__button-div button {
  font-size: 2.5rem;
  display: block;
  margin: 0 auto;
}
/*
 * Table
*/

.transfer__account-table {
  width: 100%;
  margin: 40px auto;
}
.transfer__account-table__th-1st,
.transfer__account-table__td-2nd {
  padding: 10px;
}
.transfer__account-table__th-1st {
  font-size: 2.5em;
  font-weight: normal;
  text-align: left;
}
.transfer__account-table__td-2nd {
  font-size: 2.769em;
  text-align: right;
}

/*
 * Range
*/

.transfer__amount-table__range {
  width: 448px;
}

.custom-dot {
  position: absolute;
  top: -18px;
  left: -24px;
}

.custom-process {
  height: 22px;
  position: relative;
  left: 0px;
  top: -8px;
  background-image: url(~@/assets/common/imgs/main/sliderBar.png);
  background-repeat: no-repeat;
  background-position: center;
}

/*
 * 語系
*/

.en-us .transfer__wallet {
  font-size: 28px;
}
</style>
