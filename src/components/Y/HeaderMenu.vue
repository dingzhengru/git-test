<template>
  <div>
    <a href="javascript:;" class="cpn-inBlock lnk-header-langOpen" @click="isShowLangList = !isShowLangList"></a>
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
</template>

<script>
export default {
  name: 'HeaderMenu',
  props: {
    langList: {
      type: Array,
      default: () => [],
    },
    lang: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isShowLangList: false,
    };
  },
  methods: {
    changeLang(lang) {
      this.$emit('changeLang', lang);
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

/*
 * 語系
*/

.en-us .lnk-header-langOpen {
  background: url(~@/assets/common/imgs/header/lang_en_s.png) center center no-repeat;
}

.th-th .lnk-header-langOpen {
  background: url(~@/assets/common/imgs/header/lang_th_s.png) center center no-repeat;
}

.zh-cn .lnk-header-langOpen {
  background: url(~@/assets/common/imgs/header/lang_cn_s.png) center center no-repeat;
}
</style>
