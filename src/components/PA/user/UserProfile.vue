<template>
  <ValidationObserver class="user-profile" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-profile__form" @submit.prevent="handleSubmit(submitUserProfile)" @reset.prevent="reset">
      <div class="ui-panel-tab">
        <component :is="PanelTabs" :list="tabList"></component>

        <div class="ui-panel-tab__content user-profile__content">
          <div class="ui-step">
            <img class="ui-step__icon" :src="imgUser" />
            <span>{{ $t('user.profile.step.basic') }}</span>
          </div>
          <div class="user-profile__basic">
            <div class="ui-field user-profile__field">
              <label>{{ $t('user.profile.field.registerTime') }}</label>
              <span>{{ getDatetime(userCreatedDatetime) }}</span>
            </div>

            <div
              class="ui-field user-profile__field"
              v-for="item in fieldListNoBank"
              :key="item.name"
              v-show="item.isShow"
            >
              <ValidationProvider
                class="user-profile__field__container"
                tag="div"
                :name="item.name"
                :rules="item.rules"
                v-slot="{ errors }"
                v-if="item.isModifiable"
              >
                <label>{{ $t(`register.${item.name}.placeholder`) }}</label>
                <input
                  :class="{ invalid: errors.length > 0 }"
                  type="text"
                  v-model="item.value"
                  @change="checkField(item, invalid)"
                />
              </ValidationProvider>

              <template v-else>
                <label>{{ $t(`register.${item.name}.placeholder`) }}</label>
                <span>{{ item.value }}</span>
              </template>
            </div>

            <div class="ui-field user-profile__field user-profile__field--btn">
              <label>{{ $t('user.profile.field.password') }}</label>
              <img :src="imgButtonModify" @click="isShowModalChangePassword = true" />
              <div class="ui-question" @click="isShowModalNoticeChangePassword = true"></div>
            </div>

            <div class="ui-field user-profile__field user-profile__field--btn">
              <label>{{ $t('user.profile.field.passwordWithdrawal') }}</label>
              <img
                :src="imgButtonModify"
                @click="isShowModalChangePasswordWithdrawal = true"
                v-if="userHasWithdrawalPassWord"
              />
              <img :src="imgButtonSetup" @click="isShowModalChangePasswordWithdrawal = true" v-else />
              <div class="ui-question" @click="isShowModalNoticeChangePasswordWithdrawal = true"></div>
            </div>
          </div>

          <div class="user-profile__btn">
            <button class="ui-btn ui-btn--lg user-profile__btn--submit" type="submit" :disabled="invalid">
              {{ $t('ui.button.submit') }}
            </button>
            <button class="ui-btn ui-btn--lg user-profile__btn--reset" type="reset" @click="resetForm">
              {{ $t('ui.button.reset') }}
            </button>
          </div>

          <div class="ui-step">
            <img class="ui-step__icon" :src="imgBank" />
            <span>{{ $t('user.profile.step.bank') }}</span>
            <button
              class="ui-btn user-profile__btn--add-bank"
              type="button"
              @click="isShowModalUserBank = true"
              v-if="isShowBankAddButton"
            >
              {{ $t('user.profile.button.bankAdd') }}
            </button>

            <!-- <button
              class="ui-btn user-profile__btn--add-bank"
              type="button"
              @click="isShowModalUserBank = true"
            >
              {{ $t('user.profile.button.bankAdd') }}
            </button> -->
          </div>

          <div class="user-profile__bank">
            <div class="user-profile__bank__item">
              <label
                class="ui-field-box user-profile__bank__item__radio"
                @click="bankDefault = 1"
                v-if="isAutoCashOpen"
              >
                <span>{{ $t('ui.label.default') }}</span>
                <input type="radio" :value="1" v-model="bankDefault" />
                <div></div>
              </label>
              <div class="user-profile__bank__item__card" @click="openBankModalModify(1)">
                <span class="user-profile__bank__item__card__name">
                  {{ getBankById(fieldBankId1.value).Text }}
                </span>
                <span class="user-profile__bank__item__card__number">
                  {{ transferToBankString(fieldBankAccount1.value) }}
                </span>
              </div>
            </div>

            <div class="user-profile__bank__item" v-if="fieldBankId2.value">
              <label
                class="ui-field-box user-profile__bank__item__radio"
                @click="bankDefault = 2"
                v-if="isAutoCashOpen"
              >
                <span>{{ $t('ui.label.default') }}</span>
                <input type="radio" :value="2" v-model="bankDefault" />
                <div></div>
              </label>
              <div class="user-profile__bank__item__card" @click="openBankModalModify(2)">
                <span class="user-profile__bank__item__card__name">
                  {{ getBankById(fieldBankId2.value).Text }}
                </span>
                <span class="user-profile__bank__item__card__number">
                  {{ transferToBankString(fieldBankAccount2.value) }}
                </span>
              </div>
            </div>

            <div class="user-profile__bank__item" v-if="fieldBankId3.value">
              <label
                class="ui-field-box user-profile__bank__item__radio"
                @click="bankDefault = 3"
                v-if="isAutoCashOpen"
              >
                <span>{{ $t('ui.label.default') }}</span>
                <input type="radio" :value="3" v-model="bankDefault" />
                <div></div>
              </label>
              <div class="user-profile__bank__item__card" @click="openBankModalModify(3)">
                <span class="user-profile__bank__item__card__name">
                  {{ getBankById(fieldBankId3.value).Text }}
                </span>
                <span class="user-profile__bank__item__card__number">
                  {{ transferToBankString(fieldBankAccount3.value) }}
                </span>
              </div>
            </div>
          </div>

          <!-- <div class="user-profile__btn">
            <button class="user-profile__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
              {{ $t('ui.button.submit') }}
            </button>
            <button class="user-profile__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
              {{ $t('ui.button.reset') }}
            </button>
          </div> -->
        </div>
      </div>
    </form>

    <div class="user-profile__footer">
      <span @click="isShowModalLogout = true">{{ $t('header.button.logout') }}</span>
    </div>

    <component
      :is="ModalUserChangePassword"
      @close="isShowModalChangePassword = false"
      v-if="isShowModalChangePassword"
    />
    <component
      :is="ModalUserChangePasswordWithdrawal"
      @close="isShowModalChangePasswordWithdrawal = false"
      v-if="isShowModalChangePasswordWithdrawal"
    />

    <component
      :is="ModalUserBank"
      :bankNumber="bankNumberAdd"
      :bankIdAdd="bankIdAdd"
      :bankAccountAdd="bankAccountAdd"
      :bankBranchAdd="bankBranchAdd"
      :bankList="bankListEnabled"
      @update-bank="getRegisterAdvanceNew"
      @close="isShowModalUserBank = false"
      v-if="isShowModalUserBank"
    />

    <component
      :is="ModalUserBank"
      :bankNumber="bankNumberModify"
      :bankIdAdd="bankIdModify"
      :bankAccountAdd="bankAccountModify"
      :bankBranchAdd="bankBranchModify"
      :bankList="bankListEnabled"
      @update-bank="getRegisterAdvanceNew"
      @close="isShowModalUserBankModify = false"
      v-if="isShowModalUserBankModify"
    />

    <component
      :is="ModalNoticeList"
      :noticeList="noticeListChangePassword"
      v-if="isShowModalNoticeChangePassword"
      @close="isShowModalNoticeChangePassword = false"
    />

    <component
      :is="ModalNoticeList"
      :noticeList="noticeListChangePasswordWithdrawal"
      v-if="isShowModalNoticeChangePasswordWithdrawal"
      @close="isShowModalNoticeChangePasswordWithdrawal = false"
    />

    <component
      :is="ModalConfirm"
      :text="$t('alert.confirmLogout')"
      @ok="$store.dispatch('user/logout')"
      @close="isShowModalLogout = false"
      v-if="isShowModalLogout"
    />
  </ValidationObserver>
