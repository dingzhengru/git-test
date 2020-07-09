<template>
  <div class="lay-are-pageContent">
    <div class="are-bonus">
      <a href="/Y/StaticPage/NoneLogin/?Tag=PermanentIncome" class="lnk-bonus">
        <i class="icn-bonus"></i> <span class="txt-bonus">Bonus V.I.P</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Promotion',
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {};
  },
  mounted() {
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${this.templateType}/common/promotion.css`);
    import(`@/styles/${templatePath}/promotion.scss`);
  },
};
</script>

<style></style>
