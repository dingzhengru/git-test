<template>
  <ValidationObserver class="user-profile" tag="div" v-slot="{ invalid, handleSubmit, reset }">
    <form class="user-profile__form" @submit.prevent="handleSubmit(submitUserProfile)" @reset.prevent="reset">
      <div class="ui-panel-tab">
        <component :is="PanelTabs" :list="tabList">
          <div slot="after" class="user-profile__logout">
            <button type="button" @click="$store.dispatch('user/logout')">{{ $t('header.button.logout') }}</button>
          </div>
        </component>

        <div class="ui-panel-tab__content user-profile__content">
          <div class="user-profile__title user-profile__title--basic">
            <div class="user-profile__title__icon user-profile__title__icon--basic"></div>
            <div class="user-profile__title__text user-profile__title__text--basic">
              {{ $t('user.profile.step.basic') }}
            </div>
          </div>
          <div class="user-profile__basic">
            <div class="user-profile__field">
              <label>{{ $t('user.profile.field.registerTime') }}</label>
              <input type="text" :value="getDatetime(userCreatedDatetime)" />
            </div>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldAccount.class]"
              :name="fieldAccount.name"
              :rules="fieldAccount.rules"
              v-show="fieldAccount.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Account.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldAccount.value"
                @change="changeField(fieldAccount, invalid)"
                v-if="fieldAccount.isModifiable"
              />
              <input type="text" :value="fieldAccount.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldRealName.class]"
              :name="fieldRealName.name"
              :rules="fieldRealName.rules"
              v-show="fieldRealName.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_RealName.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldRealName.value"
                @change="changeField(fieldRealName, invalid)"
                v-if="fieldRealName.isModifiable"
              />
              <input type="text" :value="fieldRealName.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldAccount.class]"
              :name="fieldMobile.name"
              :rules="fieldMobile.rules"
              v-show="fieldMobile.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Mobile.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldMobile.value"
                @change="changeField(fieldMobile, invalid)"
                v-if="fieldMobile.isModifiable"
              />
              <input type="text" :value="fieldMobile.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldEmail.class]"
              :name="fieldEmail.name"
              :rules="fieldEmail.rules"
              v-show="fieldEmail.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Email.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldEmail.value"
                @change="changeField(fieldEmail, invalid)"
                v-if="fieldEmail.isModifiable"
              />
              <input type="text" :value="fieldEmail.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldNickname.class]"
              :name="fieldNickname.name"
              :rules="fieldNickname.rules"
              v-show="fieldNickname.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_NickName.placeholder`) }}</label>
              <input type="text" v-model="fieldNickname.value" v-if="fieldNickname.isModifiable" />
              <input type="text" :value="fieldNickname.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldLine.class]"
              :name="fieldLine.name"
              :rules="fieldLine.rules"
              v-show="fieldLine.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Line.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldLine.value"
                @change="changeField(fieldLine, invalid)"
                v-if="fieldLine.isModifiable"
              />
              <input type="text" :value="fieldLine.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBirthday.class]"
              :name="fieldBirthday.name"
              :rules="fieldBirthday.rules"
              v-show="fieldBirthday.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Birthday.placeholder`) }}</label>
              <input
                type="date"
                v-model="fieldBirthday.value"
                :min="fieldBirthday.min"
                :max="fieldBirthday.max"
                v-if="fieldBirthday.isModifiable"
              />
              <input type="date" :value="fieldBirthday.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldSkype.class]"
              :name="fieldSkype.name"
              :rules="fieldSkype.rules"
              v-show="fieldSkype.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_Skype.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldSkype.value"
                @change="changeField(fieldSkype, invalid)"
                v-if="fieldSkype.isModifiable"
              />
              <input type="text" :value="fieldSkype.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldQQ.class]"
              :name="fieldQQ.name"
              :rules="fieldQQ.rules"
              v-show="fieldQQ.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_QQ.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldQQ.value"
                @change="changeField(fieldQQ, invalid)"
                v-if="fieldQQ.isModifiable"
              />
              <input type="text" :value="fieldQQ.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <div class="user-profile__field user-profile__field--btn">
              <label>{{ $t('user.profile.field.password') }}</label>
              <input type="password" :value="'password'" readonly />
              <button type="button" @click="isShowModalChangePassword = true">{{ $t('ui.button.edit') }}</button>
              <div class="ui-question" @click="isShowModalNoticeChangePassword = true"></div>
            </div>

            <div class="user-profile__field user-profile__field--btn">
              <label>{{ $t('user.profile.field.passwordWithdrawal') }}</label>
              <input type="password" :value="'password'" readonly />
              <button type="button" @click="isShowModalChangePasswordWithdrawal = true">
                {{ $t('ui.button.setup') }}
              </button>
              <div class="ui-question" @click="isShowModalNoticeChangePasswordWithdrawal = true"></div>
            </div>
          </div>

          <div class="user-profile__title user-profile__title--bank">
            <div class="user-profile__title__icon user-profile__title__icon--bank"></div>
            <div class="user-profile__title__text user-profile__title__text--bank">
              {{ $t('user.profile.step.bank') }}
            </div>
          </div>

          <div class="user-profile__bank">
            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankId1.class]"
              :name="fieldBankId1.name"
              :rules="fieldBankId1.rules"
              v-show="fieldBankId1.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankId1.placeholder`) }}</label>
              <select class="ui-field__select" v-model="fieldBankId1.value" v-if="fieldBankId1.isModifiable">
                <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
              </select>
              <input type="text" :value="userBankById(fieldBankId1.value).Lst_BankName" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankAccount1.class]"
              :name="fieldBankAccount1.name"
              :rules="fieldBankAccount1.rules"
              v-show="fieldBankAccount1.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankAccount1.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldBankAccount1.value"
                @change="changeField(fieldBankAccount1, invalid)"
                v-if="fieldBankAccount1.isModifiable"
              />
              <input type="text" :value="fieldBankAccount1.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankBranchName1.class]"
              :name="fieldBankBranchName1.name"
              :rules="fieldBankBranchName1.rules"
              v-show="fieldBankBranchName1.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankBranchName1.placeholder`) }}</label>
              <input type="text" v-model="fieldBankBranchName1.value" v-if="fieldBankBranchName1.isModifiable" />
              <input type="text" :value="fieldBankBranchName1.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankId2.class]"
              :name="fieldBankId2.name"
              :rules="fieldBankId2.rules"
              v-show="fieldBankId2.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankId2.placeholder`) }}</label>
              <select class="ui-field__select" v-model="fieldBankId2.value" v-if="fieldBankId2.isModifiable">
                <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
              </select>
              <input type="text" :value="userBankById(fieldBankId2.value).Lst_BankName" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankAccount2.class]"
              :name="fieldBankAccount2.name"
              :rules="fieldBankAccount2.rules"
              v-show="fieldBankAccount2.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankAccount2.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldBankAccount2.value"
                @change="changeField(fieldBankAccount2, invalid)"
                v-if="fieldBankAccount2.isModifiable"
              />
              <input type="text" :value="fieldBankAccount2.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankBranchName2.class]"
              :name="fieldBankBranchName2.name"
              :rules="fieldBankBranchName2.rules"
              v-show="fieldBankBranchName2.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankBranchName2.placeholder`) }}</label>
              <input type="text" v-model="fieldBankBranchName2.value" v-if="fieldBankBranchName2.isModifiable" />
              <input type="text" :value="fieldBankBranchName2.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankId3.class]"
              :name="fieldBankId3.name"
              :rules="fieldBankId3.rules"
              v-show="fieldBankId3.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankId3.placeholder`) }}</label>
              <select class="ui-field__select" v-model="fieldBankId3.value" v-if="fieldBankId3.isModifiable">
                <option :value="item.Value" v-for="item in bankList" :key="item.Value">{{ item.Text }}</option>
              </select>
              <input type="text" :value="userBankById(fieldBankId3.value).Lst_BankName" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankAccount3.class]"
              :name="fieldBankAccount3.name"
              :rules="fieldBankAccount3.rules"
              v-show="fieldBankAccount3.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankAccount3.placeholder`) }}</label>
              <input
                type="text"
                v-model="fieldBankAccount3.value"
                @change="changeField(fieldBankAccount3, invalid)"
                v-if="fieldBankAccount3.isModifiable"
              />
              <input type="text" :value="fieldBankAccount3.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>

            <ValidationProvider
              class="user-profile__field"
              tag="div"
              :class="[fieldBankBranchName3.class]"
              :name="fieldBankBranchName3.name"
              :rules="fieldBankBranchName3.rules"
              v-show="fieldBankBranchName3.isShow"
              v-slot="{ errors }"
            >
              <label>{{ $t(`register.Add_BankBranchName3.placeholder`) }}</label>
              <input type="text" v-model="fieldBankBranchName3.value" v-if="fieldBankBranchName3.isModifiable" />
              <input type="text" :value="fieldBankBranchName3.value" readonly v-else />
              <div class="user-profile__field__error" v-if="errors.length > 0 && errors[0]">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
          </div>

          <div class="user-profile__btn">
            <button class="user-profile__btn--submit ui-btn ui-btn--block" type="submit" :disabled="invalid">
              {{ $t('ui.button.submit') }}
            </button>
            <button class="user-profile__btn--reset ui-btn ui-btn--block" type="reset" @click="resetForm">
              {{ $t('ui.button.reset') }}
            </button>
          </div>
        </div>
      </div>
    </form>
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
    ...mapGetters(['siteSetting', 'siteFullCss']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
    ModalUserChangePassword() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserChangePassword}`);
    },
    ModalUserChangePasswordWithdrawal() {
      return () => import(`@/${this.siteSetting.components.user.ModalUserChangePasswordWithdrawal}`);
    },
    ModalNoticeList() {
      return () => import(`@/${this.siteSetting.components.user.ModalNoticeList}`);
    },
  },
  data() {
    return {
      isShowModalChangePassword: false,
      isShowModalChangePasswordWithdrawal: false,
      isShowModalNoticeChangePassword: false,
      isShowModalNoticeChangePasswordWithdrawal: false,

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
    };
  },
};
</script>
