<template>
  <div class="user-mail">
    <div class="ui-panel-tab">
      <component :is="PanelTabsNews" />

      <div class="ui-panel-tab__content user-mail__content">
        <component :is="AppNavTab" :list="navList" />

        <table class="ui-table user-mail__table">
          <tr>
            <th>No.</th>
            <th>{{ $t('ui.label.subject') }}</th>
            <th>{{ $t('ui.label.date') }}</th>
          </tr>
          <tr v-for="(item, index) in list" :key="String(index) + String(item.Lst_Key)">
            <td>{{ index + 1 + (pagination.page - 1) * 10 }}</td>
            <td>
              <a href="javascript:;" @click="openModalMailDetail(item)">
                {{ getDate(item.Lst_Subject) }}
              </a>
            </td>
            <td>{{ getDate(item.Lst_SendTime) }}</td>
          </tr>
        </table>

        <AppPagination
          :count="pagination.count"
          :page="pagination.page"
          :pagesize="pagination.pagesize"
          @change-page="changePage"
          v-show="list.length > 0"
        />
      </div>
    </div>

    <component
      :is="ModalUserMailDetail"
      :mailKey="mailKey"
      @close="isShowModalMailDetail = false"
      v-if="isShowModalMailDetail"
    />
  </div>
</template>

<script>
import mixinUserMail from '@/mixins/userMail';
import { mapGetters } from 'vuex';
export default {
  name: 'UserMail',
  mixins: [mixinUserMail],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
    ModalUserMailDetail() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserMailDetail}`);
    },
    PanelTabsNews() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabsNews}`);
    },
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
  data() {
    return {
      mailKey: '',
      isShowModalMailDetail: false,
      navList: [
        {
          name: 'UserMail',
          text: 'user.mail.nav.inbox',
          link: 'UserMail',
          class: '',
          otherActiveRoute: [],
        },
        {
          name: 'UserMailSend',
          text: 'user.mail.nav.add',
          link: 'UserMailSend',
          class: '',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
      ],
    };
  },
  methods: {
    openModalMailDetail(mail) {
      this.mailKey = mail.Lst_Key;
      this.isShowModalMailDetail = true;
    },
  },
};
</script>
