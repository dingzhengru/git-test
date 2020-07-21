<template>
  <div class="transaction-record-content-list">
    <div class="theme-content-box">
      <h3 class="theme-h3-boxTitle">{{ title }}</h3>
      <ul class="cpn-boxzero theme-ul-listView">
        <li class="theme-li-listView" v-for="item in list" :key="item.id">
          <table class="ui-table01">
            <tbody>
              <tr v-for="(value, key, index) in item" :key="index">
                <template v-if="!notShowKeyList.includes(key)">
                  <th class="th-1st">{{ key }}</th>
                  <td
                    class="td-2nd"
                    :class="{
                      'ui-txt-positive': (key == 'detail' && item.isSuccess) || (key == 'amount' && item.amount > 0),
                      'ui-txt-negative': (key == 'detail' && !item.isSuccess) || (key == 'amount' && item.amount < 0),
                    }"
                  >
                    <template v-if="key == 'amount'">
                      {{ numeral(value).format('0,0.00') }}
                    </template>

                    <template v-else>
                      {{ value }}
                    </template>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </div>
    <p class="txt-notice">{{ notice }}</p>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'TransactionRecordContentList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => '',
    },
    isSearchActive: {
      type: Boolean,
      default: () => false,
    },
    isPageActive: {
      type: Boolean,
      default: () => false,
    },
    pagesize: {
      type: Number,
      default: () => 10,
    },
    notice: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      numeral: numeral,
      notShowKeyList: ['id', 'isSuccess'],
    };
  },
};
</script>
<style scoped>
.transaction-record-content-list {
  margin: 30px 0;
}

.th-1st {
  width: 100px;
  text-align: center;
}
.td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
.txt-notice {
  font-size: 2em;
}
</style>
