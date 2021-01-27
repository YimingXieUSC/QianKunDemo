<template>
  <div id="returnloan">
    <h1>RETURN LOAN TODAY TABLE</h1>
    <div class="date-select">
      <span>Choose a Date </span>
      <el-date-picker
        v-model="searchDiffDate"
        type="date"
        placeholder="Search by Start Date"
      /></div>
    <el-table :data="todayReturnLoans" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="ID" width="100%" />
      <el-table-column v-for="item in formThead2" :key="item" :label="item">
        <template slot-scope="scope">
          {{ scope.row[item] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStockLoans } from '@/api/bond'
import moment from 'moment'
import _ from 'lodash'

const defaultFormThead2 = ['portfolio_id', 'symbol', 'quantity', 'begin', 'end', 'interest_rate', 'expected_end', 'create_time', 'comment']

export default {
  name: 'ReturnLoan',
  data() {
    return {
      todayReturnLoans: [],
      // loanData: stores info from stock_loans API
      loanData: [],
      formThead2: defaultFormThead2,
      searchDiffDate: new Date()
    }
  },
  mounted() {
    this.getLoanData()
    // this.convertLoanTime(this.displayLoanTable)
    this.generateReturnTodayData()
  },
  watch: {
    loanData: function() {
      console.log('loan data changed!', this.loanData)
      this.generateReturnTodayData()
    },
    searchDiffDate: function() {
      console.log('searchDiffData', this.searchDiffDate)
      this.generateReturnTodayData()
    }
  },
  methods: {
    // GET stock_loan data from database
    getLoanData() {
      getStockLoans().then(response => {
        this.loanData = response
        console.log('@@@', this.loanData)
      })
    },
    // generateReturnTodayData() {
    //   this.todayReturnLoans = _.filter(this.loanData, o => {
    //     // return moment(o.end).format('YYYY-MM-DD') === '2020-12-08'
    //     if (moment(o.end).format('YYYY-MM-DD') === moment(now).format('YYYY-MM-DD')){
    //       console.log('!!!!!!!!!!!!!!!!')
    //     }
    //     return moment(o.end).format('YYYY-MM-DD') === moment(now).format('YYYY-MM-DD')
    //   })
    // },
    generateReturnTodayData() {
      var tmpLoans = _.filter(this.loanData, o => {
        // return moment(o.end).format('YYYY-MM-DD') === '2020-12-08'
        if (moment(o.end).format('YYYY-MM-DD') === moment(this.searchDiffDate).format('YYYY-MM-DD')) {
          console.log('!!!!!!!!!!!!!!!!')
        }
        return moment(o.end).format('YYYY-MM-DD') === moment(this.searchDiffDate).format('YYYY-MM-DD')
      })
      console.log('~~~~', tmpLoans)
      this.todayReturnLoans = [...tmpLoans]
    }
  }
}
</script>

<style scoped>

</style>
