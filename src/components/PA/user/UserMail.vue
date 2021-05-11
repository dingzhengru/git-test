<template>
  <div class="user-mail">
    <div class="ui-panel-tab">
      <component :is="PanelTabs" :list="tabList" />

      <div class="ui-panel-tab__content user-mail__content">
        <div class="nav-tab">
          <div class="nav-tab__item">
            <img :src="imgMail" />
            <span>{{ $t('user.mail.nav.inbox') }}</span>
          </div>
          <div class="nav-tab__right user-mail__nav-tab__right">
            <button class="ui-btn" @click="$router.push({ name: 'UserMailSend' })">
              {{ $t('user.mail.nav.add') }}
            </button>
          </div>
        </div>

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
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
    imgMail() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-mail.png`);
      } catch {
        return '';
      }
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
        // {
        //   name: 'UserMailSend',
        //   text: 'user.mail.nav.add',
        //   link: 'UserMailSend',
        //   class: '',
        //   otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        // },
      ],

      tabList: [
        {
          route: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
        {
          route: 'News',
          text: 'news.title',
          otherActiveRoute: [],
        },
        // {
        //   route: 'About',
        //   text: 'about.title',
        //   otherActiveRoute: [],
        // },
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