</template>

<script>
import mixinUserProfile from '@/mixins/userProfile';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: 'UserProfile',
  mixins: [mixinUserProfile],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['lang', 'siteSetting', 'siteFullCss', 'userWithdrawalCount', 'userHasWithdrawalPassWord']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
    ModalUserChangePassword() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserChangePassword}`);
    },
    ModalUserChangePasswordWithdrawal() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserChangePasswordWithdrawal}`);
    },
    ModalUserBank() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserBank}`);
    },
    ModalNoticeList() {
      return () => import(`@/${this.siteSetting.components.user.ModalNoticeList}`);
    },
    ModalConfirm() {
      return () => import(`@/${this.siteSetting.components.app.ModalConfirm}`);
    },
    isShowBankAddButton() {
      if (this.bankNumberAdd === 1) {
        return true;
      } else if (this.bankNumberAdd === 2 && this.fieldBankId2.isModifiable && this.userWithdrawalCount > 0) {
        return true;
      } else if (this.bankNumberAdd === 3 && this.fieldBankId3.isModifiable && this.userWithdrawalCount > 0) {
        return true;
      }
      return false;
    },
    bankNumberAdd() {
      if (!this.fieldBankId1.value || !this.fieldBankAccount1.value) {
        return 1;
      } else if (!this.fieldBankId2.value || !this.fieldBankAccount2.value) {
        return 2;
      } else if (!this.fieldBankId3.value || !this.fieldBankAccount3.value) {
        return 3;
      }
      return 0;
    },
    bankIdByNumber: app => number => {
      if (number === 1) {
        return app.fieldBankId1;
      } else if (number === 2) {
        return app.fieldBankId2;
      } else if (number === 3) {
        return app.fieldBankId3;
      }
      return {};
    },
    bankAccountByNumber: app => number => {
      if (number === 1) {
        return app.fieldBankAccount1;
      } else if (number === 2) {
        return app.fieldBankAccount2;
      } else if (number === 3) {
        return app.fieldBankAccount3;
      }
      return {};
    },
    bankBranchByNumber: app => number => {
      if (number === 1) {
        return app.fieldBankBranchName1;
      } else if (number === 2) {
        return app.fieldBankBranchName2;
      } else if (number === 3) {
        return app.fieldBankBranchName3;
      }
      return {};
    },
    bankIdAdd() {
      return this.bankIdByNumber(this.bankNumberAdd);
    },
    bankAccountAdd() {
      return this.bankAccountByNumber(this.bankNumberAdd);
    },
    bankBranchAdd() {
      return this.bankBranchByNumber(this.bankNumberAdd);
    },
    bankIdModify() {
      return this.bankIdByNumber(this.bankNumberModify);
    },
    bankAccountModify() {
      return this.bankAccountByNumber(this.bankNumberModify);
    },
    bankBranchModify() {
      return this.bankBranchByNumber(this.bankNumberModify);
    },
    isBankModify() {
      return (
        this.bankIdModify.Lst_isModifiable &&
        this.bankAccountModify.Lst_isModifiable &&
        this.bankBranchModify.Lst_isModifiable
      );
    },
    imgUser() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-icon-user.png`);
      } catch {
        return '';
      }
    },
    imgBank() {
      try {
        return require(`@/assets/${this.siteFullCss}/ui/ui-icon-bank.png`);
      } catch {
        return '';
      }
    },
    imgButtonModify() {
      try {
        return require(`@/assets/${this.siteFullCss}/user/ui-btn-modify-${this.lang}.png`);
      } catch {
        return '';
      }
    },
    imgButtonSetup() {
      try {
        return require(`@/assets/${this.siteFullCss}/user/ui-btn-setup-${this.lang}.png`);
      } catch {
        return '';
      }
    },
    imgChangePassword() {
      try {
        return require(`@/assets/${this.siteFullCss}/user/ui-change-password.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      isShowModalChangePassword: false,
      isShowModalChangePasswordWithdrawal: false,
      isShowModalNoticeChangePassword: false,
      isShowModalNoticeChangePasswordWithdrawal: false,
      isShowModalUserBank: false,
      isShowModalUserBankModify: false,

      bankNumberModify: 0,

      noticeListChangePassword: [
        'user.changePassword.notice.suggest',
        'user.changePassword.notice.rule',
        'user.changePassword.notice.contact',
      ],

      noticeListChangePasswordWithdrawal: ['user.changePasswordWithdrawal.notice.first'],

      tabList: [
        {
          route: 'UserProfile',
          text: 'header.menu.profile',
          otherActiveRoute: [],
        },
      ],

      isShowModalLogout: false,
    };
  },
  methods: {
    updateBankAdd(bank) {
      this.fieldList.find(item => item.name === bank.bankId.name).value = bank.bankId.value;
      this.fieldList.find(item => item.name === bank.bankAccount.name).value = bank.bankAccount.value;
      this.fieldList.find(item => item.name === bank.bankBranch.name).value = bank.bankBranch.value;
    },
    transferToBankString(str) {
      if (!str) {
        return '';
      }

      const strList = str.split('');
      let strNew = '';
      strList.forEach((item, index) => {
        strNew = strNew + item;
        if ((index + 1) % 4 === 0) {
          strNew = strNew + ' ';
        }
      });
      return strNew;
    },
    openBankModalModify(type) {
      this.bankNumberModify = type;

      if (this.isBankModify) {
        this.isShowModalUserBankModify = true;
      } else {
        this.bankNumberModify = 0;
      }
    },
  },
};
</script>
