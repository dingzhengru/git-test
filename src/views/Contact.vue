<template>
  <div class="lay-are-pageContent">
    <div class="theme-content-box are-contact">
      <ul class="cpn-boxzero cpn-inBlock-row ul-contact">
        <li class="li-contact">
          <a href="javascript:" class="lnk-contact lnk-contact-service" onclick="CSBind()">Online Customer Service</a>
        </li>
        <li class="li-contact">
          <a
            href="https://www.facebook.com/pg/lionking88.net/posts/?ref=page_internal"
            target="_blank"
            class="lnk-contact lnk-contact-facebook"
            >Facebook</a
          >
        </li>
        <li class="li-contact">
          <a href="javascript:" class="lnk-contact lnk-contact-mobile">Mobile</a>
          <div class="blk-tel">
            <a href="tel:0854591000" class="lnk-contact-tel">085-459-1000</a><br />
            <a href="tel:0854592000" class="lnk-contact-tel">085-459-2000</a><br />
            <a href="tel:0854593000" class="lnk-contact-tel">085-459-3000</a><br />
          </div>
        </li>
        <li class="li-contact"><a href="skype:info.lionking88?call" class="lnk-contact lnk-contact-skype">Skype</a></li>
        <li class="li-contact" style="display:none">
          <a href="javascript:" class="lnk-contact lnk-contact-qq">QQ</a>
          <div class="blk-qq">
            <a href="tencent://message/?uin=1448366105&amp;Menu=yes" class="lnk-contact-qq2">1448366105</a><br />
            <a href="tencent://message/?uin=1279982976&amp;Menu=yes" class="lnk-contact-qq2">1279982976</a><br />
            <a href="tencent://message/?uin=2272806809&amp;Menu=yes" class="lnk-contact-qq2">2272806809</a>
          </div>
        </li>
        <li class="li-contact">
          <a href="http://line.me/ti/p/tIOnYUNLTa" class="lnk-contact lnk-contact-line">lionking_88</a>
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
    ...mapGetters(['type']),
  },
  mounted() {
    import(`@/styles/Y/common/service.css`);
    import(`@/styles/${this.type}/service.scss`);
  },
};
</script>

<style scoped>
</style>
