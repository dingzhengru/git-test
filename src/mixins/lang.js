import { changeLang } from '@/api/lang';

export default {
  methods: {
    async changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      const requestData = { Lang: lang };
      const result = await changeLang(requestData);
      if (result.Code == 200) {
        this.$store.commit('setLang', lang);
        console.log('[Lang]', 'changeLang:', lang, result.RetObj);
      }
    },
  },
};
