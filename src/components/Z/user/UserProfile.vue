<template>
  <div class="user-profile">
    <form class="user-profile__form">
      <div class="user-profile__field ui-field">
        <div class="ui-field__main">
          <label class="ui-field__label">
            {{ $t(`ui.label.account`) }}
          </label>
          <input class="ui-field__input" type="text" />
        </div>
      </div>
      <div class="user-profile__field ui-field">
        <div class="ui-field__main">
          <label class="ui-field__label">
            {{ $t(`ui.label.account`) }}
          </label>
          <input class="ui-field__input" type="text" />
        </div>
      </div>

      <div class="ui-step">銀行資料</div>
      <div class="user-profile__field ui-field">
        <div class="ui-field__star">*</div>
        <select class="ui-field__select">
          <option value="">銀行名稱</option>
        </select>
      </div>
      <div class="user-profile__field ui-field">
        <div class="ui-field__main">
          <label class="ui-field__label">
            {{ $t(`ui.label.account`) }}
          </label>
          <input class="ui-field__input" type="text" />
        </div>
      </div>

      <div class="user-profile__btn">
        <button class="user-profile__btn--submit ui-btn ui-btn--block" type="submit">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="user-profile__btn--reset ui-btn ui-btn--block" type="reset">{{ $t('ui.button.reset') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'UserProfile',
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
  },
};
</script>
