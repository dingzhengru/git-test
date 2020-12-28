<template>
  <ul class="home-game__ul">
    <li
      class="home-game__ul__li"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      :style="{ 'background-image': `url(${imgSrc(item)})` }"
    >
      <a class="home-game__ul__li__link" href="javascript:;" @click="handleGameLink(item)">
        {{ item.Lst_Name }}
      </a>

      <!-- 維修圖示 -->
      <a class="home-game__ul__li__link--maintain" href="javascript:;" v-show="item.Lst_Site_Product_Status != 0"></a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeGameBlock',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_Proxy_Tag}.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      gameClassMap: {
        gameclass01: '#gameGclub',
        gameclass02: '#gameRNG',
        gameclass03: '#gameSport',
      },
    };
  },
  methods: {
    handleGameLink(game) {
      if (this.userIsLoggedIn) {
        this.$emit('handleGameLink', game);
        return;
      }

      this.$router.push({ name: 'About', query: { scrollTo: this.gameClassMap[game.sURL] } });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-game {
  &__ul {
    padding: 20px 0 0 0;
    margin: 0 32px;

    &__li {
      position: relative;
      display: inline-block;
      vertical-align: top;
      margin: 0 2px 10px;
      background-repeat: no-repeat;
      background-position: center top;
      opacity: 1;

      &__link {
        display: block;
        width: 213px;
        height: 170px;
        padding-top: 111px;
        font-size: 2.4em;
        text-align: center;

        &--maintain {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
          user-select: none;
          pointer-events: none;
          z-index: 3;
        }

        &:lang(en-us) {
          font-size: 2em;
        }

        &:lang(th-th) {
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>
