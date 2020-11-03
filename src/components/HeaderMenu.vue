<template>
  <div class="header-menu">
    <a
      href="javascript:;"
      class="header-menu__lang-toggle"
      :id="idMapper.header.link.lang"
      @click="isShowLangList = !isShowLangList"
    ></a>
    <transition name="slide">
      <div class="header-menu__lang-menu" v-if="isShowLangList">
        <ul class="header-menu__lang-menu__ul cpn-boxzero cpn-inBlock-row">
          <li class="header-menu__lang-menu__ul__li" v-for="langItem in langList" :key="langItem.Lst_Locales_Code">
            <a
              href="javascript:;"
              class="header-menu__lang-menu__ul__li__link"
              :id="idMapper.header[langItem.Lst_Locales_Code]"
              v-if="langItem.Lst_Locales_Code != lang && langItem.Lst_Is_Enable"
              :class="langItem.Lst_Locales_Code"
              @click="changeLang(langItem.Lst_Locales_Code)"
            ></a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import idMapper from '@/idMapper';

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
      idMapper: idMapper,
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

.header-menu {
  &__lang-toggle {
    display: inline-block;
    width: 73px;
    height: 60px;
    position: absolute;
    top: 30%;
    right: 20px;
  }

  &__lang-menu {
    width: 90px;
    overflow: hidden;
    position: absolute;
    top: 141px;
    right: 12px;
    z-index: 2;

    &__ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;

      &__li {
        display: inline-block;
        margin: 10px auto;

        &__link {
          display: block;
          background: no-repeat center top;
          color: #fff;
          font-size: 2.153em;
          width: 60px;
          padding-top: 65px;

          &.zh-tw {
            background-image: url(~@/assets/common/imgs/lang/lang_zh-tw_s.png);
          }
          &.zh-cn {
            background-image: url(~@/assets/common/imgs/lang/lang_zh-cn_s.png);
          }
          &.en-us {
            background-image: url(~@/assets/common/imgs/lang/lang_en-us_s.png);
          }
          &.th-th {
            background-image: url(~@/assets/common/imgs/lang/lang_th-th_s.png);
          }
          &.my-mm {
            background-image: url(~@/assets/common/imgs/lang/lang_my-mm_s.png);
          }
        }
      }
    }
  }
}

.en-us {
  .header-menu__lang-toggle {
    background: url(~@/assets/common/imgs/lang/lang_en-us_s.png) center center no-repeat;
  }
}

.th-th {
  .header-menu__lang-toggle {
    background: url(~@/assets/common/imgs/lang/lang_th-th_s.png) center center no-repeat;
  }
}

.zh-cn {
  .header-menu__lang-toggle {
    background: url(~@/assets/common/imgs/lang/lang_zh-cn_s.png) center center no-repeat;
  }
}
</style>
