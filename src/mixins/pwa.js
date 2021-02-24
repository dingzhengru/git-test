import { mapGetters } from 'vuex';
import { isStandaloneMode, isIos, isMobile, isChrome } from '@/utils/device';

export default {
  computed: {
    ...mapGetters(['pwaInstallStatus', 'pwaPrompt', 'pwaInstallTime']),
  },
  methods: {
    initPwa() {
      if (!isStandaloneMode() && !isIos() && isMobile() && isChrome()) {
        this.$store.commit('pwa/setIsShowButton', true);
      }

      //* PWA 一秒後沒觸發 beforeinstallprompt 的話，就視為已下載
      setTimeout(() => {
        if (!this.pwaInstallStatus) {
          this.$store.commit('pwa/setStatus', 'installed');
        }
      }, 1000);

      //* beforeinstallprompt
      window.addEventListener('beforeinstallprompt', event => {
        console.log('beforeinstallprompt event');

        //* 能進來此事件代表: 未安裝 pwa
        this.$store.commit('pwa/setStatus', 'notInstalled');

        event.preventDefault();
        this.$store.commit('pwa/setPrompt', event);

        // pwa下載視窗的選擇處理
        this.pwaPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            this.$store.commit('pwa/setStatus', 'installing');

            //* X秒後設為已下載，因目前無事件可以確認是否安裝完成
            setTimeout(() => {
              this.$store.commit('pwa/setStatus', 'installed');
            }, 1000 * this.pwaInstallTime);
          }
        });
      });
    },
    clickPwaHandler() {
      if (this.pwaInstallStatus == 'notInstalled') {
        this.pwaPrompt.prompt();
      } else if (this.pwaInstallStatus == 'installed') {
        window.open(location.origin);
      }
    },
  },
};
