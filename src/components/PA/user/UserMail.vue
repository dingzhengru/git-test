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

        <div class="user-mail__content__main">
          <form class="user-mail__search">
            <div class="ui-field no-wrap user-mail__search__category">
              <select>
                <option value="">{{ $t('user.mail.field.category') }}</option>
                <option :value="item.Value" v-for="item in categoryList" :key="item.Value">
                  {{ item.Text }}
                </option>
              </select>
            </div>
            <div class="ui-field no-wrap user-mail__search__subject">
              <input type="text" :placeholder="$t('user.mail.field.subject')" />
            </div>

            <div class="user-mail__search__btn">
              <button class="ui-btn" type="submit">{{ $t('ui.button.search') }}</button>
            </div>
          </form>

          <table class="ui-table user-mail__table">
            <tr>
              <th>No.</th>
              <th>{{ $t('ui.label.subject') }}</th>
              <th>{{ $t('ui.label.date') }}</th>
            </tr>
            <tr
              v-for="(item, index) in list"
              :key="String(index) + String(item.Lst_Key)"
              @click="openModalMailDetail(item)"
            >
              <td>{{ index + 1 + (pagination.page - 1) * 10 }}</td>
              <td>{{ item.Lst_Subject }}</td>
              <td>{{ $dayjs(item.Lst_SendTime).format('YYYY-MM-DD') }}</td>
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
import { apiGetMailCategoryList } from '@/api/notification';
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

      categoryList: [],
      search: {
        category: '',
        subject: '',
      },
    };
  },
  methods: {
    openModalMailDetail(mail) {
      this.mailKey = mail.Lst_Key;
      this.isShowModalMailDetail = true;
    },
    async getMailCategoryList() {
      const result = await apiGetMailCategoryList();
      this.categoryList = result.RetObj;
    },
  },
  mounted() {
    this.getMailCategoryList();
  },
};
</script>
