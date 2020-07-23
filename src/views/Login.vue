<template>
  <div class="login">
    <h1 class="ui-h1-pageTitle">Member Login</h1>
    <div class="are-auth">
      <form id="LoginForm" @submit.prevent="login">
        <div class="blk-auth blk-account">
          <input
            class="ipt-auth"
            id="UserName"
            type="text"
            name="UserName"
            tabindex="1"
            placeholder="Account"
            v-model="user.username"
          />
        </div>
        <div class="blk-auth blk-password">
          <input
            class="ipt-auth"
            id="Password"
            type="password"
            name="Password"
            tabindex="2"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
        <div class="blk-auth blk-code">
          <input
            class="ipt-auth ipt-auth-code"
            id="CaptchaValue"
            type="tel"
            name="CaptchaValue"
            tabindex="3"
            placeholder="Captcha"
            maxlength="4"
            autocomplete="off"
            v-model="user.captcha"
          />
          <input type="hidden" name="_mvcCaptchaGuid" id="_mvcCaptchaGuid" />
        </div>
        <div class="blk-auth blk-rememberme">
          <input class="ipt-auth" id="RememberMe" name="RememberMe" tabindex="4" type="checkbox" />
          <label class="ipt-auth" id="lbRememberMe" for="RememberMe">Remember Me</label>
        </div>
      </form>
      <router-link class="cpn-inBlock lnk-regist" id="register" :to="{ name: 'Register' }">Register</router-link>
      <router-link class="cpn-inBlock lnk-forget" id="forgetPwd" :to="{ name: 'ForgetPassword' }"
        >GetPassword</router-link
      >
      <button class="ui-btn01 ui-btn-long btn-login" id="loginbtn" type="submit" form="LoginForm">
        Login
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        captcha: '',
      },
    };
  },
  methods: {
    async login() {
      const token = await this.$store.dispatch('user/login', this.user);
      console.log(`[token]`, token);
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
        import(`@/styles/${this.siteFullCss}/login.scss`);
      },
    },
  },
};
</script>

<style scoped>
.login {
  padding-bottom: 119px;
}

.are-auth {
  width: 563px;
  margin: 0 auto;
  text-align: center;
}
/* .reg-main > .are-auth > */
.blk-auth {
  height: 81px;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  padding-left: 80px;
}
.blk-code {
  position: relative;
}

.lnk-regist,
.lnk-forget,
.lnk-open,
.lnk-download {
  /* width: 150px; */
  background-repeat: no-repeat;
  background-position: top center;
  padding: 134px 15px 0;
  margin-top: 35px;
  font-size: 2.46em;
}

.lnk-regist {
  width: 175px;
}

.lnk-forget {
  width: 200px;
}

.btn-login {
  display: block;
  margin: 20px auto;
}
/* .reg-main > .are-auth > .blk-auth */
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

.blk-rememberme {
  height: 70px;
  padding: 0;
  outline: none;
}
input#RememberMe {
  width: 35px;
  height: 27px;
  margin-left: 0;
  float: none;
}

.are-auth.closeRegist .lnk-regist {
  display: none;
}
.are-auth.closeRegist .lnk-forget {
  margin-left: 25%;
}
</style>
