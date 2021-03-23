<template>
  <div class="preview">
    <button class="ui-btn" @click="closePreview">關閉預覽</button>
  </div>
</template>

<script>
export default {
  name: 'PreviewButton',
  methods: {
    closePreview() {
      this.$store.dispatch('site/closePreview');
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  margin-top: 100px;
  width: 500px;
  > button {
    width: 100%;
    background: gray;
    color: white;
  }
}
</style>
