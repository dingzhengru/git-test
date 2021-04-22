<template>
  <AppModal @close="$emit('close')">
    <!-- <div class="modal-deposit-third-party" :style="{ width: `${width}px`, height: `${height}px` }"> -->

    <div class="modal-deposit-third-party" :class="{ landscape: isLandscape }">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <iframe id="deposit-iframe" :src="src" width="100%" height="100%" v-show="!isOrderSuccess"></iframe>
      <div class="modal-deposit-third-party__content" v-show="isOrderSuccess">
        {{ $t('transaction.deposit.third-party.success') }}
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinMessageC from '@/mixins/messageC';
export default {
  name: 'ModalMessage',
  mixins: [mixinMessageC],
  props: {
    src: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 720,
    },
    height: {
      type: Number,
      default: 720,
    },
    isOrderSuccess: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['isLandscape']),
  },
  // methods: {
  //   setSize() {
  //     if(this.width <= window.innerWidth) {

  //     }

  //     if(this.height <= window.innerHeight) {

  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.modal-deposit-third-party {
  background: white;
  width: 90vw;
  height: 90vh;
  position: relative;

  display: flex;
  justify-items: center;
  align-items: center;

  &.landscape {
    width: 90vh;
    height: 90vw;
    transform: rotate(-90deg);
  }

  // .ui-box-close {
  //   background: gray;

  //   &::after,
  //   &::before {
  //     background: white;
  //   }
  // }

  &__content {
    width: 100%;
    text-align: center;
    font-size: 2.5rem;
  }
}
</style>
