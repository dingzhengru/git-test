<template>
  <div class="transfer">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form class="transfer__box theme-content-box" @submit.prevent="handleSubmit(submitTransferPoint)">
        <div class="transfer__wallet">
          <ValidationProvider :rules="{ required: true, min_value: 0 }">
            <span>{{ $t('transaction.transfer.field.from') }} </span>
            <select
              class="transfer__wallet__select ui-ddl"
              :id="$idMapper.transaction.transfer.field.from"
              v-model="from"
            >
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
          </ValidationProvider>

          <ValidationProvider :rules="{ required: true, min_value: 0 }">
            <span> {{ $t('transaction.transfer.field.to') }} </span>
            <select class="transfer__wallet__select ui-ddl" :id="$idMapper.transaction.transfer.field.to" v-model="to">
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
          </ValidationProvider>
        </div>
        <div class="transfer__amount">
          <table class="transfer__amount__table">
            <tbody>
              <tr>
                <th class="transfer__amount__table__th-1st">{{ $t('transaction.transfer.field.amount') }}</th>
                <td class="transfer__amount__table__td-2nd">
                  <ValidationProvider :rules="{ required: true, integer: true, min_value: 1, max_value: currentPoint }">
                    <input
                      class="transfer__amount__table__input"
                      type="number"
                      placeholder="Please enter the point transfer amount"
                      v-model.number="amount"
                      @change="changeAmount"
                    />
                    <div class="transfer__amount__table__range">
                      <vue-slider
                        v-model="amount"
                        v-bind="{
                          min: 0,
                          max: currentPoint,
                          tooltip: 'none',
                        }"
                        @error="rangeError"
                      >
                        <template v-slot:dot>
                          <img src="~@/assets/common/main/sliderPoint.png" class="custom-dot" />
                        </template>
                        <template v-slot:process>
                          <div class="custom-process"></div>
                        </template>
                      </vue-slider>
                    </div>
                  </ValidationProvider>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="transfer__button-div">
          <button
            type="submit"
            class="transfer__button--transfer ui-btn ui-btn--long"
            :id="$idMapper.transaction.transfer.button.transfer"
            :disabled="invalid"
          >
            {{ $t('transaction.transfer.button.transfer') }}
          </button>
        </div>
        <div class="transfer__button-div">
          <button type="button" class="transfer__button--all-to-my-wallet ui-btn ui-btn--long" @click="transferToMain">
            {{ $t('transaction.transfer.button.allToMyWallet') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
    <table class="transfer__account-table">
      <tbody>
        <tr class="transfer__account-table__tr">
          <td colspan="2">
            <div class="transfer__button-div">
              <button
                class="transfer__button--reflash ui-btn ui-btn--long"
                type="button"
                @click="$store.dispatch('user/getPointInfo')"
              >
                {{ $t('transaction.transfer.button.refresh') }}
              </button>
            </div>
          </td>
        </tr>
        <tr class="transfer__account-table__tr" v-for="game in userGamePointList" :key="game.Product_id">
          <td class="transfer__account-table__th-1st">{{ game.Product_Name }}</td>
          <td class="transfer__account-table__td-2nd">{{ $numeral(game.Point).format('0,0.00') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { apiGetTransferInfo, apiTransferPoint, apiTransferAllGamePointToMain } from '@/api/transaction-transfer';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  name: 'TransactionTransfer',
  components: {
    VueSlider,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userGamePointList', 'userGamePointById']),
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
    productPointCurrent() {
      return this.userGamePointById(this.from);
    },
    currentPoint() {
      return Math.floor(this.productPointCurrent.Point) || 0;
    },
  },
  data() {
    return {
      productList: [],
      productDetailList: [],
      from: 9999,
      to: -1,
      amount: 0,
    };
  },
  methods: {
    async getTransferInfo() {
      const result = await apiGetTransferInfo();
      this.productList = result.RetObj.Add_SourceList;
      this.productDetailList = result.RetObj.MenuMemberDetailItemList;
    },
    async submitTransferPoint() {
      const requestData = { Add_Source: this.from, Add_Destination: this.to, Add_TransferPoint: this.amount };
      const result = await apiTransferPoint(requestData);

      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
        window.alert(this.$t('alert.transferSuccess'));
      }
    },
    async transferToMain() {
      const result = await apiTransferAllGamePointToMain();
      if (result.Code == 200) {
        this.$store.commit('user/setPointInfo', result.RetObj);
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
      return msg;
    },
    changeAmount() {
      if (this.amount > this.currentPoint) {
        this.amount = this.currentPoint;
      }
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/transaction/transfer.scss`);

    this.getTransferInfo();
  },
  watch: {
    lang() {
      this.getTransferInfo();
    },
    userGamePointList() {
      this.amount = this.currentPoint;
    },
    from: {
      immediate: true,
      handler() {
        this.amount = this.currentPoint;

        if (this.from != 9999) {
          //* 當 from 選擇非錢包時，to 列表會只剩下錢包
          this.to = 9999;
        } else if (this.from == 9999 && this.to == 9999) {
          //* 當 from 選錢包，但 to 也是錢包時
          this.to = -1;
        }
      },
    },
  },
};
</script>

<style>
.vue-slider-dot {
  z-index: 2 !important;
}
</style>

<style lang="scss" scoped>
.transfer {
  margin-top: 30px;

  &__box {
    font-size: 2.461em;
  }
  &__wallet {
    padding: 20px 0;

    &__select {
      padding: 0 1.5%;
      font-size: 1.125em;
      width: 40%;

      option {
        color: black;
        background-color: #979797;
      }

      option:disabled {
        color: white;
        background-color: #2e2e2e;
        font-size: 1.2rem;
      }
    }
  }

  &__amount {
    padding-top: 20px;
    padding-bottom: 30px;
    padding-right: 32px;
    padding-left: 20px;

    &__table {
      &__th-1st {
        width: 40%;
        text-align: left;
      }

      &__td-2nd {
        padding-left: 20px;
        padding-top: 10px;
      }
      &__input {
        display: block;
        width: 446px;
        height: 77px;
        margin-bottom: 40px;
        outline: none;
        text-align: center;
        line-height: 77px;
      }
      &__range {
        width: 448px;

        .custom-dot {
          position: absolute;
          top: -18px;
          left: -16px;
        }

        .custom-process {
          height: 22px;
          position: relative;
          left: 0px;
          top: -8px;
          background-image: url(~@/assets/common/main/sliderBar.png);
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
  &__button-div {
    padding: 20px 0;

    button {
      font-size: 3rem;
      display: block;
      margin: 0 auto;
    }
  }
  &__account-table {
    width: 100%;
    margin: 40px auto;

    &__th-1st,
    &__td-2nd {
      padding: 10px;
    }

    &__th-1st {
      font-size: 2.5em;
      font-weight: normal;
      text-align: left;
    }
    &__td-2nd {
      font-size: 2.769em;
      text-align: right;
    }
  }
}

.en-us {
  .transfer {
    &__wallet {
      font-size: 2.2rem;

      &__select {
        font-size: 2.5rem;
        width: 40%;
      }
    }
  }
}

.th-th {
  .transfer {
    &__wallet {
      font-size: 1.5rem;

      &__select {
        font-size: 2.3rem;
        width: 40%;
      }
    }
  }
}

.zh-cn {
  .transfer {
    &__wallet {
      font-size: 2.5rem;
      &__select {
        font-size: 2.5rem;
        width: 40%;
      }
    }
  }
}
</style>
