<template>
  <AppModal @close="$emit('close')">
    <div class="modal-lang-menu">
      <div class="ui-box-close" @click="$emit('close')"></div>

      <div class="modal-lang-menu__btn-block">
        <button
          class="modal-lang-menu__btn"
          v-for="item in langList"
          :key="item.Lst_Locales_Code"
          @click="
            changeLang(item.Lst_Locales_Code);
            $emit('close');
          "
        >
          {{ item.Lst_Locales_Name }}
        </button>
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
