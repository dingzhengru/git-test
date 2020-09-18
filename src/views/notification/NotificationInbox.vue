<template>
  <div class="notification-inbox">
    <table class="notification-inbox__table ui-table01">
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td class="td-1st">{{ item.Lst_SendTime.split('T')[0] }}</td>
          <td class="td-2nd">
            {{ item.Lst_Subject }}
            <router-link
              class="ui-lnk-detail"
              :to="{ name: 'NotificationInboxDetail', params: { key: item.Lst_Key } }"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <AppPagination
      :length="pagination.dataLength"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getInboxList } from '@/api/notification';

export default {
  name: 'NotificationInbox',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [
        {
          Lst_Key: 1129,
          Lst_Subject: '[R][R][R]QATEST',
          Lst_SendTime: '2020-08-27T15:19:23',
        },
        {
          Lst_Key: 975,
          Lst_Subject: '[R]QATEST',
          Lst_SendTime: '2020-04-08T15:23:55',
        },
      ],
      pagination: {
        page: 1,
        pagesize: 1,
        dataLength: 0,
      },
    };
  },
  methods: {
    async getInboxList() {
      const requestData = { Page: this.pagination.page };
      const result = await getInboxList(requestData);
      console.log('[Inbox]', result);

      this.list = result.RetObj.Rows;
      this.pagination.dataLength = result.RetObj.Records;
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNewsList();
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
        import(`@/styles/${this.siteFullCss}/notification/notification-inbox.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        this.getInboxList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.notification-inbox__table {
  margin-top: 40px;

  .td-1st {
    width: 180px;
    text-align: center;
  }
  .td-2nd {
    padding-right: 73px;
    color: #fff;
    text-align: center;
    position: relative;
  }
}
</style>

<style scoped>
/* .notification-inbox__table {
  margin-top: 40px;
}

.notification-inbox__table .td-1st {
  width: 180px;
  text-align: center;
}

.notification-inbox__table .td-2nd {
  padding-right: 73px;
  color: #fff;
  text-align: center;
  position: relative;
} */
</style>
