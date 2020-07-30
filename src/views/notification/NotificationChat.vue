<template>
  <div class="notification-chat">
    <table class="notification-chat__table ui-table01">
      <tbody>
        <tr v-for="item in pageData" :key="item.id">
          <td class="td-1st">{{ item.date }}</td>
          <td class="td-2nd">
            {{ item.title }}
            <router-link class="ui-lnk-detail" :to="{ name: 'NotificationChatDetail', params: { group: item.group } }" />
          </td>
        </tr>
      </tbody>
    </table>

    <AppPagination
      :length="list.length"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationChat',
  components: {
    AppPagination: () => import('@/components/Y/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    pageData() {
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.list.slice(startAt, endAt) || [];
    },
  },
  data() {
    return {
      list: [
        {
          id: '111',
          group: 'group-id11111',
          date: '2020-07-29',
          title: '[R][R][R]test',
        },
        {
          id: '000',
          group: 'group-id00000',
          date: '2020-07-29',
          title: '[R]ttestt',
        },
      ],
      pagination: {
        page: 1,
        pagesize: 1,
      },
    };
  },
  methods: {
    changePage(page) {
      this.pagination.page = page;
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
        import(`@/styles/${this.siteFullCss}/notification/notification-chat.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);
      },
    },
  },
};
</script>

<style scoped>
.notification-chat__table {
  margin-top: 40px;
}

.notification-chat__table .td-1st {
  width: 180px;
  text-align: center;
}

.notification-chat__table .td-2nd {
  padding-right: 73px;
  color: #fff;
  text-align: center;
  position: relative;
}
</style>
