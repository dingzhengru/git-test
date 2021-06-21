<template>
  <div class="user-mail">
    <div class="user-mail__nav">
      <button
        class="ui-btn"
        :class="{ active: $route.name == 'UserMail' }"
        @click="$router.push({ name: 'UserMail' }).catch(() => {})"
      >
        {{ $t('user.mail.nav.inbox') }}
      </button>
      <button
        class="ui-btn"
        :class="{ active: $route.name == 'UserMailSend' }"
        @click="$router.push({ name: 'UserMailSend' }).catch(() => {})"
      >
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

    <intersect rootMargin="0px 0px 5px 0px" @enter="changePageScrollHandler">
      <div></div>
    </intersect>
  </div>
</template>

<script>
import mixinUserMail from '@/mixins/userMail';
import Intersect from 'vue-intersect';

export default {
  name: 'UserMail',
  mixins: [mixinUserMail],
  components: {
    Intersect,
  },
  computed: {
    getDate: () => datetime => {
      return datetime.split('T')[0];
    },
  },
  mounted() {
    this.$store.commit('setPageTitle', 'user.mail.title');
  },
};
</script>
