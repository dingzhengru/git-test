<template>
  <AppModal>
    <div class="modal-message">
      <div class="modal-message__inner">
        <p class="modal-message__inner__text" v-for="(item, index) in messageList" :key="index">
          {{ item.Lst_Content }}
        </p>
        <button @click="$emit('close')">OK</button>
      </div>
    </div>
  </AppModal>
</template>

<script>
export default {
  name: 'ModalMessage',
  props: {
    messageList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
};
</script>

<style lang="scss" scoped>
.modal-message {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 35%;
  z-index: 5;

  button {
    display: block;
    margin: 35px 0 0 auto;
    padding: 15px 30px;
    font-size: 24px;
    color: #000;
    border: none;
  }

  &__inner {
    width: 80%;
    min-width: auto;
    padding: 25px;
    margin: 0 auto 10%;
    background-color: #fff;

    &__text {
      text-align: center;
      color: #636363;
      font-size: 2em;
      margin: 15px 0 15px;
    }
  }
}
</style>
