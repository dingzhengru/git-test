<template>
  <header class="reg-header">
    <div class="lay-screen">
      <div class="are-header-logo"></div>
      <a class="cpn-inBlock lnk-header-home" href="/"></a>
      <a
        href="javascript:"
        class="cpn-inBlock lnk-header-langOpen"
        @click="isShowLangList = !isShowLangList"
      ></a>
      <!-- <a href="javascript:" class="cpn-inBlock lnk-header-langClose"></a> -->
      <transition name="slide">
        <div class="are-header-langMenu" v-if="isShowLangList">
          <ul class="cpn-boxzero cpn-inBlock-row ul-lang ul-ilang">
            <li
              class="li-lang li-ilang"
              v-for="(langItem, index) in langList"
              :key="index"
            >
              <a
                href="javascript:void(0)"
                class="lnk-lang lnk-ilang"
                v-if="langItem != lang"
                :class="{
                  cn: langItem == 'zh-cn',
                  th: langItem == 'th-th',
                  en: langItem == 'en-us',
                }"
                @click="changeLang(langItem)"
              ></a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TypeYAppHeader',
  computed: {
    ...mapGetters(['type', 'lang']),
  },
  data() {
    return {
      langList: ['zh-cn', 'th-th', 'en-us'],
      isShowLangList: false,
    };
  },
  mounted() {
    import(`@/styles/${this.type}/header.scss`);
  },
  methods: {
    changeLang(lang) {
      this.$store.commit('setLang', lang);
      this.isShowLangList = false;
    },
  },
};
</script>

<style scoped>


/**
 ** 語系下拉動畫
 */
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave {
  max-height: 250px;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
}
</style>
