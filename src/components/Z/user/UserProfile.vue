<template>
  <div class="user-profile">
    <form class="user-profile__form">
      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t(`ui.label.account`) }}
          </label>
          <input class="ui-field__group__input" type="text" :value="userAccount" readonly />
        </div>
      </div>

      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('user.profile.accessed.createdDatetime') }}
          </label>
          <input class="ui-field__group__input" type="text" :value="getDatetime(userCreatedDatetime)" readonly />
        </div>
      </div>

      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('register.Add_NickName.placeholder') }}
          </label>
          <input class="ui-field__group__input" type="text" :value="userNickname" />
        </div>
      </div>

      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('register.Add_RealName.placeholder') }}
          </label>
          <input class="ui-field__group__input" type="text" :value="userRealName" readonly />
        </div>
      </div>

      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('register.Add_Mobile.placeholder') }}
          </label>
          <input class="ui-field__group__input" type="code" :value="userMobile" readonly />
        </div>
      </div>

      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('register.Add_Birthday.placeholder') }}
          </label>
          <input class="ui-field__group__input" type="date" v-model="birthday" />
        </div>
      </div>

      <div class="ui-step">{{ $t('user.profile.step.bank') }}</div>
      <div class="ui-field user-profile__field">
        <div class="ui-field__star">*</div>
        <select class="ui-field__select">
          <option value="">銀行名稱</option>
        </select>
      </div>
      <div class="ui-field user-profile__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t(`ui.label.account`) }}
          </label>
          <input class="ui-field__group__input" type="text" />
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
import mixinUserProfile from '@/mixins/userProfile';
import { mapGetters } from 'vuex';
export default {
  name: 'UserProfile',
  mixins: [mixinUserProfile],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
  },
};
</script>
