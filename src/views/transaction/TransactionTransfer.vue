<template>
  <form class="transfer" @submit.prevent="transferPoint">
    <div class="transfer__box theme-content-box">
      <div class="transfer__wallet">
        <span>{{ $t('transaction.transfer.field.from') }} </span>
        <select class="transfer__wallet__select ui-ddl" :id="idMapper.transaction.transfer.field.from" v-model="from">
          <!-- <option :value="{}" selected>{{ $t('transaction.transfer.placeholder.from') }}</option> -->
          <template v-for="product in fromList">
            <option :value="product.Product_id" :key="product.Product_id">
              {{ product.Product_Name }}
            </option>

            <template v-for="child in productDetailList">
              <option
                disabled
                :key="product.Product_id + child.Lst_Proxy_Product_Key"
                v-if="child.Lst_Product_id == product.Product_id && child.Lst_Name != product.Product_Name"
                v-html="`&nbsp;&nbsp;&nbsp;&nbsp;☑${child.Lst_Name}`"
              ></option>
            </template>
          </template>
        </select>

        <span> {{ $t('transaction.transfer.field.to') }} </span>
        <select class="transfer__wallet__select ui-ddl" :id="idMapper.transaction.transfer.field.to" v-model="to">
          <option :value="-1" selected v-if="from == 9999">{{ $t('transaction.transfer.placeholder.to') }} </option>
          <template v-for="product in toList">
            <option :value="product.Product_id" :key="product.Product_id">
              {{ product.Product_Name }}
            </option>

            <template v-for="child in productDetailList">
              <option
                disabled
                :key="product.Product_id + child.Lst_Proxy_Product_Key"
                v-if="child.Lst_Product_id == product.Product_id && child.Lst_Name != product.Product_Name"
                v-html="`&nbsp;&nbsp;&nbsp;&nbsp;☑${child.Lst_Name}`"
              ></option>
            </template>
          </template>
        </select>
      </div>
      <div class="transfer__amount-table-div">
        <table class="transfer__amount-table">
          <tbody>
            <tr>
              <th class="transfer__amount-table__th-1st">{{ $t('transaction.transfer.field.amount') }}</th>
              <td class="transfer__amount-table__td-2nd">
                <input
                  class="transfer__amount-table__input"
                  type="number"
                  max="9999999999"
                  placeholder="Please enter the point transfer amount"
                  v-model.number="amount"
                  @input="inputAmount"
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
      </div>
      <div class="transfer__button-div">
        <button
          type="submit"
          class="transfer__button--transfer ui-btn ui-btn-long"
          :id="idMapper.transaction.transfer.button.transfer"
        >
          {{ $t('transaction.transfer.button.transfer') }}
        </button>
      </div>
      <div class="transfer__button-div">
        <button type="button" class="transfer__button--all-to-my-wallet ui-btn ui-btn-long" @click="transferToMain">
          {{ $t('transaction.transfer.button.allToMyWallet') }}
        </button>
      </div>
    </div>
    <table class="transfer__account-table">
      <tbody>
        <tr class="transfer__account-table__tr">
          <td colspan="2">
            <div class="transfer__button-div">
              <button class="transfer__button--reflash ui-btn ui-btn-long" type="button" @click="getAllGamePoint()">
                {{ $t('transaction.transfer.button.refresh') }}
              </button>
            </div>
          </td>
        </tr>
        <tr class="transfer__account-table__tr" v-for="game in gamePointList" :key="game.Product_id">
          <td class="transfer__account-table__th-1st">{{ game.Product_Name }}</td>
          <td class="transfer__account-table__td-2nd">{{ numeral(game.Point).format('0,0.00') }}</td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAllGamePoint } from '@/api/user';
