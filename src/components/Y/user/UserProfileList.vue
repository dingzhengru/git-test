<template>
  <div>
    <div class="theme-content-box are-account">
      <table class="ui-table02 table-account">
        <tbody>
          <tr v-for="item in list" :key="item.title">
            <th class="th-1st">{{ item.title }}</th>
            <td class="td-2nd">{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="are-control">
      <button type="button" class="ui-btn01 ui-btn-long btn-open" @click="instantAccess">
        Instant Access
      </button>
    </div>
    <ol class="ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice">{{ notice }}</li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfileList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['token']),
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
      console.log('instantAccess');
    },
  },
};
</script>

<style scoped>
.are-account {
  margin: 40px 0;
}
.are-control {
  margin: 40px 0;
  text-align: center;
}
</style>
