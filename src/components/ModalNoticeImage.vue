<template>
  <AppModal @click.native="$emit('close')" :class="{ landscape: siteIsLandscape }">
    <div class="modal-notice-image">
      <div class="ui-box-close" @click="$emit('close')"></div>

      <div class="modal-notice-image__container" :class="{ landscape: siteIsLandscape }">
        <img :src="image" alt="" @click.stop="imageClickHandler" />
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
    max-height: 90vh;
  }

  &.landscape {
    img {
      max-height: 90vw;
    }
  }
}
</style>
