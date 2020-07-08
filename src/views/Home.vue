<template>
  <div>
    <HomeSwiper></HomeSwiper>
  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/Y/home/HomeSwiper')
  },
};
</script>
