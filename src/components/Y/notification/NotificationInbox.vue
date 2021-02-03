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
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import mixinUserMail from '@/mixins/userMail';

export default {
  name: 'NotificationInbox',
  mixins: [mixinUserMail],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
};
</script>
