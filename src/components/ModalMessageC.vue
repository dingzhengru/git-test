<template>
  <ModalMessage @close="$emit('close')" v-if="messageListFiltered.length > 0">
    <div class="modal-message-c" :class="{ landscape: siteIsLandscape }">
      <p
        class="modal-message-c__text"
        :class="{ landscape: siteIsLandscape }"
        v-for="(item, index) in messageListFiltered"
        :key="index"
      >
        {{ item.Lst_Content }}
      </p>
      <!-- <button @click="$emit('close')">OK</button> -->
    </div>
  </ModalMessage>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinMessageC from '@/mixins/messageC';
export default {
  name: 'ModalMessageC',
  mixins: [mixinMessageC],
  components: {
    ModalMessage: () => import('@/components/ModalMessage'),
  },
  computed: {
    ...mapGetters(['siteIsLandscape']),
  },
};
</script>

<style lang="scss" scoped>
.modal-message-c {
  button {
    display: block;
    margin: 35px 0 0 auto;
    padding: 15px 30px;
    font-size: 1.5rem;
    color: #000;
    border: none;
  }

  &__text {
    text-align: center;
    color: #636363;
    font-size: 2rem;
    margin: 15px 0 15px;

    &.landscape {
      font-size: 1.5rem;
      margin: 0 5px;
    }
  }
}
</style>
