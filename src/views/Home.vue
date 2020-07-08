<template>
  <div>
    <HomeSwiper></HomeSwiper>
    <HomeGameBlock></HomeGameBlock>
  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/Y/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/Y/home/HomeGameBlock')
  },
};
</script>
