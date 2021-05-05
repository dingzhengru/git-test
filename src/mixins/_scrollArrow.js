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

      //* element.scrollLeft === 0，為最左端
      if (element.scrollLeft > 15) {
        this.isShowLeftArrow = true;
      } else {
        this.isShowLeftArrow = false;
      }

      //* scrollInnerHeight === element.scrollTop，代表最右端
      if (scrollInnerWidth - element.scrollLeft <= 15) {
        this.isShowRightArrow = false;
      } else {
        this.isShowRightArrow = true;
      }
    },
    handelScrollArrowY(element) {
      if (!element) {
        return;
      }
      const hasScroll = element.scrollHeight > element.offsetHeight;
      if (!hasScroll) {
        this.resetArrowY();
        return;
      }

      const scrollInnerHeight = element.scrollHeight - element.offsetHeight;

      //* element.scrollTop === 0，為最頂端
      if (element.scrollTop > 15) {
        this.isShowTopArrow = true;
      } else {
        this.isShowTopArrow = false;
      }

      //* scrollInnerHeight === element.scrollTop，代表最底端
      if (scrollInnerHeight - element.scrollTop <= 15) {
        this.isShowBottomArrow = false;
      } else {
        this.isShowBottomArrow = true;
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
