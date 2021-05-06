<template>
  <AppModal @close="$emit('close')">
    <div class="ui-modal modal-lang">
      <div class="ui-box-close" @click="$emit('close')"></div>

      <div class="ui-modal__title">{{ $t('ui.label.langSelect') }}</div>
      <div class="ui-modal__content modal-lang__content">
        <div
          class="modal-lang__item"
          v-for="item in langList"
          :key="item.Lst_Locales_Code"
          @click="
            changeLang(item.Lst_Locales_Code);
            $emit('close');
          "
        >
          <button class="modal-lang__item__btn">{{ item.Lst_Locales_Name }}</button>
          <span class="modal-lang__item__selected" v-show="item.Lst_Locales_Code === lang"></span>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinLang from '@/mixins/lang';

export default {
  name: 'ModalLangMenu',
  mixins: [mixinLang],
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  computed: {
    ...mapGetters(['langList']),
  },
};
</script>
