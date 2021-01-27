<template>
  <div>
    <h1>FROZEN TABLE</h1>
    <el-table :data="frozenTable" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="ID" width="100%" />
      <el-table-column v-for="item in formThead" :key="item" :label="item">
        <template slot-scope="scope">
          {{ scope.row[item] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getInitPos } from '@/api/bond'
import _ from 'lodash'
const moment = require('moment')
const defaultFormThead = ['portfolio_id', 'symbol', 'date', 'long_pos', 'stock_loan', 'credit_long', 'com_pnl', 'comment', 'frozen_loan']
export default {
  name: 'FrozenLoan',
  data() {
    return {
      initPosForDiff: [],
      stockLoanForDiff: [],
      frozenTable: [],
      // initPosData: stores info from Init_Positions API
      initPosData: [],
      formThead: defaultFormThead,
      initStart: moment()
    }
  },
  watch: {
    // convert init pos data to utc time
    displayInitData: function() {
      this.convertInitTime(this.displayInitData)
    },
    initPosData: function() {
      this.displayInitData = this.initPosData
      this.filterFrozen()
    }
  },
  mounted() {
    this.getInitPosData('20201204')
    // this.getInitPosData(this.initStart.format('YYYYMMDD'))
    // this.convertInitTime(this.displayInitData)
  },
  methods: {
    convertInitTime(initTable) {
      _.forEach(initTable, i => {
        i.date = moment(i.date).format()
      })
      initTable = [...initTable]
    },
    filterFrozen() {
      this.frozenTable = _.filter(this.initPosData, o => {
        return Number(o.frozen_loan) !== 0
      })
      console.log('@@@3', this.frozenTable)
    },
    // GET init_position data from database
    getInitPosData(date) {
      getInitPos(date).then(response => {
        this.initPosData = response
      })
      this.initPosData = [...this.initPosData]
    }
  }
}
</script>

<style scoped>

</style>