import { getTransferInfo, transferPoint, transferAllGamePointToMain } from '@/api/transaction-transfer';
import numeral from 'numeral';
import idMapper from '@/idMapper';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  name: 'TransactionTransfer',
  components: {
    VueSlider,
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'token']),
    fromList() {
      return this.productList;
    },
    toList() {
      if (this.from == 9999) {
        return this.productList.filter(item => item.Product_id != 9999);
      } else {
        return this.productList.filter(item => item.Product_id == 9999);
      }
    },
  },
  data() {
    return {
      idMapper: idMapper,
      numeral: numeral,
      productList: [],
      productDetailList: [],
      gamePointList: [],
      from: 9999,
      to: -1,
      amount: 0,
      rangeOptions: {
        min: 0,
        max: 0,
        tooltip: 'none',
      },
    };
  },
  methods: {
    async getAllGamePoint() {
      this.$store.commit('setIsLoading', true);
      const result = await getAllGamePoint();
      console.log('[AllGamePoint]', result.RetObj);
      this.gamePointList = result.RetObj;
      this.updateRangeMax();
      this.$store.commit('setIsLoading', false);

      //* 之後會改成下面
      // this.gamePointList = result.RetObj.GameSitePoints;
      // this.rangeOptions.max = Math.floor(result.RetObj.TotalBalance);
    },
    async transferPoint() {
      this.$store.commit('setIsLoading', true);
      const requestData = { Add_Source: this.from, Add_Destination: this.to, Add_TransferPoint: this.amount };
      const result = await transferPoint(requestData);
      console.log('[TransferPoint]', result);

      if (result.Code == 200) {
        window.alert('Transfer Successful');
      }
      this.$store.commit('setIsLoading', false);
    },
    async transferToMain() {
      console.log('transferToMain');
      this.$store.commit('setIsLoading', true);
      const result = await transferAllGamePointToMain();
      this.$store.commit('setIsLoading', false);
      if (result.Code == 200) {
        window.alert(result.RetObj.MsgString);
      }
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
    updateRangeMax() {
      const currentProduct = this.gamePointList.find(item => item.Product_id == this.from);
      this.rangeOptions.max = Math.floor(currentProduct.Point);
      this.amount = this.rangeOptions.max;
    },
    inputAmount() {
      if (this.amount < 0 || typeof this.amount != 'number') {
        this.amount = 0;
      } else if (this.amount > this.rangeOptions.max) {
        this.amount = this.rangeOptions.max;
      }
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

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    token: {
      immediate: true,
      handler() {
        if (!this.token) {
          return;
        }

        getTransferInfo().then(result => {
          console.log('[Transfer]', result.RetObj);
          this.productList = result.RetObj.Add_SourceList;
          this.productDetailList = result.RetObj.MenuMemberDetailItemList;
        });

        this.getAllGamePoint();
      },
    },
    from() {
      this.updateRangeMax();

      if (this.from != 9999) {
        //* 當 from 選擇非錢包時，to 列表會只剩下錢包
        this.to = 9999;
      } else if (this.from == 9999 && this.to == 9999) {
        //* 當 from 選錢包，但 to 也是錢包時
        this.to = -1;
      }
    },
  },
};
</script>

<style>
.vue-slider-dot {
  z-index: 2 !important;
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
  width: 40%;
}

.transfer__wallet__select option {
  color: black;
  background-color: #979797;
}

.transfer__wallet__select option:disabled {
  color: white;
  background-color: #2e2e2e;
  font-size: 1.2rem;
}

/* .transfer__wallet__select optgroup {
  color: white;
  background-color: #2e2e2e;
} */

.transfer__amount-table-div {
  padding-top: 20px;
  padding-bottom: 30px;
}

.transfer__amount-table__th-1st,
.transfer__amount-table__td-2nd {
  /* padding: 3px 15px; */
  font-weight: normal;
  vertical-align: middle;
}

.transfer__amount-table__th-1st {
  width: 40%;
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
  font-size: 2.2rem;
}

.th-th .transfer__wallet {
  font-size: 1.5rem;
}

.zh-cn .transfer__wallet {
  font-size: 2.5rem;
}

.en-us .transfer__wallet__select {
  font-size: 2.5rem;
  width: 40%;
}
.th-th .transfer__wallet__select {
  font-size: 2.3rem;
  width: 40%;
}
.zh-cn .transfer__wallet__select {
  font-size: 2.5rem;
  width: 40%;
}
</style>
