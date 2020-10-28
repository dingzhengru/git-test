import { extend } from 'vee-validate';
import { required, regex, email, max, min, image } from 'vee-validate/dist/rules';

//* 已寫好可引入的規則: https://logaretm.github.io/vee-validate/guide/rules.html

//* message 可用放方法，且第一個參數會是 name，即可實現根據 name 回傳不同訊息

extend('required', {
  ...required,
  computesRequired: true, //* 會於空值的時候依舊觸發 validate (預設是空值時不會)
  message: name => {
    return `[${name}]required: error-message`;
  },
});

extend('regex', {
  ...regex,
  message: 'regex: error-message',
});

extend('email', {
  ...required,
  message: 'email: error-message',
});

extend('max', {
  ...max,
  message: 'max: error-message',
});

extend('min', {
  ...min,
  message: 'min: error-message',
});

extend('image', {
  ...image,
  message: 'image: error-message',
});

extend('check-username', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[username-check] ${field}: ${value}`;
  },
});

extend('check-real-name', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[real-name-check] ${field}: ${value}`;
  },
});

extend('check-mobile', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-email', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-skype', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-qq', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-bank-account-1', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-bank-account-2', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});

extend('check-bank-account-3', {
  params: ['field'],
  validate: async (value, { field }) => {
    return `[mobile-check] ${field}: ${value}`;
  },
});
