<template>
  <AppModal @click.native="$emit('close')">
    <div class="modal-notice-image">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <img :src="image" alt="" @click.stop="imageClickHandler" />
    </div>
  </AppModal>
</template>

<script>
import mixinLinkUrl from '@/mixins/linkUrl';
import { mapGetters } from 'vuex';

export default {
  name: 'ModalNoticeImage',
  mixins: [mixinLinkUrl],
  props: {
    image: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => '',
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['siteDepositNoticeUrl', 'siteNoticeLinkMain', 'siteNoticeLinkDeposit']),
  },
  methods: {
    imageClickHandler() {
      let linkType = '';
      let linkUrl = '';

      if (this.type === 'main') {
        linkType = this.siteNoticeLinkMain.LinkType;
        linkUrl = this.siteNoticeLinkMain.LinkType;
      } else if (this.type === 'deposit') {
        linkType = this.siteNoticeLinkDeposit.LinkType;
        linkUrl = this.siteNoticeLinkDeposit.LinkType;
      }

      if (!linkType || !linkUrl) {
        this.$emit('close');
        return;
      }

      this.goLinkUrlByTypeAndUrl(linkType, linkUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-notice-image {
  position: relative;

  img {
    max-height: 90vh;
  }
}
</style>
