<template>
  <div class="user-profile">
    <div class="user-profile__table-div theme-content-box">
      <table class="ui-table02">
        <tbody>
          <tr v-for="item in list" :key="item.title">
            <th>{{ item.title }}</th>
            <td>{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="user-profile__button-div">
      <button type="button" class="user-profile__button--instant ui-btn ui-btn-long" @click="instantAccess">
        Instant Access
      </button>
    </div>
    <ol class="user-profile__notice ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice">{{ notice }}</li>
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
        `Your account has not opened yet, you can only use the limited function currently`,
        `For ensuring your rights and benefits, we urge you to open the member account as soon as possible.`,
        `If you have any additional questions about your account details ,please contact our online service.`,
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
