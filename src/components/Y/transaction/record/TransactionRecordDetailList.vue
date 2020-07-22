<template>
  <div class="transaction-record-detail">
    <div class="theme-content-box are-detail">
      <h3 class="theme-h3-boxTitle">{{ title }}</h3>

      <ul class="cpn-boxzero theme-ul-listView">
        <li class="theme-li-listView" v-for="item in list" :key="item.id">
          <table class="ui-table02 table-depdetail">
            <tbody>
              <tr v-for="(value, key, index) in item" :key="index">
                <template v-if="!notShowKeyList.includes(key)">
                  <th class="th-1st">{{ key }}</th>
                  <td
                    class="td-2nd"
                    :class="{
                      'ui-txt-positive': isPositive(key, value, item),
                      'ui-txt-negative': isNegative(key, value, item),
                    }"
                  >
                    <template v-if="typeof value == 'number'">
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
    <div class="are-control">
      <button
        type="button"
        class="ui-btn01 ui-btn-long btn-return"
        @click="$router.push({ name: 'TransactionRecordContent', params: { name: $route.params.name } })"
      >
        Previous
      </button>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'TransactionRecordDetailList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    isPositive: () => (key, value) => {
      return (
        (key == 'rollinOfPoints' && value >= 0) ||
        (key == 'rollinOfPoints' && value >= 0) ||
        (key == 'rolloutOfPoints' && value >= 0) ||
        (key == 'bonusIssue' && value >= 0)
      );
    },
    isNegative: () => (key, value) => {
      return (
        (key == 'rollinOfPoints' && value < 0) ||
        (key == 'rollinOfPoints' && value < 0) ||
        (key == 'rolloutOfPoints' && value < 0) ||
        (key == 'bonusIssue' && value < 0)
      );
    },
  },
  data() {
    return {
      numeral: numeral,
      notShowKeyList: ['id'],
    };
  },
};
</script>
<style scoped>
.transaction-record-detail {
  margin: 30px 0;
}

.th-1st {
  width: 45%;
  word-break: break-word;
}
.td-2nd {
  white-space: nowrap;
  text-align: right;
}
.are-control {
  margin: 40px 0 20px;
  text-align: center;
}
</style>
