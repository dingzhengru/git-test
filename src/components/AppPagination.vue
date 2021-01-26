<template>
  <div class="ui-pagination">
    <a href="javascript:;" class="ui-pagination__prev--more" id="btnPreviousMore" @click="changePage(1)"></a>
    <a href="javascript:;" class="ui-pagination__prev" id="btnPreviousPage" @click="goPreviousPage"></a>
    <select class="ui-pagination__select" v-model="clonePage" @change="changePage(clonePage)">
      <option :value="item" v-for="item in totalPage" :key="item">{{ item }}</option>
    </select>
    <a href="javascript:;" class="ui-pagination__next" id="btnNextPage" @click="goNextPage"></a>
    <a href="javascript:;" class="ui-pagination__next--more" id="btnNextMore" @click="changePage(totalPage)"></a>
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
