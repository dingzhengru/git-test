<template>
  <div class="record-list theme-content-box">
    <h3 class="record-list__title theme-h3-boxTitle">{{ $t('transaction.record.title') }}</h3>
    <ul class="record-list__ul">
      <li class="record-list__ul__li" v-for="record in recordList" :key="record.name">
        <router-link class="record-list__ul__li__link" :to="{ name: 'TransactionRecordContent', params: { name: record.name } }">
          {{ $t(record.content) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionRecordHome',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      recordList: [
        {
          name: 'deposit',
          content: 'transaction.record.deposit',
        },
        {
          name: 'withdrawal',
          content: 'transaction.record.withdrawal',
        },
        {
          name: 'transfer',
          content: 'transaction.record.transfer',
        },
        {
          name: 'bonus',
          content: 'transaction.record.bonus',
        },
        {
          name: 'lottery',
          content: 'transaction.record.lottery',
        },
        {
          name: 'withdrawalRestriction',
          content: 'transaction.record.withdrawalRestriction',
        },
        {
          name: 'adjustment',
          content: 'transaction.record.adjustment',
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
