import { extend } from 'vee-validate';
import { required, regex, max, min, confirmed, min_value, max_value, image } from 'vee-validate/dist/rules';
import { i18n } from '@/i18n-lazy';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

//* 已寫好可引入的規則: https://logaretm.github.io/vee-validate/guide/rules.html

//* message 可用放方法，且第一個參數會是 name，即可實現根據 name 回傳不同訊息

extend('required', {
  ...required,
});

extend('min', {
  ...min,
});

extend('max', {
  ...max,
});

extend('min_value', {
  ...min_value,
});

extend('max_value', {
  ...max_value,
});

extend('regex', {
  ...regex,
});

extend('image', {
  ...image,
});

extend('object-not-empty', {
  validate: value => {
    return Object.keys(value).length > 0;
  },
});

extend('date-max', {
  params: ['max'],
  validate: (value, { max }) => {
    return dayjs(value).isSameOrBefore(max);
  },
});

//* 可以被一百整除的整數
extend('integerHundredsDivisible', {
  params: ['number'],
  validate: (value, { number }) => {
    return Number.isInteger(number) && number % 100 == 0;
  },
});

extend('register-required', {
  ...required,
  message: name => {
    if (i18n.te(`validate.register.required.${name}`)) {
      return i18n.t(`validate.register.required.${name}`);
    }
    return '';
  },
});

extend('register-min', {
  ...min,
  message: name => {
    if (i18n.te(`validate.register.length.${name}`)) {
      return i18n.t(`validate.register.length.${name}`);
    }
    return '';
  },
});

extend('register-max', {
  ...max,
  message: name => {
    if (i18n.te(`validate.register.length.${name}`)) {
      return i18n.t(`validate.register.length.${name}`);
    }
    return '';
  },
});

extend('register-regex', {
  ...regex,
  message: name => {
    if (i18n.te(`validate.register.regex.${name}`)) {
      return i18n.t(`validate.register.regex.${name}`);
    }
    return i18n.t('validate.register.regex.common');
  },
});

extend('register-confirmed', {
  ...confirmed,
  message: name => {
    if (i18n.te(`validate.register.confirmed.${name}`)) {
      return i18n.t(`validate.register.confirmed.${name}`);
    }
    return '';
  },
});

extend('register-birthday', {
  params: ['min', 'max'],
  validate: (value, { min, max }) => {
    return dayjs(value).isSameOrAfter(min) && dayjs(value).isSameOrBefore(max);
  },
  message: name => {
    if (i18n.te(`validate.register.date.${name}`)) {
      return i18n.t(`validate.register.date.${name}`);
    }
    return '';
  },
});
