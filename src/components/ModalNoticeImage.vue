<template>
  <AppModal @click.native="$emit('close')">
    <div class="modal-notice-image">
      <div class="ui-box-close" @click="$emit('close')"></div>

      <div class="modal-notice-image__container">
        <img :src="image" @click.stop="imageClickHandler" />
      </div>
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
    ...mapGetters(['siteDepositNoticeUrl', 'siteNoticeLinkMain', 'siteNoticeLinkDeposit', 'siteIsLandscape']),
  },
  methods: {
    imageClickHandler() {
      let linkType = '';
      let linkUrl = '';

      if (this.type === 'main') {
        linkType = this.siteNoticeLinkMain.LinkType;
        linkUrl = this.siteNoticeLinkMain.LinkUrl;
      } else if (this.type === 'deposit') {
        linkType = this.siteNoticeLinkDeposit.LinkType;
        linkUrl = this.siteNoticeLinkDeposit.LinkUrl;
      }

      if (!linkType || !linkUrl) {
        this.$emit('close');
        return;
      }

      const linkTarget = linkType === 1 ? '_blank' : '_self';

      this.goLinkUrlByTypeAndUrl(linkType, linkUrl, linkTarget);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-notice-image {
  position: relative;

  img {
    min-width: 50vw;
    min-height: 50vh;

    max-width: 90vw;
    max-height: 90vh;
  }
}
</style>
