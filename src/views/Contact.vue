<template>
  <div class="lay-are-pageContent">
    <div class="theme-content-box are-contact">
      <ul class="cpn-boxzero cpn-inBlock-row ul-contact">
        <li class="li-contact" v-if="contact.service.isActive">
          <a href="javascript:;" class="lnk-contact lnk-contact-service">
            Online Customer Service
          </a>
        </li>

        <!-- <li class="li-contact">
          <a href="javascript:;" class="lnk-contact lnk-contact-service" onclick="CSBind()">Online Customer Service</a>
        </li> -->
        <li class="li-contact" v-if="contact.facebook.isActive">
          <a :href="contact.facebook.link" target="_blank" class="lnk-contact lnk-contact-facebook">Facebook</a>
        </li>
        <li class="li-contact" v-if="contact.mobile.isActive">
          <a
            href="javascript:;"
            class="lnk-contact lnk-contact-mobile"
            @click="isShowMobileTelephones = !isShowMobileTelephones"
            @blur="isShowMobileTelephones = false"
            >Mobile</a
          >
          <transition name="fade">
            <div class="blk-tel" v-if="isShowMobileTelephones">
              <a class="lnk-contact-tel" :href="`tel:${tel}`" v-for="tel in contact.mobile.telephones" :key="tel">
                {{ tel }}
              </a>
            </div>
          </transition>
        </li>
        <li class="li-contact" v-if="contact.skype.isActive">
          <a :href="contact.skype.link" class="lnk-contact lnk-contact-skype">Skype</a>
        </li>
        <!-- <li class="li-contact">
          <a href="javascript:;" class="lnk-contact lnk-contact-qq">QQ</a>
          <div class="blk-qq">
            <a href="tencent://message/?uin=1448366105&amp;Menu=yes" class="lnk-contact-qq2">1448366105</a><br />
            <a href="tencent://message/?uin=1279982976&amp;Menu=yes" class="lnk-contact-qq2">1279982976</a><br />
            <a href="tencent://message/?uin=2272806809&amp;Menu=yes" class="lnk-contact-qq2">2272806809</a>
          </div>
        </li> -->
        <li class="li-contact" v-if="contact.line.isActive">
          <a :href="contact.line.link" class="lnk-contact lnk-contact-line">{{ contact.line.name }}</a>
        </li>
        <li class="li-contact" v-if="contact.wechat.isActive">
          <a :href="contact.wechat.link" class="lnk-contact lnk-contact-wechat">{{ contact.wechat.name }}</a>
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
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
  mounted() {
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    // import(`@/styles/${this.templateType}/common/contact.css`);
    import(`@/styles/${templatePath}/contact.scss`);
  },
};
</script>

<style scoped>
.lnk-contact-tel {
  display: block;
}

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

/*
  * contact.css
*/

/* .reg-main > */
.ul-service {
  text-align: center;
}
.li-service {
  width: 225px;
  background-repeat: no-repeat;
  background-position: center top;
  padding: 0 57px;
  border-right: 1px dotted #535353;
}
.li-service:last-child {
  border-right: none;
}
.li-service-download {
  background-position: center 20px;
}
.lnk-service {
  display: inline-block;
  display: inline;
  zoom: 1;
  padding-top: 99px;
  color: #000;
  font-size: 2.461em;
  text-align: center;
}
/* .are-contact {
  margin: 80px;
} */
/* .reg-main > .are-contact > */
.li-contact {
  margin: 31px 20px;
  position: relative;
}
.lnk-contact {
  display: block;
  width: 198px;
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 115px;
  font-size: 2.461em;
  text-align: center;
  word-break: break-all;
}

.blk-qq,
.blk-skype,
.blk-tel {
  width: 328px;
  height: 286px;
  text-align: center;
  position: absolute;
  top: 165px;
  left: -99px;
  z-index: 2;
}
.lnk-contact-qq2,
.lnk-contact-skype2 {
  font-size: 3.23em;
  line-height: 95px;
}
.lnk-contact-tel {
  font-size: 2.461em;
  line-height: 65px;
}

</style>
