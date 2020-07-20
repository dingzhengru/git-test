<template>
  <div class="theme-content-box are-recordlist">
    <h3 class="theme-h3-boxTitle">Record List</h3>
    <ul class="cpn-boxzero ul-recordlist">
      <li class="li-recordlist" v-for="record in recordList" :key="record.name">
        <router-link class="lnk-recordlist" :to="{ name: 'TransactionRecordContent', params: { name: record.name } }">
          {{ record.content }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionRecord',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      recordList: [
        {
          name: 'deposit',
          content: 'Deposit Record',
        },
        {
          name: 'withdraw',
          content: 'Withdrawals Record',
        },
        {
          name: 'transfer',
          content: 'Transfer Record',
        },
        {
          name: 'bonus',
          content: 'Bonus Record',
        },
        {
          name: 'lottery',
          content: 'Lottery Record',
        },
        {
          name: 'withdraw-restriction',
          content: 'Withdrawal Restriction',
        },
        {
          name: 'adjustment',
          content: 'Adjustment Record',
        },
      ],
    };
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/record.scss`);
      },
    },
  },
};
</script>

<style scoped>
/* .reg-main > */
.are-recordlist {
  margin: 30px 0;
}
/* recordlist */
.ul-recordlist {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
}
.li-recordlist {
  padding: 30px 0;
}
.lnk-recordlist {
  display: block;
  font-size: 3.23em;
  text-align: center;
  line-height: 97px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
}

/*
 * 下面的都是 record 點進去後的頁面
*/

/* deplist */
/* .table-deplist {} */
.table-deplist .th-1st {
  width: 100px;
  text-align: center;
}
.table-deplist .td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
/* taklist */
/* .table-taklist {} */
.table-taklist .th-1st {
  width: 100px;
  text-align: center;
}
.table-taklist .td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
/* wallist */
/* .reg-main > .are-wallist > */
.blk-inquire-select {
  margin: 30px 0;
  text-align: center;
}
/* .blk-inquire-control {} */
/* .table-wallist {} */
.table-wallist .th-1st {
  width: 100px;
  text-align: center;
}
.table-wallist .td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
/* .reg-main > are-wallist > .blk-inquire-select > */
.ddl-inquire-game,
.ddl-inquire-range {
  width: 311px;
  margin-right: 10px;
}
.ddl-inquire-range {
  margin-right: 0;
}
.txt-inquire {
  display: block;
  font-size: 2.769em;
  text-align: left;
}
.ipt-inquire-date {
  width: 97%;
}
/* .reg-main > are-wallist > .blk-inquire-control > */
.btn-inquire {
  display: block;
  margin: 0 auto;
}
/* evelist */
/* .table-evelist {} */
.table-evelist .th-1st {
  width: 205px;
  text-align: center;
}
.table-evelist .td-2nd {
  text-align: center;
}
/* reslist */
/* .table-reslist {} */
.table-reslist .th-1st {
  width: 205px;
  text-align: center;
}
.table-reslist .td-2nd {
  text-align: center;
  padding-right: 73px;
  position: relative;
}
/* coullist */
/* .table-coullist {} */
.table-coullist .th-1st {
  width: 205px;
  text-align: center;
}
.table-coullist .td-2nd {
  text-align: center;
}
/*colorbox*/
/* .theme-colorBox {
  border: 2px solid #c1ae71;
  background: #000;
} */
.blk-imgfile {
  text-align: center;
}
.txt-imgtitle {
  font-size: 2em;
  color: #fee0a4;
}
</style>
