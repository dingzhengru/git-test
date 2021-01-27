<template>
  <div class="user-mail">
    <div class="user-mail__nav">
      <button class="ui-btn user-mail__nav--inbox" @click="$router.push({ name: 'UserMail' })">
        {{ $t('user.mail.nav.inbox') }}
      </button>
      <button class="ui-btn user-mail__nav--add" @click="$router.push({ name: 'UserMailSend' })">
        {{ $t('user.mail.nav.add') }}
      </button>
    </div>
    <div class="user-mail__main">
      <div class="user-mail__item" v-for="item in list" :key="item.Lst_Key" @click="goMailDetail(item.Lst_Key)">
        <div class="user-mail__item__date">{{ getDate(item.Lst_SendTime) }}</div>
        <div class="user-mail__item__title">{{ getDate(item.Lst_Subject) }}</div>
        <i class="user-mail__item__icon--arrow"></i>
      </div>
    </div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { apiGetInboxList } from '@/api/notification';
export default {
  name: 'UserMail',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  data() {
    return {
      list: [],
      // list: [
      //   {
      //     Lst_Key: 1129,
      //     Lst_Subject: '[R][R][R]QATEST',
      //     Lst_SendTime: '2020-08-27T15:19:23',
      //   },
      //   {
      //     Lst_Key: 975,
      //     Lst_Subject: '[R]QATEST',
      //     Lst_SendTime: '2020-04-08T15:23:55',
      //   },
      // ],
      pagination: {
        page: 1,
        pagesize: 1,
        count: 0,
      },
    };
  },
  computed: {
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
  methods: {
    async getInboxList() {
      // const requestData = { Page: this.pagination.page };
      const requestData = {};
      const result = await apiGetInboxList(requestData);

      this.list = result.RetObj.Rows;
      this.pagination.count = result.RetObj.Records;
    },
    goMailDetail(key) {
      this.$router.push({ name: 'UserMailDetail', params: { key } });
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNewsList();
    },
  },
  mounted() {
    this.getInboxList();
  },
};
</script>
