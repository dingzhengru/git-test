<template>
  <div>
    <div class="ui-overlay"></div>
    <div class="deposit-dialog-wrapper" @click.self="$emit('close')">
      <div class="deposit-dialog">
        <div class="ui-box-close" @click="$emit('close')"></div>
        <div class="deposit-dialog__title" v-html="$t('transaction.deposit.dialog.title')"></div>
        <ul class="deposit-dialog__ul">
          <li class="deposit-dialog__li" v-html="$t('transaction.deposit.dialog.notice.currency')"></li>
          <li
            class="deposit-dialog__li"
            v-html="$t('transaction.deposit.dialog.notice.atm', { siteName: siteName })"
          ></li>
          <li class="deposit-dialog__li" v-html="$t('transaction.deposit.dialog.notice.violate')"></li>
        </ul>
        <div class="deposit-dialog__footer">
          <div v-html="$t('transaction.deposit.dialog.footer.content')"></div>
          <div class="deposit-dialog__footer__phone">
            <!-- <span class="ui-icon ui-icon-24"></span> -->
            <!-- <a href="javascript:;">24H Service</a> -->
            <span class="ui-icon ui-icon-phone"></span>
            <a href="tel:0808020369">0808020369</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DepositDialog',
  props: {
    siteName: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;

  .deposit-dialog {
    width: 70%;
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    overflow: auto;
    z-index: 9999;
    font-size: 2rem;
    padding: 40px 30px 20px 30px;

    &__title {
      margin-bottom: 30px;
      font-size: 2.5rem;
      text-align: center;
      font-weight: bold;
    }
    &__ul {
      text-align: left;
      list-style: decimal;
      color: #f1cb80;
      margin: 0;
    }
    &__footer {
      margin-top: 20px;
      color: #f1cb80;

      &__phone {
        font-size: 4rem;
        margin-top: 20px;

        & > a {
          color: #fffeb3;
        }
      }
    }
  }
}
</style>

<style scoped>
/* .deposit-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
} */
/* .deposit-dialog {
  width: 70%;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  overflow: auto;
  z-index: 9999;
  font-size: 2rem;
  padding: 40px 30px 20px 30px;
} */
/* .deposit-dialog__title {
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
} */
/* .deposit-dialog__ul {
  text-align: left;
  list-style: decimal;
  color: #f1cb80;
  margin: 0;
} */
/* .deposit-dialog__li {} */
/* .deposit-dialog__footer {
  margin-top: 20px;
  color: #f1cb80;
} */
/* .deposit-dialog__footer__phone {
  font-size: 4rem;
  margin-top: 20px;
} */
/* .deposit-dialog__footer__phone > a {
  color: #fffeb3;
} */
</style>
