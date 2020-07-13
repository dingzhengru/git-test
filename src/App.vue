<template>
  <div id="app" class="lay-container" :class="lang">
    <TypeYAppHeader v-if="!token"></TypeYAppHeader>
    <TypeYAppHeaderAuth v-if="token"></TypeYAppHeaderAuth>

    <div class="reg-main">
      <div class="lay-screen">
        <router-view />
      </div>
    </div>

    <TypeYAppFooter></TypeYAppFooter>

    <div class="Box" id="alertbox" v-if="isShowAlertBox">
      <div class="Boxinner">
        <h1 class="h1-tit">
          ** ประชาสัมพันธ์ : หากลูกค้าไม่ได้เข้าเล่นกับเว็ปเรานานเกิน 7 วัน
          รบกวนให้ติดต่อศูนย์บริการเพื่อติดต่อขอเลขบัญชีทุกครั้งด้วยนะคะ ขอบคุณค่ะ ------------------<br />
          CAESAR88 คาสิโนออนไลน์ บาคาร่า รูเล็ต ไฮโล สล็อตออนไลน์ ยิงปลา หมีแพนด้า ฟรีเกมส์ สมัครฟรี การเงิน มั่นคง
          ปลอดภัย ฝากถอนรวดเร็ว บริการตลอด 24 ชม.
        </h1>
        <button id="CloseAlert" class="lnk-boxSubmit" @click="isShowAlertBox = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    TypeYAppHeader: () => import('@/components/Y/AppHeader'),
    TypeYAppHeaderAuth: () => import('@/components/Y/AppHeaderAuth'),
    TypeYAppFooter: () => import('@/components/Y/AppFooter'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {
      isShowAlertBox: false,
    };
  },
  mounted() {
    // * 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', '/manifest01.json');

    // * 根據版型引入 css
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    import(`@/styles/${templatePath}/layout.scss`);
  },
};
</script>

<style></style>
