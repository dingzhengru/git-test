<template>
  <div class="agreement"></div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Agreement',
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/agreement.scss`);
  },
};
</script>

<style></style>
