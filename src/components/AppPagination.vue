<template>
  <div class="pagination">
    <a href="javascript:;" class="ui-lnk-pagerPreviousMore" id="btnPreviousMore" @click="changePage(1)"></a>
    <a href="javascript:;" class="ui-lnk-pagerPrevious" id="btnPreviousPage" @click="goPreviousPage"></a>
    <select class="ui-ddl ui-ddl-pager" name="NoPage" id="slcPage" v-model="clonePage" @change="changePage(clonePage)">
      <option :value="item" v-for="item in totalPage" :key="item">{{ item }}</option>
    </select>
    <a href="javascript:;" class="ui-lnk-pagerNext" id="btnNextPage" @click="goNextPage"></a>
    <a href="javascript:;" class="ui-lnk-pagerNextMore" id="btnNextMore" @click="changePage(totalPage)"></a>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    count: {
      type: Number,
      default: () => 0,
    },
    page: {
      type: Number,
      default: () => 1,
    },
    pagesize: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      clonePage: this.page,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.count / this.pagesize);
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
    goPreviousPage() {
      if (this.page > 1) {
        this.$emit('change-page', this.page - 1);
      }
    },
    goNextPage() {
      if (this.page < this.totalPage) {
        this.$emit('change-page', this.page + 1);
      }
    },
  },
  watch: {
    page: {
      immediate: true,
      handler() {
        this.clonePage = this.page;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0;
  padding: 25px 0;
  letter-spacing: -0.31em;
  letter-spacing: normal;
  text-align: center;
}

.ui-lnk-pagerPreviousMore,
.ui-lnk-pagerPreviousMore2,
.ui-lnk-pagerPrevious,
.ui-lnk-pagerPrevious2,
.ui-lnk-pagerNext,
.ui-lnk-pagerNext2,
.ui-lnk-pagerNextMore,
.ui-lnk-pagerNextMore2 {
  display: inline-block;
  zoom: 1;
  height: 65px;
  background-repeat: no-repeat;
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
}
.ui-lnk-pagerPreviousMore {
  width: 134px;
}
.ui-lnk-pagerPrevious {
  width: 135px;
}
.ui-lnk-pagerNext {
  width: 135px;
}
.ui-lnk-pagerNextMore {
  width: 134px;
  margin-right: 0;
}
.ui-ddl-pager {
  width: 134px;
  min-width: 0;
  height: 65px;
  border: none;
  padding: 0 67px 0 20px;
  line-height: 65px;
}
</style>
