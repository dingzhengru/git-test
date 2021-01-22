<template>
  <div class="record-list theme-content-box">
    <h3 class="record-list__title theme-h3-boxTitle">{{ $t('transaction.record.title') }}</h3>
    <ul class="record-list__ul">
      <li class="record-list__ul__li" v-for="item in recordList" :key="item">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record[item]"
          :to="{ name: 'TransactionRecordContent', params: { name: item } }"
        >
          {{ $t(`transaction.record.${item}`) }}
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
    ...mapGetters(['siteFullCss']),
  },
  data() {
    return {
      recordList: ['deposit', 'withdrawal', 'transfer', 'bonus', 'lottery', 'withdrawalRestriction', 'adjustment'],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-record.scss`);
  },
};
</script>
