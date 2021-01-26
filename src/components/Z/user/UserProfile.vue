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
