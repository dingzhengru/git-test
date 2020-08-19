<template>
  <div class="contact" :class="{ 'contact-auth': isLoggedIn }">
    <div class="contact__content theme-content-box">
      <ul class="contact__content__ul">
        <li class="contact__content__ul__li" v-if="contact.service.isActive">
          <a href="javascript:;" class="contact__content__ul__li__link contact__content__ul__li__link--service">
            {{ $t('contact.service') }}
          </a>
        </li>
        <li class="contact__content__ul__li" v-if="contact.facebook.isActive">
          <a
            :href="contact.facebook.link"
            target="_blank"
            class="contact__content__ul__li__link contact__content__ul__li__link--facebook"
            >Facebook</a
          >
        </li>
        <li class="contact__content__ul__li" v-if="contact.mobile.isActive">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link contact__content__ul__li__link--mobile"
            @click="isShowMobileTelephones = !isShowMobileTelephones"
            @blur="isShowMobileTelephones = false"
            >Mobile</a
          >
          <transition name="fade">
            <div class="contact__content__ul__li__block--tel" v-if="isShowMobileTelephones">
              <a
                class="contact__content__ul__li__link--tel"
                :href="`tel:${tel}`"
                v-for="tel in contact.mobile.telephones"
                :key="tel"
              >
                {{ tel }}
              </a>
            </div>
          </transition>
        </li>
        <li class="contact__content__ul__li" v-if="contact.skype.isActive">
          <a :href="contact.skype.link" class="contact__content__ul__li__link contact__content__ul__li__link--skype"
            >Skype</a
          >
        </li>
        <!-- <li class="contact__content__ul__li">
          <a href="javascript:;" class="contact__content__ul__li__link contact__content__ul__li__link--qq">QQ</a>
          <div class="contact__content__ul__li__block--qq">
            <a href="tencent://message/?uin=1448366105&amp;Menu=yes" class="contact__content__ul__li__link--qq2">1448366105</a><br />
            <a href="tencent://message/?uin=1279982976&amp;Menu=yes" class="contact__content__ul__li__link--qq2">1279982976</a><br />
            <a href="tencent://message/?uin=2272806809&amp;Menu=yes" class="contact__content__ul__li__link--qq2">2272806809</a>
          </div>
        </li> -->
        <li class="contact__content__ul__li" v-if="contact.line.isActive">
          <a :href="contact.line.link" class="contact__content__ul__li__link contact__content__ul__li__link--line">{{
            contact.line.name
          }}</a>
        </li>
        <li class="contact__content__ul__li" v-if="contact.wechat.isActive">
          <a
            :href="contact.wechat.link"
            class="contact__content__ul__li__link contact__content__ul__li__link--wechat"
            >{{ contact.wechat.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Contact',
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      contact: {
        service: {
          isActive: true,
        },
        facebook: {
          isActive: true,
          link: 'https://www.facebook.com/pg/lionking88.net/posts/?ref=page_internal',
        },
        mobile: {
          isActive: true,
          telephones: ['085-459-1000', '085-459-2000', '085-459-3000'],
        },
        skype: {
          isActive: true,
          link: 'skype:info.lionking88?call',
        },
        line: {
          isActive: true,
          link: 'http://line.me/ti/p/tIOnYUNLTa',
          name: 'lionking_88',
        },
        wechat: {
          isActive: true,
          link: 'http://weixin.qq.com/r/7Vbt4gzEXDIjhx2BnwPJ',
          name: 'lionking_88',
        },
      },
      isShowMobileTelephones: false,
    };
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/contact.scss`);
        
        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
/*
 * fade 顯示 telephones 區塊
*/

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.contact {
  padding-bottom: 119px;
}

.contact-auth {
  padding-top: 88px;
}

.contact__content {
  margin: 80px;
}

.contact__content__ul {
  padding: 0;
  margin: 0;
}

.contact__content__ul__li {
  display: inline-block;
  margin: 31px 20px;
  vertical-align: top;
  position: relative;
}

.contact__content__ul__li__link {
  display: block;
  width: 198px;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 115px;
  font-size: 2.461em;
  text-align: center;
  word-break: break-all;
}

.contact__content__ul__li__block--qq,
.contact__content__ul__li__block--skype,
.contact__content__ul__li__block--tel {
  width: 328px;
  height: 286px;
  text-align: center;
  position: absolute;
  top: 165px;
  left: -99px;
  z-index: 2;
}
.contact__content__ul__li__link--qq2,
.contact__content__ul__li__link--skype2 {
  font-size: 3.23em;
  line-height: 95px;
}
.contact__content__ul__li__link--tel {
  font-size: 2.461em;
  line-height: 65px;
  display: block;
}

/*
 * 共用圖片
*/

.contact__content__ul__li__link--online {
  background-image: url(~@/assets/common/imgs/main/onlineServicebg.png);
}
/* .li-service-download {
 background-image: url(~@/assets/common/imgs/main/downloadServicebg.png);
} */
.contact__content__ul__li__link--service {
  background-image: url(~@/assets/common/imgs/main/onlineServicebg.png);
}
.contact__content__ul__li__link--qq {
  background-image: url(~@/assets/common/imgs/main/qqBg.png);
}
.contact__content__ul__li__link--mobile {
  background-image: url(~@/assets/common/imgs/main/mobileBg.png);
}
.contact__content__ul__li__link--skype {
  background-image: url(~@/assets/common/imgs/main/skypeBg.png);
}
.contact__content__ul__li__link--line {
  background-image: url(~@/assets/common/imgs/main/lineBg.png);
}
.contact__content__ul__li__link--wechat {
  background-image: url(~@/assets/common/imgs/main/wechatBg.png);
}
.contact__content__ul__li__link--facebook {
  background-image: url(~@/assets/common/imgs/main/FacebookBg.png);
}
</style>
