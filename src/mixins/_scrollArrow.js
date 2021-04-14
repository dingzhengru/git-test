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
    handelScrollArrowX(event) {
      const target = event.target;
      const hasScroll = target.scrollWidth > target.offsetWidth;
      if (!hasScroll) {
        this.resetArrowX();
        return;
      }

      const scrollInnerWidth = target.scrollWidth - target.offsetWidth;

      if (target.scrollLeft > 0) {
        this.isShowLeftArrow = true;
      } else {
        this.isShowLeftArrow = false;
      }

      if (target.scrollLeft === scrollInnerWidth) {
        this.isShowRightArrow = false;
      } else {
        this.isShowRightArrow = true;
      }
    },
    handelScrollArrowY(event) {
      const target = event.target;
      const hasScroll = target.scrollWidth > target.offsetWidth;
      if (!hasScroll) {
        this.resetArrowY();
        return;
      }

      if (target.scrollTop > 0) {
        this.isShowTopArrow = true;
      } else {
        this.isShowTopArrow = false;
      }

      if (target.scrollBottom > 0) {
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
