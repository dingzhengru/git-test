<template>
  <div>
    <HomeSwiper></HomeSwiper>
    <HomeGameBlock></HomeGameBlock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/Y/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/Y/home/HomeGameBlock'),
  },
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {};
  },
  mounted() {
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${this.templateType}/common/home.css`);
    import(`@/styles/${templatePath}/home.scss`);
  },
};
</script>
<style scoped></style>
