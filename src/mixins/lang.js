export default {
  methods: {
    changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      this.$store.dispatch('changeLang', lang);
    },
  },
};
