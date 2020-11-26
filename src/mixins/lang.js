import { mapGetters } from 'vuex';

export default {
  name: 'MixinLang',
  computed: {
    ...mapGetters(['lang']),
  },
  methods: {
    changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      this.$store.dispatch('changeLang', lang);
    },
  },
};
