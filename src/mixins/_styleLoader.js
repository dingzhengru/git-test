import { mapGetters } from 'vuex';

export default {
  name: 'MixinStyleLoader',
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  methods: {
    importStyleByFilename(name) {
      import(`@/styles/${this.siteFullCss}/${name}.scss`);
    },
  },
};
