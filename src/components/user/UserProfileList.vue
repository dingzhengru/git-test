<template>
  <div class="user-profile">
    <div class="user-profile__table-div theme-content-box">
      <table class="ui-table02">
        <tbody>
          <tr v-for="item in list" :key="item.title">
            <th>{{ $t(`user.profile.notAccessed.${item.name}`) }}</th>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="user-profile__button-div">
      <button class="user-profile__button--instant ui-btn ui-btn-long" @click="instantAccess">
        {{ $t('user.profile.notAccessed.button.access') }}
      </button>
    </div>
    <ol class="user-profile__notice ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice.name">{{ $t(notice.content) }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'UserProfileList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      noticeList: [
        {
          name: 'access',
          content: 'user.profile.notAccessed.notice.access',
        },
        {
          name: 'suggest',
          content: 'user.profile.notAccessed.notice.suggest',
        },
        {
          name: 'contact',
          content: 'user.profile.notAccessed.notice.contact',
        },
      ],
    };
  },
  methods: {
    instantAccess() {
      this.$emit('instantAccess');
    },
  },
};
</script>

<style scoped>
.user-profile__table-div {
  margin: 40px 0;
}
.user-profile__button-div {
  margin: 40px 0;
  text-align: center;
}
</style>
