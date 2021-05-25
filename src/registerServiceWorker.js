import { register } from 'register-service-worker';
import i18n from '@/i18n-lazy';

let SW_FILE = '/sw.js';

//* 開發環境就不啟用
if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
  SW_FILE = '';
} else if (process.env.NODE_ENV === 'development') {
  SW_FILE = '/sw-development.js';
} else if (process.env.NODE_ENV === 'release') {
  SW_FILE = '/sw-release.js';
}

// const SW_FILE = '/sw-injectManifest.js';

register(SW_FILE, {
  ready() {
    console.log('App is being served from cache by a service worker.\n');
  },
  registered() {
    console.log('Service worker has been registered.');
  },
  cached() {
    console.log('Content has been cached for offline use.');
    window.alert(i18n.t('alert.versionUpdate'));
    window.location.reload();
  },
  updatefound() {
    console.log('New content is downloading.');
  },
  updated() {
    console.log('New content is available; please refresh.');
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.');
  },
  error(error) {
    console.error('Error during service worker registration:', error);
  },
});
