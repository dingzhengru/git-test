<template>
  <div class="register">
    <form class="register--form" @submit.prevent="register">
      <div class="register--form--input-group">
        <div class="register--form--input-group--div register--form--input-group--div__recommend">
          <input
            class="register--form--input-group--div--input"
            id="Add_RelatedAccount"
            type="text"
            name="Add_RelatedAccount"
            placeholder="Refferrer"
            size="20"
          />
        </div>
        <div class="register--form--input-group--notice">If there is no referrer,you are not required to fill in</div>
        <div class="register--form--input-group--div register--form--input-group--div__account">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_Account"
            type="text"
            name="Add_Account"
            placeholder="Account No."
            maxlength="11"
            size="20"
            title="Please enter your account"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorAccount">
          <span class="theme-txt-errorMsg">{{ errorAccount }}</span>
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__password">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_Password"
            type="password"
            name="Add_Password"
            placeholder="Password"
            size="20"
            title="Please enter your passwords"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorPassword">
          <span class="theme-txt-errorMsg">{{ errorPassword }}</span>
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__password blk-passwordCon">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_PasswordCheck"
            type="password"
            name="Add_PasswordCheck"
            placeholder="Confirm Password"
            size="20"
            title="Please reconfirm your passwords"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorPasswordCheck">
          <span class="theme-txt-errorMsg">{{ errorPasswordCheck }}</span>
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__callphone">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_Mobile"
            type="tel"
            name="Add_Mobile"
            placeholder="Mobile number"
            maxlength="20"
            size="20"
            title="Please enter your phone number"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorMobile">
          <span class="theme-txt-errorMsg">{{ errorMobile }}</span>
        </div>
        <div class="register--form--input-group--notice">
          This is for contact channel of account and supprise preferential informing, please kindly provide the real
          information.
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__name">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_Email"
            type="text"
            name="Add_Email"
            placeholder="E-mail"
            maxlength="50"
            size="20"
            title="Please enter your E-mail"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorEmail">
          <span class="theme-txt-errorMsg">{{ errorEmail }}</span>
        </div>
        <div class="register--form--input-group--notice">
          This is for supprise preferential informing, please kindly provide the real information.
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__name">
          <span class="ui-txt-star register--form--input-group--div--star"></span>
          <input
            class="register--form--input-group--div--input"
            id="Add_Line"
            type="text"
            name="Add_Line"
            placeholder="ID LINE"
            maxlength="50"
            size="20"
            title="Please enter your LINE"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorLine">
          <span class="theme-txt-errorMsg">{{ errorLine }}</span>
        </div>
        <div class="register--form--input-group--notice">
          This is for supprise preferential informing, please kindly provide the real information.
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__name">
          <span class="ui-txt-star register--form--input-group--div--star"> * </span>
          <input
            class="register--form--input-group--div--input"
            id="Add_FirstName"
            type="text"
            name="Add_FirstName"
            placeholder="First Name"
            maxlength="70"
            size="20"
            title="Please enter your first &amp; last name"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorFirstName">
          <span class="theme-txt-errorMsg">{{ errorFirstName }}</span>
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__name">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input"
            id="Add_LastName"
            type="text"
            name="Add_LastName"
            placeholder="Last Name"
            maxlength="70"
            size="20"
            title="Please enter your first &amp; last name"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorLastName">
          <span class="theme-txt-errorMsg">{{ errorLastName }}</span>
        </div>
        <div class="register--form--input-group--notice">
          It is necessary to be identical with your bank account, otherwise it cannot make outward remittance.
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__name">
          <span class="ui-txt-star register--form--input-group--div--star"> </span>
          <input
            class="register--form--input-group--div--input"
            id="Add_NickName"
            type="text"
            name="Add_NickName"
            placeholder="Nickname"
            maxlength="70"
            size="20"
            title="Please enter your nickname"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorNickname">
          <span class="theme-txt-errorMsg">{{ errorNickname }}</span>
        </div>
        <div class="register--form--input-group--div register--form--input-group--div__code">
          <span class="ui-txt-star register--form--input-group--div--star">*</span>
          <input
            class="register--form--input-group--div--input register--form--input-group--div--input__captcha"
            id="Add_CaptchaValue"
            type="tel"
            name="CaptchaValue"
            placeholder="Captcha"
          />
        </div>
        <div class="theme-errorMsg" v-if="errorCaptcha">
          <span class="theme-txt-errorMsg">{{ errorCaptcha }}</span>
        </div>
      </div>
      <div class="register--form--button-group">
        <button type="submit" id="btnSubmit" class="ui-btn01 register--form--button-group--button__send">Submit</button>
        <button type="reset" id="btnReset" class="ui-btn02 register--form--button-group--button__reset">Reset</button>
      </div>
    </form>
    <div class="register--notice">
      <ol class="register--notice--ol">
        <li>
          Remark with<span class="ui-txt-star">*</span>are required items, please be sure to fill in them correctly.
        </li>
        <li>
          Customer who knows our website through our client introduction, please kindly write the referee code at
          referral column
        </li>
        <li>Any questions toward member registration, please feel free to contact our online service</li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Register',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      recommend: '',
      account: '',
      password: '',
      passwordCheck: '',
      mobile: '',
      email: '',
      line: '',
      firstName: '',
      lastName: '',
      nickname: '',
      captcha: '',
      errorAccount: '',
      errorPassword: '',
      errorPasswordCheck: '',
      errorMobile: '',
      errorEmail: '',
      errorLine: '',
      errorFirstName: '',
      errorLastName: '',
      errorNickname: '',
      errorCaptcha: '',
    };
  },
  methods: {
    register() {
      console.log('register');
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/register.scss`);
      },
    },
  },
};
</script>

<style scoped>
.register {
  padding-bottom: 160px;
}

.register--form--input-group {
  width: 563px;
  margin: 0 auto;
  padding-top: 88px;
}

.register--form--button-group {
  text-align: center;
  margin-top: 50px;
}

.register--notice {
  margin: 0 20px;
}

.register--form--input-group--div {
  height: 81px;
  background-repeat: no-repeat;
  margin-top: 30px;
  padding-left: 80px;
  position: relative;
}

.register--form--input-group--div__recommend {
  margin-top: 0;
}
.register--form--input-group--notice {
  margin: 5px 0;
  font-size: 2em;
}

.register--form--input-group--div--star {
  font-size: 2.5em;
  position: absolute;
  top: 20px;
  left: -25px;
}
.register--form--input-group--div--input {
  width: 465px;
  height: 64px;
  background-color: transparent;
  margin: 8px 0 9px;
  padding: 0 3px;
  border: none;
  outline: none;
  font-size: 2.5em;
}
.register--form--input-group--div--input__captcha {
  width: 315px;
  padding-right: 153px;
}
/* .register--form--input-group--div--input__captcha > a {
  position: absolute;
  top: 11px;
  right: 15px;
} */

.register--form--button-group--button__send,
.register--form--button-group--button__reset {
  margin: 0 10px;
}
.register--notice--ol {
  margin: 50px 10px 0;
  font-size: 2.153em;
}
</style>
