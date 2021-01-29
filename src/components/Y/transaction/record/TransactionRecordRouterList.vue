<template>
  <div class="record-list theme-content-box">
    <h3 class="record-list__title theme-h3-boxTitle">{{ $t('transaction.record.title') }}</h3>
    <ul class="record-list__ul">
      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.deposit"
          :to="{ name: 'TransactionRecordDeposit' }"
        >
          {{ $t(`transaction.record.deposit`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.withdrawal"
          :to="{ name: 'TransactionRecordWithdrawal' }"
        >
          {{ $t(`transaction.record.withdrawal`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.transfer"
          :to="{ name: 'TransactionRecordTransfer' }"
        >
          {{ $t(`transaction.record.transfer`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.bonus"
          :to="{ name: 'TransactionRecordBonus' }"
        >
          {{ $t(`transaction.record.bonus`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.lottery"
          :to="{ name: 'TransactionRecordLottery' }"
        >
          {{ $t(`transaction.record.lottery`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.withdrawalRestriction"
          :to="{ name: 'TransactionRecordWithdrawalRestriction' }"
        >
          {{ $t(`transaction.record.withdrawalRestriction`) }}
        </router-link>
      </li>

      <li class="record-list__ul__li">
        <router-link
          class="record-list__ul__li__link"
          :id="$idMapper.transaction.record.adjustment"
          :to="{ name: 'TransactionRecordAdjustment' }"
        >
          {{ $t(`transaction.record.adjustment`) }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TransactionRecordRouterList',
};
</script>
