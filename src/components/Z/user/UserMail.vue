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

    <div class="ui-no-data" v-show="list.length === 0">{{ $t('ui.label.noData') }}</div>

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
  name: 'UserMail',
  mixins: [mixinUserMail],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
};
</script>
