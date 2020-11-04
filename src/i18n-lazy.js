import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import messages from '@/locales/en-us.json'
// import axios from 'axios'
// import settings from '@/settings'

Vue.use(VueI18n);

export const i18n = new VueI18n({});

//* 已載入過的語言列表
const loadedLanguages = [];

//* 可以選擇預設載入一種語言，不過此專案的預設語系是後端傳 set-cookie 來的
// export const i18n = new VueI18n({
//   locale: defaultLang, // set locale
//   fallbackLocale: defaultLang,
//   messages: messages
// })

function setI18nLanguage(lang) {
  i18n.locale = lang;
  // axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export async function loadLanguageAsync(lang) {
  //* 若是與現在相同的語言
  if (i18n.locale === lang) {
    return setI18nLanguage(lang);
  }

  //* 若是已載入的語言
  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  //* 載入語言
  const messages = await import(`@/locales/${lang}.json`);
  i18n.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);

  //* 官方原做法
  // return import(`@/locales/${lang}.json`).then(
  //   messages => {
  //     i18n.setLocaleMessage(lang, messages.default)
  //     loadedLanguages.push(lang)
  //     return setI18nLanguage(lang)
  //   }
  // )
}

export default i18n;
