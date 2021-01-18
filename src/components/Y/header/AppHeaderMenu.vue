<template>
  <div class="header-menu">
    <a
      href="javascript:;"
      class="header-menu__lang-button"
      :id="$idMapper.header.link.lang"
      @click="isShowLangList = !isShowLangList"
    ></a>

    <transition name="slide">
      <div class="header-menu__lang-dropdown" v-if="isShowLangList">
        <template v-for="item in langList">
          <div
            class="header-menu__lang-dropdown__item"
            :key="item.Lst_Locales_Code"
            :class="item.Lst_Locales_Code"
            :id="$idMapper.header[item.Lst_Locales_Code]"
            v-if="item.Lst_Locales_Code != lang && item.Lst_Is_Enable"
            @click="changeLang(item.Lst_Locales_Code)"
          ></div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeaderMenu',
  computed: {
    ...mapGetters(['lang', 'langList']),
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

<style lang="scss" scoped>
//* 語系下拉動畫
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
