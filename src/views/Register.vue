<template>
  <div class="lay-are-pageContent register">
    <form @submit.prevent="register">
      <div class="are-auth">
        <div class="blk-auth blk-recommend">
          <input
            class="ipt-auth"
            id="Add_RelatedAccount"
            type="text"
            name="Add_RelatedAccount"
            placeholder="Refferrer"
            size="20"
          />
        </div>
        <div class="blk-notice">If there is no referrer,you are not required to fill in</div>
        <div class="blk-auth blk-account">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-auth blk-password">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-auth blk-password blk-passwordCon">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-auth blk-callphone">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-notice">
          This is for contact channel of account and supprise preferential informing, please kindly provide the real
          information.
        </div>
        <div class="blk-auth blk-name blk-mail">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-notice">
          This is for supprise preferential informing, please kindly provide the real information.
        </div>
        <div class="blk-auth blk-name">
          <span class="ui-txt-star txt-auth-star"></span>
          <input
            class="ipt-auth"
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
        <div class="blk-notice">
          This is for supprise preferential informing, please kindly provide the real information.
        </div>
        <div class="blk-auth blk-name">
          <span class="ui-txt-star txt-auth-star"> * </span>
          <input
            class="ipt-auth"
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
        <div class="blk-auth blk-name">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth"
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
        <div class="blk-notice">
          It is necessary to be identical with your bank account, otherwise it cannot make outward remittance.
        </div>
        <div class="blk-auth blk-name">
          <span class="ui-txt-star txt-auth-star"> </span>
          <input
            class="ipt-auth"
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
        <div class="blk-auth blk-code">
          <span class="ui-txt-star txt-auth-star">*</span>
          <input
            class="ipt-auth ipt-auth-code"
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
      <div class="are-control">
        <button type="submit" id="btnSubmit" class="ui-btn01 btn-send">Submit</button>
        <button type="reset" id="btnReset" class="ui-btn02 btn-reset">Reset</button>
        <ol class="ol-notice">
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
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Register',
  computed: {
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
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
  mounted() {
    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/register.scss`);
  },
  methods: {
    register() {
      console.log('register');
    },
  },
};
</script>

<style scoped>
/* .reg-main > */

.are-auth {
  width: 563px;
  margin: 0 auto;
  padding-top: 88px;
}
.are-control {
  width: 666px;
  margin: 50px auto 0;
}
/* .reg-main > .are-auth > */
.blk-auth {
  height: 81px;
  background-repeat: no-repeat;
  margin-top: 30px;
  padding-left: 80px;
  position: relative;
}
.blk-recommend {
  margin-top: 0;
}
.blk-notice {
  margin: 5px 0;
  /* color: #959595; */
  font-size: 2em;
}

/* .reg-main > .are-auth > .blk-auth */
.txt-auth-star {
  font-size: 2.5em;
  position: absolute;
  top: 20px;
  left: -25px;
}
.ipt-auth {
  width: 465px;
  height: 64px;
  background-color: transparent;
  margin: 8px 0 9px;
  padding: 0 3px;
  border: none;
  outline: none;
  font-size: 2.5em;
}
.ipt-auth-code {
  width: 315px;
  padding-right: 153px;
}
.blk-code > a {
  position: absolute;
  top: 11px;
  right: 15px;
}
/* .reg-main > .are-control > */
.btn-send,
.btn-reset {
  margin: 0 10px;
}
.ol-notice {
  margin: 50px 10px 0;
  /* color: #959595; */
  font-size: 2.153em;
}
</style>
