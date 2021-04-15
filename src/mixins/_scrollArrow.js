export default {
  name: 'MixinScrollArrow',
  data() {
    return {
      isShowLeftArrow: false,
      isShowRightArrow: false,
      isShowTopArrow: false,
      isShowBottomArrow: false,
    };
  },
  methods: {
    handelScrollArrowX(element) {
      if (!element) {
        return;
      }
      const hasScroll = element.scrollWidth > element.offsetWidth;
      if (!hasScroll) {
        this.resetArrowX();
        return;
      }

      const scrollInnerWidth = element.scrollWidth - element.offsetWidth;

      if (element.scrollLeft > 0) {
        this.isShowLeftArrow = true;
      } else {
        this.isShowLeftArrow = false;
      }

      if (element.scrollLeft === scrollInnerWidth) {
        this.isShowRightArrow = false;
      } else {
        this.isShowRightArrow = true;
      }
    },
    handelScrollArrowY(element) {
      if (!element) {
        return;
      }
      const hasScroll = element.scrollWidth > element.offsetWidth;
      if (!hasScroll) {
        this.resetArrowY();
        return;
      }

      const scrollInnerHeight = element.scrollHeight - element.offsetHeight;

      if (element.scrollTop > 0) {
        this.isShowTopArrow = true;
      } else {
        this.isShowTopArrow = false;
      }

      if (element.scrollTop === scrollInnerHeight) {
        this.isShowBottomArrow = true;
      } else {
        this.isShowBottomArrow = false;
      }
    },
    resetArrowX() {
      this.isShowLeftArrow = false;
      this.isShowRightArrow = false;
    },
    resetArrowY() {
      this.isShowTopArrow = false;
      this.isShowBottomArrow = false;
    },
  },
};
