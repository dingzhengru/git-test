<template>
  <!-- <div class="ui-overlay"></div> -->
  <div class="contact-service-dialog-wrapper">
    <div class="contact-service-dialog">
      <header class="contact-service-dialog__header">
        支援
        <span class="contact-service-dialog__header__close" @click="$emit('close')">
          ー
        </span>
      </header>
      <main class="contact-service-dialog__main">
        <p>
          ขออภัย ที่เราทำ ไม่ได้ออนไลน์ กรุณา ฝากข้อความ เราจะติดต่อ คุณเร็ว ๆ นี้
        </p>
        <form class="contact-service-dialog__main__form" @submit.prevent="submitContact">
          <div class="contact-service-dialog__main__form__field">
            <label for="">{{ $t('contact.dialog.field.username.label') }} * </label>
            <input
              type="text"
              :placeholder="$t('contact.dialog.field.username.placeholder')"
              required
              v-model="username.value"
              @input="inputField(username)"
            />
            <div
              class="theme-errorMsg contact-service-dialog__main__form__field__error"
              v-if="username.error"
            >
              {{ username.error }}
            </div>
          </div>
          <div class="contact-service-dialog__main__form__field">
            <input
              type="email"
              :placeholder="$t('contact.dialog.field.email.placeholder')"
              required
              v-model="email.value"
              @input="inputField(email)"
            />
            <div
              class="theme-errorMsg contact-service-dialog__main__form__field__error"
              v-if="email.error"
            >
              {{ email.error }}
            </div>
          </div>
          <div class="contact-service-dialog__main__form__field">
            <label for="">訊息 * </label>
            <textarea required v-model="message.value" @input="inputField(message)"></textarea>
            <div
              class="theme-errorMsg contact-service-dialog__main__form__field__error"
              v-if="message.error"
            >
              {{ message.error }}
            </div>
          </div>
          <div class="contact-service-dialog__main__form__bottom">
            <button type="submit">傳送訊息</button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactServiceDialog',
  props: {
    siteName: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      username: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
      message: {
        value: '',
        error: '',
      },
    };
  },
  methods: {
    submitContact() {
      console.log('[SubmitContact]');
    },
    inputField(field) {
      if (field.value == '') {
        field.error = this.$t('contact.dialog.field.username.error.required');
      } else {
        field.error = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-service-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background-color: transparent;

  .contact-service-dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    overflow: auto;
    z-index: 9999;
    font-size: 2rem;
    background-color: white;
    color: black;

    &__header {
      position: relative;
      height: 80px;
      background-color: #555555;
      color: #bababa;
      text-align: center;
      vertical-align: middle;
      font-size: 2.5rem;
      line-height: 6rem;

      &__close {
        display: inline-block;
        position: absolute;
        width: 44px;
        height: 100%;
        right: 0;
        bottom: 0;
        top: 0;
        font-size: 3rem;
        padding-right: 2%;
        font-weight: bold;
      }
    }
    &__main {
      padding: 0 75px;

      &__form {
        &__field {
          margin-bottom: 20px;

          label {
            display: block;
            margin-bottom: 10px;
          }

          input {
            display: block;
            width: 100%;
            height: 60px;
            border-style: solid;
            border-color: #ddd;
            border-radius: 10px;
            padding: 0 15px;
          }

          textarea {
            display: block;
            width: 100%;
            max-width: 100%;
            min-height: 150px;
            max-height: 60vh;
            border-style: solid;
            border-color: #ddd;
            border-radius: 10px;
            padding: 15px 15px;
          }

          &__error {
            color: white;
          }
        }

        &__bottom {
          margin-top: 60px;

          button {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            color: #ffffff;
            // background-color: #555555;
            background-color: #aaaaaa;
            border-width: 1px;
            border-style: solid;
            border-color: #3e3e3e;
            border-radius: 10px;
            padding: 15px 3px;
          }
        }
      }
    }
  }
}
</style>
