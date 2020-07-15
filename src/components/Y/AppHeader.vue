<template>
  <header class="reg-header">
    <div class="lay-screen">
      <div class="are-header-logo"></div>
      <router-link to="/" class="cpn-inBlock lnk-header-home"></router-link>
      <a href="javascript:;" class="cpn-inBlock lnk-header-langOpen" @click="isShowLangList = !isShowLangList"></a>
      <!-- <a href="javascript:" class="cpn-inBlock lnk-header-langClose"></a> -->
      <transition name="slide">
        <div class="are-header-langMenu" v-if="isShowLangList">
          <ul class="cpn-boxzero cpn-inBlock-row ul-lang ul-ilang">
            <li class="li-lang li-ilang" v-for="langItem in langList" :key="langItem.Lst_Locales_Code">
              <a
                href="javascript:void(0)"
                class="lnk-lang lnk-ilang"
                v-if="langItem.Lst_Locales_Code != lang && langItem.Lst_Is_Enable"
                :class="{
                  cn: langItem.Lst_Locales_Code == 'zh-cn',
                  th: langItem.Lst_Locales_Code == 'th-th',
                  en: langItem.Lst_Locales_Code == 'en-us',
                  mm: langItem.Lst_Locales_Code == 'my-mm',
                }"
                @click="changeLang(langItem.Lst_Locales_Code)"
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  props: {
    langList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShowLangList: false,
    };
  },
  async mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/header.scss`);
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

/* 
  * 刪除了登入後的 header 樣式，只留非登入時的樣式 
  * 可於 common/header.css 或原專案的 layout 與 index2 中取得
*/

/*? .reg-header > */
.are-header-logo {
  height: 144px;
  padding: 0 117px;
}
.lnk-header-home {
  width: 77px;
  height: 65px;
  margin-top: -32.5px;
  position: absolute;
  top: 50%;
  left: 20px;
}

.lnk-header-langOpen {
  width: 73px;
  height: 60px;
  position: absolute;
  top: 30%;
  right: 20px;
}
.are-header-langMenu {
  width: 90px;
  /* background: rgba(0, 0, 0, 0.9); */
  overflow: hidden;
  position: absolute;
  top: 141px;
  right: 12px;
  z-index: 2;
}

.ul-lang {
  margin-bottom: 0;
  text-align: center;
}

.li-lang {
  margin: 10px auto;
}

.lnk-lang {
  display: block;
  background: no-repeat center top;
  color: #fff;
  font-size: 2.153em;
  width: 60px;
  padding-top: 65px;
}

.lnk-ilang.tw {
  background-image: url(~@/assets/common/imgs/header/lang_tw_s.png);
}
.lnk-ilang.cn {
  background-image: url(~@/assets/common/imgs/header/lang_cn_s.png);
}
.lnk-ilang.en {
  background-image: url(~@/assets/common/imgs/header/lang_en_s.png);
}
.lnk-ilang.th {
  background-image: url(~@/assets/common/imgs/header/lang_th_s.png);
}
.lnk-lang.mm {
  background-image: url(~@/assets/common/imgs/header/lang_mm_s.png);
}

</style>
