<template>
  <div class="record-list theme-content-box">
    <h3 class="record-list__title theme-h3-boxTitle">{{ $t('transaction.record.title') }}</h3>
    <ul class="record-list__ul">
      <li class="record-list__ul__li" v-for="(record, index) in recordList" :key="index">
        <router-link
          class="record-list__ul__li__link"
          :id="idMapper.transaction.record[record]"
          :to="{ name: 'TransactionRecordContent', params: { name: record } }"
        >
          {{ $t(`transaction.record.${record}`) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import idMapper from '@/idMapper';

export default {
  name: 'TransactionRecordHome',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      idMapper: idMapper,
      recordList: ['deposit', 'withdrawal', 'transfer', 'bonus', 'lottery', 'withdrawalRestriction', 'adjustment'],
    };
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/transaction/record.scss`);
  },
};
</script>

<style lang="scss" scoped>
.record-list {
  margin: 30px 0;

  &__ul {
    width: 80%;
    margin: 0 auto;
    padding: 30px 0;
    list-style: none;

    &__li {
      padding: 30px 0;

      &__link {
        display: block;
        font-size: 3.23em;
        text-align: center;
        line-height: 97px;
        border-radius: 10px;
      }
    }
  }
}
</style>

<style scoped>
/* .record-list {
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
} */
</style>
