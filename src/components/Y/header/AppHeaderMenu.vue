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
      isShowLangList: true,
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

.header-menu {
  &__lang-button {
    display: inline-block;
    width: 73px;
    height: 60px;
    position: absolute;
    top: 30%;
    right: 20px;

    &:lang(en-us) {
      background: url(~@/assets/common/lang/lang_en-us_s.png) center center no-repeat;
    }

    &:lang(th-th) {
      background: url(~@/assets/common/lang/lang_th-th_s.png) center center no-repeat;
    }

    &:lang(zh-cn) {
      background: url(~@/assets/common/lang/lang_zh-cn_s.png) center center no-repeat;
    }
  }

  &__lang-dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
    overflow: hidden;
    position: absolute;
    top: 141px;
    right: 12px;
    z-index: 2;
    &__item {
      display: block;
      width: 60px;
      height: 65px;
      margin: 10px 0;

      &.zh-tw {
        background: url(~@/assets/common/lang/lang_zh-tw_s.png) no-repeat center top;
      }
      &.zh-cn {
        background: url(~@/assets/common/lang/lang_zh-cn_s.png) no-repeat center top;
      }
      &.en-us {
        background: url(~@/assets/common/lang/lang_en-us_s.png) no-repeat center top;
      }
      &.th-th {
        background: url(~@/assets/common/lang/lang_th-th_s.png) no-repeat center top;
      }
      &.my-mm {
        background: url(~@/assets/common/lang/lang_my-mm_s.png) no-repeat center top;
      }
    }
  }
}
</style>
