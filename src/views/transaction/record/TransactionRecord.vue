<template>
  <div class="record-list theme-content-box">
    <h3 class="record-list__title theme-h3-boxTitle">Record List</h3>
    <ul class="record-list__ul">
      <li class="record-list__ul__li" v-for="record in recordList" :key="record.name">
        <router-link class="record-list__ul__li__link" :to="{ name: 'TransactionRecordContent', params: { name: record.name } }">
          {{ record.content }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionRecord',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      recordList: [
        {
          name: 'deposit',
          content: 'Deposit Record',
        },
        {
          name: 'withdrawal',
          content: 'Withdrawals Record',
        },
        {
          name: 'transfer',
          content: 'Transfer Record',
        },
        {
          name: 'bonus',
          content: 'Bonus Record',
        },
        {
          name: 'lottery',
          content: 'Lottery Record',
        },
        {
          name: 'withdrawal-restriction',
          content: 'Withdrawal Restriction',
        },
        {
          name: 'adjustment',
          content: 'Adjustment Record',
        },
      ],
    };
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/record.scss`);
      },
    },
  },
};
</script>

<style scoped>
.record-list {
  margin: 30px 0;
}

.record-list__ul {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  list-style: none;
}
.record-list__ul__li {
  padding: 30px 0;
}
.record-list__ul__li__link {
  display: block;
  font-size: 3.23em;
  text-align: center;
  line-height: 97px;
  border-radius: 10px;
}
</style>
