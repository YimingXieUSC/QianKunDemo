<template>
  <div class="app-container">
    <div class="date-select">
      <span>Date Selector </span>
      <el-date-picker
        v-model="currentTime"
        type="date"
        placeholder="Choose Any Date"
      />
      <div style="height: 10px" />
    </div>
    <!--Filter for the labels shown on the table-->
    <div class="filter-container">
      <el-checkbox-group v-model="checkboxVal">
        <el-checkbox label="id">
          ID
        </el-checkbox>
        <el-checkbox label="portfolio_id">
          Portfolio ID
        </el-checkbox>
        <el-checkbox label="symbol">
          Symbol
        </el-checkbox>
        <el-checkbox label="price">
          Price
        </el-checkbox>
        <el-checkbox label="quantity">
          Quantity
        </el-checkbox>
        <el-checkbox label="begin">
          Begin
        </el-checkbox>
        <el-checkbox label="end">
          End
        </el-checkbox>
        <el-checkbox label="interest_rate">
          Interest Rate
        </el-checkbox>
        <el-checkbox label="expected_end">
          Expected End
        </el-checkbox>
        <el-checkbox label="create_time">
          Create Time
        </el-checkbox>
        <el-checkbox label="comment">
          Comment
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="width: 200px" />
    <el-table :key="key" :data="tableData" border fit highlight-current-row style="width: 100%">
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
import { getBond, getInitPos, getLoan } from '@/api/bond'
const defaultFormThead = ['portfolio_id', 'symbol', 'price', 'quantity', 'begin', 'end', 'interest_rate', 'expected_end', 'create_time', 'comment']
export default {
  data() {
    return {
      loanTable: '',
      initTable: '',
      value1: '',
      info: null,
      currentTime: new Date(),
      tableData: null,
      userDate: '',
      key: 1,
      formTheadOptions: ['portfolio_id', 'symbol', 'price', 'quantity', 'begin', 'end', 'interest_rate', 'expected_end', 'create_time', 'comment'],
      checkboxVal: defaultFormThead,
      formThead: defaultFormThead
    }
  },
  watch: {
    checkboxVal(varArr) {
      this.formThead = this.formTheadOptions.filter(i => varArr.indexOf(i) >= 0)
      this.key = this.key + 1
    },
    value1: function() {
      this.currentTime = this.value1
      this.getBondRequest()
    },
    currentTime: function() {
      this.getBondRequest()
    }
  },
  mounted() {
    this.getBondRequest()
  },
  methods: {
    getBondRequest() {
      const me = this
      function getDateString() {
        function leadingZeros(n) {
          n = '' + n
          return n.length >= 2 ? n : '0' + n
        }
        return '' + me.currentTime.getFullYear() + leadingZeros(me.currentTime.getMonth() + 1) + leadingZeros(me.currentTime.getDate())
      }
      getBond(getDateString()).then(response => {
        this.tableData = response
      })
      getInitPos(getDateString()).then(response => {
        this.initTable = response
      })
      getLoan(getDateString()).then(response => {
        this.loanTable = response
      })
    }
  }
}
</script>
