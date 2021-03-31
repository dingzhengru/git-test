<template>
  <div class="deposit">
    <div class="deposit__mode">
      <button class="deposit__mode--base">
        {{ $t('transaction.deposit.nav.base') }}
      </button>
      <button class="deposit__mode--third-party">
        {{ $t('transaction.deposit.nav.thirdParty') }}
      </button>
    </div>

    <div>
      <form class="deposit__form" novalidate @submit.prevent="">
        <div class="ui-step">Step1 请选择存入银行</div>

        <div class="ui-field deposit__field deposit__field--bank">
          <select class="ui-field__select">
            <option value="">请选择存入银行</option>
          </select>
        </div>

        <div class="ui-field deposit__field deposit__field--bank-name">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">存入本公司银行帐号名</label>
            <span class="ui-field__group__text">test</span>
          </div>
        </div>

        <div class="ui-field deposit__field deposit__field--bank-account">
          <div class="ui-field__group ui-field__group--btn">
            <label class="ui-field__group__label" for="deposit-bank-account">存入本公司银行账号</label>
            <span class="ui-field__group__text">08555546669</span>
            <button class="ui-btn" type="button">复制</button>
          </div>
        </div>

        <div class="ui-step">Step2 请选择转帐银行</div>
        <div class="ui-field deposit__field deposit__field--bank-transfer">
          <select class="ui-field__select">
            <option value="">请选择转帐银行</option>
          </select>
        </div>

        <div class="ui-step">Step3 存款数据</div>
        <div class="ui-field deposit__field deposit__field--method">
          <select class="ui-field__select">
            <option value="">选择存款方式</option>
          </select>
        </div>

        <div class="ui-field deposit__field deposit__field--datetime">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">存款时间</label>
            <input class="ui-field__group__input" type="datetime-local" />
          </div>
        </div>

        <div class="ui-field deposit__field deposit__field--amount">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">存款金额</label>
            <input class="ui-field__group__input" type="number" />
            <span class="ui-field__group__text">泰铢</span>
          </div>
        </div>
        <div class="ui-notice">
          <ul>
            <li>最高存款200000.00 最低存款200.00</li>
            <li>提醒您，存款时请勿存入整数额度，请含尾数零头一并存入，以供辨认，避免存款被重复申请</li>
          </ul>
        </div>

        <div class="deposit__field deposit__field--receipt">
          <button class="ui-btn ui-btn--block deposit__field--receipt__btn" type="button" @click="uploadReceipt">
            汇款收据
          </button>
          <input class="deposit__field--receipt__input" ref="receipt" type="file" />
        </div>
        <div class="ui-notice">
          <ul>
            <li>图片格式必须是 JPG / PNG</li>
            <li>档案大小不可超过2MB</li>
          </ul>
        </div>

        <div class="ui-field deposit__field deposit__field--remark">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">备注</label>
            <input class="ui-field__group__input" type="text" />
          </div>
        </div>

        <div class="ui-field deposit__field deposit__field--bank">
          <select class="ui-field__select">
            <option value="">请选择优惠活动</option>
          </select>
        </div>
        <div class="ui-notice">
          <ul>
            <li>请注意存款最低及最高限制。</li>
            <li>上述 最低/最高 金额是根据每一笔汇款资料。</li>
            <li>请会员依照以上存款方式进行存款，如有任何额外费用产生，将由会员自行负担。</li>
            <li>如有任何因转账失败或银行退款情形，而造成额外费用的产生，将由会员自行负担。</li>
            <li>存入非整数金额可加速审核作业(例如存入123)。</li>
            <li>对于存取款有任何问题，欢迎联络我们的客服人员。</li>
          </ul>
        </div>

        <div class="deposit__btn">
          <button class="ui-btn ui-btn--block deposit__btn--submit" type="submit">{{ $t('ui.button.submit') }}</button>
        </div>
      </form>
    </div>

    <!-- <ModalNoticeImage
      :isShow="isShowDepositNotice"
      :image="siteDepositNoticeUrl"
      @close="isShowDepositNotice = false"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDeposit',
  components: {
    // ModalNoticeImage: () => import('@/components/ModalNoticeImage'),
  },
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteIsShowDepositNotice', 'siteDepositNoticeUrl']),
    DepositModeNav() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositModeNav}`);
    },
    DepositFormBase() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositFormBase}`);
    },
    DepositFormThirdParty() {
      return () => import(`@/${this.siteSetting.components.transaction.deposit.DepositFormThirdParty}`);
    },
  },
  data() {
    return {
      mode: 'base',
      isShowDepositNotice: false,
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
    uploadReceipt() {
      this.$refs.receipt.click();
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-deposit.scss`);

    //* 是否顯示 DepositNotice
    this.isShowDepositNotice = this.siteIsShowDepositNotice;
  },
};
</script>
