<template>
  <form class="transfer" @submit.prevent="submitTransfer">
    <div class="theme-content-box are-transfer">
      <div class="blk-transfer-select">
        <span>From </span>
        <select class="ui-ddl transfer-from" id="Add_Source" v-model="from">
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
        <select class="ui-ddl ddl-transfer-to transfer-to" id="Add_Destination" v-model="to">
          <option :value="{}" selected>Please select</option>
          <option value="" v-for="product in toList" :key="product.name">
            {{ product.name }}
          </option>
        </select>
      </div>
      <div class="blk-transfer-money">
        <table class="table-transfer-money">
          <tbody>
            <tr>
              <th class="th-1st">Amount</th>
              <td class="td-2nd">
                <input
                  class="ipt-transfer-money"
                  id="Add_TransferPoint"
                  type="number"
                  maxlength="12"
                  size="20"
                  step="0.01"
                  title="Please enter the point transfer amount"
                  v-model="amount"
                />
                <div class="panel-wallet-range">
                  <vue-slider v-model="amount" v-bind="rangeOptions" @error="rangeError" @change="rangeChange">
                    <template v-slot:dot>
                      <img src="~@/assets/common/imgs/main/sliderPoint.png" class="custom-dot" />
                    </template>
                    <template v-slot:process="{}">
                      <div class="custom-process" :style="[{ 'background-color': 'black' }]"></div>
                    </template>
                  </vue-slider>
                </div>
                <span id="sp_AddTransferPointHint">
                  <span class="field-validation-valid" data-valmsg-for="Add_TransferPoint" data-valmsg-replace="true">
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="blk-transfer-control">
        <button type="submit" class="ui-btn01 ui-btn-long btn-transfer" id="pointtransfersubmit">
          Transfer
        </button>
      </div>
      <div class="blk-transfer-control">
        <button type="button" class="ui-btn01 ui-btn-long btn-transfer" id="GamePointBackToMain" @click="backToWallet">
          All to my wallet
        </button>
      </div>
    </div>
    <table border="0" class="table-transfer-account">
      <tbody>
        <tr>
          <td colspan="2">
            <div class="blk-transfer-control">
              <button
                class="ui-btn01 ui-btn-long btn-refresh lnk-reflash txt-reflash"
                @click="reflash()"
                id="reflashpoint"
              >
                Refresh
              </button>
            </div>
          </td>
        </tr>
        <tr v-for="product in productList" :key="product.name">
          <td class="th-1st">{{ product.name }}：</td>
          <td class="td-2nd">{{ numeral(product.amount).format('0,0.00') }}</td>
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
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
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
.transfer-from,
.transfer-to {
  background-color: #2e2e2e;
}

.transfer-from optgroup::before,
.transfer-to optgroup::before {
  content: '';
  padding-left: 10px;
}

.are-transfer {
  margin-top: 30px;
  font-size: 2.461em;
}
.table-transfer-account {
  width: 100%;
  margin: 40px auto;
  /* border: 1px solid #d6c388; */
}
/* .table-transfer-account tr {
  border-bottom: 1px solid #d6c388;
} */
.table-transfer-account th,
.table-transfer-account td {
  padding: 10px;
}
.table-transfer-account .th-1st {
  /* color: #959595; */
  font-size: 2.5em;
  font-weight: normal;
  text-align: left;
}
.table-transfer-account .td-2nd {
  font-size: 2.769em;
  text-align: right;
}
/* .reg-main > .are-transfer > */
.are-transfer .ui-ddl {
  font-size: 1.125em;
}
.are-transfer .ui-btn01 {
  font-size: 1.312em;
}
.blk-transfer-select {
  padding: 20px 0;
  /* border-bottom: 1px solid #d6c388; */
}
.blk-transfer-control {
  padding: 20px 0;
  /* border-top: 1px solid #d6c388; */
}
/* .reg-main > .are-transfer > .blk-transfer-money > */
.table-transfer-money {
  width: 100%;
  margin: 20px 0;
}
.table-transfer-money th,
.table-transfer-money td {
  padding: 3px 15px;
}
.table-transfer-money .th-1st {
  font-weight: normal;
  vertical-align: middle;
}

/*
 * Range
*/

.panel-wallet-range {
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
  background-image: url(~@/assets/common/imgs/main/sliderBar.png) !important;
  background-repeat: no-repeat;
}

.ipt-transfer-money {
  display: block;
  width: 446px;
  height: 77px;
  margin: 40px auto 20px;
  outline: none;
  text-align: center;
  line-height: 77px;
}
/* .reg-main > .are-transfer > .blk-transfer-control > */
.btn-transfer {
  display: block;
  margin: 0 auto;
}
.btn-refresh {
  display: block;
  margin: 0 auto;
  /* background-image: url(imgs/header/btn_logout.jpg); */
  background-size: contain;
  /* color: #000; */
}

/*
 * 語系
*/

.en-us .blk-transfer-select {
  font-size: 28px;
}
</style>
