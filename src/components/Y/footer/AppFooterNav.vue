<template>
  <div class="footer-nav">
    <div
      class="footer-nav__item"
      :class="[{ active: $route.name == item.link || item.otherActivePath.includes($route.name) }, item.name]"
      :id="$idMapper.footer[item.name]"
      v-for="item in routerList"
      :key="item.name"
    >
      <router-link :to="{ name: item.link }" class="footer-nav__item__link">
        {{ $te(`footer.${item.name}`) ? $t(`footer.${item.name}`) : item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routerList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-nav {
  display: flex;
  &__item {
    width: 25%;
    height: 119px;

    &__link {
      display: block;
      text-align: center;
      color: #fff;

      &:lang(en-us) {
        font-size: 26px;
        line-height: 170px;
      }

      &:lang(th-th) {
        font-size: 30px;
        line-height: 170px;
      }

      &:lang(zh-cn) {
        font-size: 32px;
        line-height: 170px;
      }
    }

    &.member {
      background-position: 0px 6px;
    }
    &.login {
      background-position: 25% 6px;
    }
    &.promotion {
      background-position: 50% 6px;
    }
    &.contact {
      background-position: 75% 6px;
    }
    &.transaction {
      background-position: 97% 6px;
    }

    &:after {
      content: '';
      display: inline-block;
      width: 5px;
      height: 119px;
      position: absolute;
      top: 0;
    }
    &:first-child:after {
      background: none;
    }
  }
}
</style>
