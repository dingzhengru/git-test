<template>
  <div class="transaction lay-are-pageContent">
    <ul class="ui-ul-tabs ul-tabs-deposit">
      <li
        class="ui-li-tabs ui-li-tabs-deposit"
        :class="[route.class, { 'ui-li-tabsActive': route.link == $route.name }]"
        v-for="route in transationRouteList"
        :key="route.link"
      >
        <router-link :to="{ name: route.link }" class="ui-lnk-tabs">{{ route.name }}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'TransactionHome',
  data() {
    return {
      transationRouteList: [
        {
          name: 'Deposit',
          link: 'TransactionDeposit',
          class: 'ui-li-tabs-deposit',
        },
        {
          name: 'Withdraw',
          link: 'TransactionWithdraw',
          class: 'ui-li-tabs-withdrawal',
        },
        {
          name: 'Transfer',
          link: 'TransactionTransfer',
          class: 'ui-li-tabs-wallet',
        },
        {
          name: 'Record',
          link: 'TransactionRecord',
          class: 'ui-li-tabs-pointrecord',
        },
      ],
    };
  },
};
</script>

<style scoped>
.transaction {
  padding-top: 88px;
  padding-bottom: 20px;
}

.are-paytype {
  margin: 40px 0 20px;
}
.are-bank {
  margin: 40px 0 20px;
}
/* .txt-ps {
  color: #f00;
} */
.are-deposit-input {
  margin: 20px 0;
}
.are-deposit-bankInfo {
  margin: 20px 0;
}
.are-control {
  margin: 40px 0;
  text-align: center;
}
/* .reg-main > .are-paytype */
.ul-paytype {
}
.li-paytype {
  padding: 20px 0;
  /* border-bottom: 1px solid #d6c388; */
  /* color: #959595; */
  font-size: 2.461em;
  text-align: center;
}
.li-paytype:last-child {
  border-bottom: none;
}
.lnk-paytype {
  display: block;
  width: 408px;
  height: 136px;
  background: no-repeat;
  margin: 0 auto 10px;
}

/* .reg-main > .are-bank */
.ul-bank {
}
.li-bank {
  padding: 20px 0;
  /* border-bottom: 1px solid #d6c388; */
  /* color: #959595; */
  font-size: 2.461em;
  text-align: center;
}
.li-bank:last-child {
  border-bottom: none;
}
.lnk-bank {
  display: block;
  width: 588px;
  height: 137px;
  background: no-repeat;
  margin: 0 auto 10px;
}

/* .reg-main > .are-deposit-input > */
.ipt-deposit {
}
.ipt-deposit-open {
}
.theme-input-box > .ddl-hour,
.theme-input-box > .ddl-minute {
  min-width: auto;
  width: 310px;
  margin-top: 20px;
  margin-right: 14px;
}
.theme-input-box > .ddl-minute {
  margin-right: 0;
}
.txt-notice,
.txt-UploadName {
  margin: 10px 0;
  font-size: 2.153em;
}
.txt-deposit21-paytype {
  margin: 0 0 20px;
  font-size: 2.307em;
}
.txt-UploadName {
  text-align: center;
}
.btn-upload {
  display: block;
  width: 500px;
  margin: 0 auto;
}
/* .reg-main > .are-deposit-bankInfo > */
.txt-bankInfo {
  margin: 0 0 20px;
  font-size: 2.307em;
}
/* .reg-main > .are-control > */
.btn-send,
.btn-reset {
  margin: 0 10px;
}
</style>
