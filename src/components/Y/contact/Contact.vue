<template>
  <div class="contact" :class="{ 'contact-auth': userIsLoggedIn }" @click.self="closeAllContentList">
    <div class="contact__content theme-content-box" @click.self="closeAllContentList">
      <ul class="contact__content__ul" @click.self="closeAllContentList">
        <li class="contact__content__ul__li" v-for="item in contactList" :key="item.Lst_ContactID">
          <a
            href="javascript:;"
            class="contact__content__ul__li__link"
            :class="`contact__content__ul__li__link--${item.Lst_ContactType}`"
            @click.prevent="clickContactHandler(item)"
          >
            {{ $te(`contact.type.${item.Lst_ContactType}`) ? $t(`contact.type.${item.Lst_ContactType}`) : '' }}
          </a>

          <transition name="fade">
            <div
              class="contact__detail contact__content__ul__li__block contact__content__ul__li__block--tel"
              v-if="item.isShowContentList && item.DetailList.length > 0"
            >
              <a
                class="contact__detail__link contact__content__ul__li__block__link contact__content__ul__li__block__link--tel"
                href="javascript:;"
                v-for="content in item.DetailList"
                :key="content.Lst_ContactValueID"
                @click.prevent="openContactLink(item, content)"
              >
                {{ content.Lst_ContactValue }}
              </a>
            </div>
          </transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixinContact from '@/mixins/contact';
import { mapGetters } from 'vuex';

export default {
  name: 'Contact',
  mixins: [mixinContact],
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
  },
  methods: {
    clickContactHandler(contact) {
      if (contact == this.service) {
        this.clickServiceHandler();
      } else {
        this.contactList.forEach(item => {
          if (item.Lst_ContactID != contact.Lst_ContactID) {
            item.isShowContentList = false;
          }
        });
        contact.isShowContentList = !contact.isShowContentList;
        this.$forceUpdate();
      }
    },
  },
  async mounted() {
    import(`@/styles/${this.siteFullCss}/contact.scss`);
  },
};
</script>
