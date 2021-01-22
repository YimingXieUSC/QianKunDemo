<template>
  <div class="app-container">

    <div style="height: 20px" />

    <div class="filter-info">
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleReturnLoan">
        Return Loan Today
      </el-button>
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleIncorrectSum">
        Incorrect Sum
      </el-button>
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleFrozen">
        Frozen
      </el-button>
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleInitPos">
        InitPos
      </el-button>
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleStockLoan">
        StockLoan
      </el-button>
      <el-button class="filter-button" style="margin-left: 10px;" type="primary" icon="el-icon-view" @click="handleHistory">
        ShowOperation
      </el-button>
      <div style="height: 20px" />
    </div>
    <!--Table that stores Today Return loan API info -->
    <div v-if="boolReturnLoan" id="returnLoanID">
      <h1>RETURN LOAN TODAY TABLE</h1>
      <el-table :data="todayReturnLoans" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="100%" />
        <el-table-column v-for="item in formThead2" :key="item" :label="item">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--Table that stores frozen loan API info -->
    <div v-if="boolFrozen" id="frozenID">
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
    <div v-if="boolIncorrectSum" id="sumDifferenceID">
      <h1>INIT SUM DIFFERENCE TABLE</h1>
      <div style="height: 20px" />
      <!--DATE SELECTOR-->
      <div class="date-select">
        <span>Choose a Date </span>
        <el-date-picker
          v-model="searchDiffDate"
          type="date"
          placeholder="Search by Start Date"
        />
        <div style="height: 20px" />
      </div>
      <el-table :data="tableForDiff" border fit highlight-current-row style="width: 100%">
        <el-table-column v-for="item in formThead5" :key="item" :label="item" @row-dblclick="showMoreFunction">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--Table that stores init position API info -->
    <div v-if="boolInitPos" id="initTableID">
      <h1>INIT POSITION TABLE</h1>
      <!--DATE SELECTOR-->
      <div class="date-select">
        <span>Choose a Date </span>
        <el-date-picker
          v-model="search_init_start"
          type="date"
          placeholder="Search by Start Date"
        />
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleExcelExportInit">
          Export Table
        </el-button>
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="resetView">
          Reset
        </el-button>
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-sort" @click="handleTransfer">
          Transfer Loan
        </el-button>
        <div style="height: 20px" />
      </div>
      <!--Allow User Transfer long pos to stock_loan-->
      <div v-if="boolEnableTransfer" class="userCard">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Transfer Loan</span>
          </div>
          <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="ID" prop="transfer_id">
              <el-input v-model="ruleForm2.transfer_id" />
            </el-form-item>
            <el-form-item label="Portfilio ID" prop="transfer_portfolio_id">
              <el-input v-model="ruleForm2.transfer_portfolio_id" />
            </el-form-item>
            <el-form-item label="Symbol" prop="transfer_symbol">
              <el-input v-model="ruleForm2.transfer_symbol" />
            </el-form-item>
            <el-form-item label="Amount" prop="transfer_amount">
              <el-input v-model="ruleForm2.transfer_amount" />
            </el-form-item>
            <el-button type="primary" @click="submitTransferForm">ADD</el-button>
            <el-button @click="resetForm('ruleForm2')">RESET</el-button>
            <el-button @click="boolEnableTransfer=false">CANCEL</el-button>
          </el-form>
        </el-card>
      </div>
      <!--Export file as excel-->
      <div v-if="boolExportExcelInit">
        <div>
          <FilenameOption v-model="excelFilename" />
          <AutoWidthOption v-model="excelAutoWidth" />
          <BookTypeOption v-model="excelBookType" />
          <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-download" @click="handleDownloadInit">
            Export
          </el-button>
        </div>
      </div>
      <el-table :data="displayInitData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="id" label="ID" width="100%" />
        <el-table-column v-for="item in formThead" :key="item" :label="item">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--Table that stores Operation History info -->
    <div v-if="boolShowOperation" id="opTableID">
      <h1>Operation History</h1>
      <el-table :data="opRecords" border fit highlight-current-row style="width: 100%">
        <!--<el-table-column prop="id" label="ID" width="100%" />-->
        <el-table-column v-for="item in formThead4" :key="item" :label="item">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--Table that stores stock loan API info -->
    <div v-if="boolStockLoan" id="stockTableID">
      <h1>STOCK LOAN TABLE</h1>
      <!--DATE SELECTOR-->
      <div class="date-select">
        <span> Begin  </span>
        <el-date-picker
          v-model="search_loan_start"
          type="date"
          placeholder="Search by Start Date"
        />
        <span>     End </span>
        <el-date-picker
          v-model="search_loan_end"
          type="date"
          placeholder="Search by End Date"
          style="margin-left:15px;"
        />
        <el-input v-model="portfolio_filter" placeholder="Portfolio ID" style="width: 200px; margin-left: 10px;" class="filter-item" />
        <el-input v-model="symbol_filter" placeholder="Symbol" style="width: 200px; margin-left: 10px;" class="filter-item" />
        <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-search" @click="handleLoanFilter">
          Search
        </el-button>
        <div style="height: 20px" />
      </div>
      <!--Extra Functionalities for Stock Loan-->
      <div class="filter-container">
        <el-button v-waves plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-s-finance" @click="handleClick">
          Loan Return
        </el-button>
        <!--<el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          Add By Excel
        </el-button>-->
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate2">
          Add Stock Loan
        </el-button>
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-document" @click="handleExcelUpload">
          Add By Excel
        </el-button>
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleExcelExport">
          Export Table
        </el-button>
        <el-button plain class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="resetView">
          Reset
        </el-button>
      </div>
      <!--User Return Loan-->
      <div v-if="boolShowReturn" class="userCard" />
      <!--Upload Manually-->
      <div v-if="boolAddLoan" id="userAddID">
        <div style="height: 20px" />
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <div style="height: 20px" />
        <el-button class="filter-item" style="margin-left: 500px;" type="primary" plain icon="el-icon-upload2" @click="handleUpload">
          Upload
        </el-button>
        <el-table :data="tableData" border hig hlight-current-row style="width: 100%;margin-top:20px;">
          <el-table- v-for="item of tableHeader" :key="item" column :prop="item" :label="item" />
        </el-table>
      </div>
      <div v-if="boolAddExcel">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="excelUploadData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of excelUploadHeader" :key="item" :prop="item" :label="item" />
        </el-table>
        <div style="height: 20px" />
        <el-button class="filter-item" style="margin-left: 720px;" type="primary" plain icon="el-icon-upload2" @click="submitExcel">
          Submit
        </el-button>
      </div>
      <!--Export file as excel-->
      <div v-if="boolExportExcel">
        <div>
          <FilenameOption v-model="excelFilename" />
          <AutoWidthOption v-model="excelAutoWidth" />
          <BookTypeOption v-model="excelBookType" />
          <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-download" @click="handleDownload">
            Export
          </el-button>
        </div>
      </div>
      <!--User Manually Upload Data-->
      <div v-if="boolAddManually" class="userCard">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Add Stock Loan Manually</span>
          </div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Portfolio ID" prop="portfolio_id">
              <el-input v-model="ruleForm.portfolio_id" />
            </el-form-item>
            <el-form-item label="Symbol" prop="symbol">
              <el-input v-model="ruleForm.symbol" />
            </el-form-item>
            <el-form-item label="Quantity" prop="quantity">
              <el-input v-model="ruleForm.quantity" />
            </el-form-item>
            <el-form-item label="Interest Rate" prop="interest_rate">
              <el-input v-model="ruleForm.interest_rate" />
            </el-form-item>
            <el-form-item label="Price" prop="price">
              <el-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="Comment" prop="comment">
              <el-input v-model="ruleForm.comment" type="textarea" />
            </el-form-item>
            <el-form-item label="Begin" prop="begin">
              <el-date-picker v-model="ruleForm.begin" type="date" />
            </el-form-item>
            <el-form-item label="End" prop="end">
              <el-date-picker v-model="ruleForm.end" type="date" />
            </el-form-item>
            <el-form-item label="Expected End" prop="expected_end">
              <el-date-picker v-model="ruleForm.expected_end" type="date" />
            </el-form-item>
            <el-form-item label="Create Time" prop="create_time">
              <el-date-picker v-model="ruleForm.create_time" type="date" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">ADD</el-button>
              <el-button @click="resetForm('ruleForm')">RESET</el-button>
              <el-button @click="boolAddManually=false">CANCEL</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <!--Main Loan Table-->
      <div style="height: 20px" />
      <el-table :data="displayLoanTable" border fit highlight-current-row style="width: 100%" @row-dblclick="rightClickReturn">
        <el-table-column prop="id" label="ID" width="100%" />
        <el-table-column v-for="item in formThead2" :key="item" :label="item">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { createOperation, createStockLoans, getInitPos, getInitPosById, getOpRecords, getStockLoans, updateStockLoans, updateInitPos, createMultiStockLoans } from '@/api/bond'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import _ from 'lodash'
import VueSimpleAlert from 'vue-simple-alert'
import FilenameOption from '../excel/components/FilenameOption'
import AutoWidthOption from '../excel/components/AutoWidthOption'
import BookTypeOption from '../excel/components/BookTypeOption'

const moment = require('moment');

const now = moment();
var dateStr = now.format('YYYY-MM-DD');
const defaultFormThead = ['portfolio_id', 'symbol', 'date', 'long_pos', 'stock_loan', 'credit_long', 'com_pnl', 'comment', 'frozen_loan'];
const defaultFormThead2 = ['portfolio_id', 'symbol', 'quantity', 'begin', 'end', 'interest_rate', 'expected_end', 'create_time', 'comment'];
const defaultFormThead3 = ['portfolio_id', 'initSum', 'loanQuantity']
const defaultFormThead4 = ['id', 'message']
const defaultFormThead5 = ['portfolio_id', 'symbol', 'long_pos', 'stock_loan', 'initSum', 'init_time', 'stock_begin', 'stock_end', 'loanQuantity'];

export default {
  name: 'ComplexTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, UploadExcelComponent, VueSimpleAlert, FilenameOption, AutoWidthOption, BookTypeOption },
  directives: { waves },
  data() {
    return {
      downloadLoading: false,
      excelFilename: '',
      excelAutoWidth: true,
      excelBookType: 'xlsx',
      boolExportExcel: false,
      boolExportExcelInit: false,
      excelUploadData: [],
      excelUploadHeader: [],
      tableForDiff: [],
      initPosForDiff: [],
      stockLoanForDiff: [],
      searchDiffDate: new Date(),
      // opdata: stores operation records to be updated to database
      opData: [],
      // opRecords: stores all operation records stored in the database
      opRecords: [],
      // usrData: stores user uploaded data(either via excel or manually)
      usrData: [],
      currentTime: new Date(),
      tableData: [],
      tableHeader: [],
      // returnTodayData: stores loans that needs to be returned today
      returnTodayData: [],
      // initPosData: stores info from Init_Positions API
      initPosData: [],
      displayInitData: [],
      // loanData: stores info from stock_loans API
      loanData: [],
      displayLoanTable: [],
      // frozenTable: stores init_positions where frozen_loan != 0
      frozenTable: [],
      // stock loans that need to be returned today
      todayReturnLoans: [],
      portfolio_filter: '',
      symbol_filter: '',
      search_loan_start: '',
      search_loan_end: '',
      formThead: defaultFormThead,
      formThead2: defaultFormThead2,
      formThead3: defaultFormThead3,
      formThead4: defaultFormThead4,
      formThead5: defaultFormThead5,
      boolReturnLoan: true,
      boolIncorrectSum: false,
      boolFrozen: false,
      boolInitPos: false,
      boolStockLoan: false,
      boolShowOperation: false,
      boolAddLoan: false,
      boolAddManually: false,
      boolAddExcel: false,
      boolShowReturn: false,
      boolEnableTransfer: false,
      ruleForm2: {
        transfer_id: '',
        transfer_portfolio_id: '',
        transfer_symbol: '',
        transfer_amount: ''
      },
      ruleForm: {
        'portfolio_id': 'hahaha9',
        'symbol': 123456,
        'price': 10000,
        'quantity': '5000',
        'begin': '2020-01-01',
        'end': '2020-01-02',
        'interest_rate': 0.5,
        'expected_end': '2020-02-01',
        'create_time': '2020-01-02 12:30:40',
        'comment': ''
      },
      tempStorage: [],
      search_init_start: moment(),
      rules: {
        portfolio_id: [
          { required: true, message: 'Please enter portfolio id', trigger: 'change' }
        ],
        symbol: [
          { required: true, message: 'Please enter symbol', trigger: 'change' }
        ],
        quantity: [
          { required: true, message: 'Please enter quantity', trigger: 'change' }
        ]
      },
      rules2: {
        transfer_id: [
          { required: true, message: 'Please enter id', trigger: 'change' }
        ],
        transfer_amount: [
          { required: true, message: 'Please enter amount to be transferred', trigger: 'change' }
        ]
      },
      tableKey: 0,
      initStart: moment()
    }
  },
  watch: {
    excelUploadData: function() {
      console.log('Excel uplaod data changed')
      var tmpList = []
      _.forEach(this.excelUploadData, i => {
        var tmpJson = {
          'symbol': Number(i.股票代码),
          'portfolio_id': i.portfolio,
          'quantity': Number(i.借券数量),
          'comment': '',
          'interest_rate': 0,
          'price': 0,
          'begin': now.format('YYYY-MM-DD'),
          'end': now.add(1, 'months').format('YYYY-MM-DD'),
          'expected_end': now.format('YYYY-MM-DD'),
          'create_time': now.format('YYYY-MM-DD HH:mm:ss')
        }
        tmpList.push(tmpJson)
      })
    },
    // convert init pos data to utc time
    displayInitData: function() {
      this.convertInitTime(this.displayInitData)
    },
    // convert loan data to utc time
    displayLoanData: function() {
      this.convertLoanTime(this.displayLoanData)
    },
    initPosData: function() {
      this.displayInitData = this.initPosData
      this.filterFrozen()
    },
    search_init_start: function() {
      this.getInitPosData(moment(this.search_init_start).format('YYYYMMDD'))
    },
    searchDiffDate: function() {
      this.getInfoForDiff()
      this.tableForDiff = []
      this.findDiff()
    },
    stockLoanForDiff: function() {
      this.findDiff()
    }
  },
  mounted() {
    this.getInfoForDiff()
    this.findDiff()
    this.getInitPosData(this.initStart.format('YYYYMMDD'))
    this.displayInitData = this.initPosData
    this.convertInitTime(this.displayInitData)
    this.getLoanData()
    this.convertLoanTime(this.displayLoanTable)
    this.getOpData()
    this.resetView()
    this.convertLoanTime(this.displayLoanTable)
    // get return today data
    this.generateReturnTodayData()
  },
  methods: {
    // download stock loan data
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.formThead2
        const filterVal = this.formThead2
        const list = this.displayLoanTable
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.excelFilename,
          autoWidth: this.excelAutoWidth,
          bookType: this.excelBookType
        })
        this.downloadLoading = false
        this.boolExportExcel = false
      })
    },
    // download init position data
    handleDownloadInit() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.formThead
        const filterVal = this.formThead
        const list = this.displayInitData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.excelFilename,
          autoWidth: this.excelAutoWidth,
          bookType: this.excelBookType
        })
        this.downloadLoading = false
        this.boolExportExcelInit = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    // get init position and stock loan request for difference calculation
    getInfoForDiff() {
      getInitPos(moment(this.searchDiffDate).format('YYYYMMDD')).then(response => {
        this.initPosForDiff = response
      })
      this.initPosForDiff = [...this.initPosForDiff]
      getStockLoans().then(response => {
        this.stockLoanForDiff = response
      })
      this.stockLoanForDiff = [...this.stockLoanForDiff]
    },
    // finding symbol and portfolio where quantity and long_los + stock_loan don't match
    findDiff() {
      this.tableForDiff = []
      // tmpGroup1: stockLoan table
      var tmpGroup = _.groupBy(this.stockLoanForDiff, i => `${i.portfolio_id}:${i.symbol}`)
      // tmpGroup2: initPosTable
      var tmpGroup2 = _.groupBy(this.initPosForDiff, i => `${i.portfolio_id}:${i.symbol}`)
      Object.entries(tmpGroup).forEach(([k, v]) => {
        var tmpStockLoan = _.filter(v, i => {
          return moment(i.begin).isSameOrBefore(moment(this.searchDiffDate)) && moment(i.end).isSameOrAfter(moment(this.searchDiffDate))
        })
        var beginTime = 'beginTime'
        var endTime = 'endTime'
        if (tmpStockLoan.length > 0) {
          beginTime = tmpStockLoan[0].begin
          beginTime = tmpStockLoan[0].begin
          endTime = tmpStockLoan[0].end
        }
        var quantitySum = _.sumBy(tmpStockLoan, 'quantity')
        var tmpList = tmpGroup2[k]
        _.forEach(tmpList, i => {
          var tmpSum = i.stock_loan + i.long_pos
          if (quantitySum !== tmpSum) {
            var tmpJson = { 'portfolio_id': i.portfolio_id, 'symbol': i.symbol, 'long_pos': i.long_pos,
              'init_time': moment(this.searchDiffDate).format(),
              'stock_begin': moment(beginTime).format(), 'stock_end': moment(endTime).format(),
              'stock_loan': i.stock_loan, 'initSum': tmpSum, 'loanQuantity': quantitySum }
            this.tableForDiff.push(tmpJson)
          }
        })
      })
    },
    showMoreFunction(row, column, event) {
      var tmpList = []
      _.filter(this.initPosData, u => {
        if (u.portfolio_id === row.portfolio_id) {
          tmpList.push(u.symbol)
        }
      })
      var tmpStr = tmpList.join(', ')
      tmpStr = 'Symbols: ' + tmpStr
      this.$alert(tmpStr)
    },
    // return single stock loan row when double clicked
    rightClickReturn(row, column, event) {
      this.$confirm('Are you sure to return portfolio ' + row.portfolio_id + ' with symbol ' + row.symbol + ' ?').then(
        text => {
          var tmpJSON = { 'end': now.format('YYYY-MM-DD') }
          updateStockLoans(row.id, tmpJSON).then(response => {
            const tmpStr = 'Returned loan ' + row.portfolio_id + ' ' + row.symbol + ' at ' + moment().format('YYYY-MM-DD')
            alert(tmpStr)
            createOperation({ 'message': tmpStr }).then(response => {
            }).catch(function() {
              console.log('Error with create operation rightclick')
            })
          }).catch(function() {
            console.log('Error happened with updateStockLoans rightclick')
          })
          this.getOpData()
          this.getLoanData()
        }
      ).catch(function() {
        console.log('Error happened with rightClickReturn rightclick')
      })
    },
    // update init position with certain id
    patchInitPos(id, data) {
      updateInitPos(id, data).then(response => {
      }).catch(function() {
        console.log('Error happened with updateInitPos!')
      })
    },
    // return all stock loan shown on the table
    handleClick() {
      this.boolAddManually = false
      this.boolAddLoan = false
      this.$confirm('Are you sure to return all stock loans below today?', 'Confirm').then(() => {
        alert('We will be returning the loans shortly')
        console.log('HAHAHAHA', this.displayLoanTable)
        // this.putReturnLoan()
      })
    },
    putReturnLoan() {
      for (const i of this.displayLoanTable) {
        var tmpJSON = { 'end': now.format('YYYY-MM-DD') }
        updateStockLoans(i.id, tmpJSON).then(response => {
        }).catch(function() {
          console.log('Error happened with putReturnLoan!')
        })
      }
    },
    handleTransfer() {
      this.boolEnableTransfer = !this.boolEnableTransfer
    },
    addDefaultStockLoan(data) {
      data['portfolio_id'] = data['portfolio_id'] || 'XXXXX'
      data['symbol'] = data['symbol'] || 'XXXXX'
      data['quantity'] = Number(data['quantity']) || 9999
      data['price'] = Number(data['price']) || 9999
      data['begin'] = data['begin'] ? moment(data['begin']).format('YYYY-MM-DD') : '1900-01-01'
      data['end'] = data['end'] ? moment(data['end']).format('YYYY-MM-DD') : '1900-01-01'
      data['interest_rate'] = Number(data['interest_rate']) || 0
      data['expected_end'] = data['expected_end'] ? moment(data['expected_end']).format('YYYY-MM-DD') : '1900-01-01'
      data['comment'] = data['comment'] || 'XXXXX'
      data['create_time'] = data['create_time'] ? moment(data['create_time']).format('YYYY-MM-DD') + ' 00:00:00' : '2000-01-01 12:12:12'
      return data
    },
    addDefaultValOperation(data) {
      data['ptf_id'] = data['ptf_id'] || 'dddd'
      data['n_long_pos'] = data['n_long_pos'] || 9999
      data['n_stock_loan'] = data['n_stock_loan'] || 9999
      data['o_long_pos'] = data['o_long_pos'] || 9999
      data['n_end_date'] = data['n_end_date'] || '1900-01-01'
      data['o_end_date'] = data['o_end_date'] || '1900-01-01'
      data['o_stock_loan'] = data['o_stock_loan'] || 9999
      data['symbol'] = data['symbol'] || 'XXXXX'
      data['quantity'] = data['quantity'] || 9999
      data['op_code'] = data['op_code'] || 0
      data['op_date'] = data['op_date'] || '1900-01-01'
      return data
    },
    resetUserForm() {
      this.ruleForm.portfolio_id = 'hahaha10'
      this.ruleForm.symbol = 123456
      this.ruleForm.quantity = '5000'
      this.ruleForm.comment = 'hahahahah'
      this.ruleForm.interest_rate = 0.5
      this.ruleForm.price = 10000
      this.ruleForm.begin = '2020-01-01'
      this.ruleForm.end = '2020-01-02'
      this.ruleForm.expected_end = '2020-02-01'
      this.ruleForm.create_time = '2020-01-02 12:30:40'
    },
    resetUserForm2() {
      this.ruleForm2 = {
        transfer_id: '',
        transfer_portfolio_id: '',
        transfer_symbol: '',
        transfer_amount: ''
      }
    },
    submitTransferForm() {
      this.$refs['ruleForm2'].validate((valid) => {
        if (valid) {
          this.usrData = this.ruleForm2
          this.checkTransferValidation(this.ruleForm2.transfer_id, Number(this.ruleForm2.transfer_amount))
          this.resetUserForm2()
        } else {
          alert('Submission Failed')
          return false
        }
      })
    },
    // check transfer loan validation and transfer idNumber with amount if valid
    checkTransferValidation(idNumber, amount) {
      this.tempStorage = _.filter(this.displayInitData, o => {
        return o.id === Number(idNumber)
      })
      if (this.tempStorage.length < 1) {
        alert('ID ' + idNumber + 'does not exist!')
        return false
      } else if (this.tempStorage[0].long_pos <= amount) {
        alert('Long_pos not enough!')
        return false
      } else {
        const tmp1 = this.tempStorage[0].long_pos - Number(amount)
        const tmp2 = this.tempStorage[0].stock_loan + Number(amount)
        const tmpJson = { 'long_pos': tmp1, 'stock_loan': tmp2 }
        this.patchInitPos(idNumber, tmpJson)
        const tmpStr = 'Transferred quantity of ' + amount + ' at ' + moment().format('YYYY-MM-DD') + '(' + this.tempStorage[0].portfolio_id + ')'
        alert(tmpStr)
        createOperation({ 'message': tmpStr }).then(response => {
          console.log('createOperationServiceResponse', response)
        }).catch(function() {
          console.log('Error with create operation')
        })
        this.boolEnableTransfer = false
        this.getInitPosData(moment(this.search_init_start).format('YYYYMMDD'))
        this.getOpData()
        this.displayInitData = this.initPosData
        this.convertInitTime(this.displayInitData)
        alert('Transfer success!')
        return true
      }
    },
    // user manually add stock loan by filling rule form
    submitForm() {
      console.log('Current rule form&', this.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.usrData = this.ruleForm
          const tmpData = this.addDefaultStockLoan(this.usrData)
          createStockLoans(tmpData).then(response => {
            const tmpStr = 'Added stock loan ' + this.usrData.portfolio_id + ' ' + this.usrData.symbol + ' on ' + moment().format('YYYY-MM-DD')
            alert(tmpStr)
            createOperation({ 'message': tmpStr }).then(response => {
              console.log('createOperationServiceResponse', response)
            }).catch(function() {
              console.log('Error with create operation')
            })
            this.resetUserForm()
            this.getOpData()
            // this.usrData = []
          }).catch(function() {
            console.log('error with submitForm!')
          })
          this.boolAddManually = false
        } else {
          alert('Submission Failed')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    convertLoanTime(loan) {
      _.forEach(loan, i => {
        i.begin = moment(i.begin).format()
        i.end = moment(i.end).format()
        i.expected_end = moment(i.expected_end).format()
        i.create_time = moment(i.create_time).format()
      })
      loan = [...loan]
    },
    convertInitTime(initTable) {
      _.forEach(initTable, i => {
        i.date = moment(i.date).format()
      })
      initTable = [...initTable]
    },
    resetView() {
      this.displayLoanTable = [...this.loanData]
      this.convertLoanTime(this.displayLoanTable)
      this.displayInitData = [...this.initPosData]
      this.convertInitTime(this.displayInitData)
    },
    createUserUploadData() {
      // validation
      const tmpData = this.addDefaultStockLoan(this.usrData)
      // upload data to database
      createStockLoans(this.usrData).then(response => {
        console.log('createUserUploadDataResponse', response)
        // this.usrData = []
      })
    },
    generateReturnTodayData() {
      this.todayReturnLoans = _.filter(this.loanData, o => {
        // return moment(o.end).format('YYYY-MM-DD') === '2020-12-08               '
        return moment(o.end).format('YYYY-MM-DD') === moment(now).format('YYYY-MM-DD')
      })
    },
    filterFrozen() {
      this.frozenTable = _.filter(this.initPosData, o => {
        return Number(o.frozen_loan) !== 0
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.excelUploadData = results
      this.excelUploadHeader = header
    },
    // POST operation record to database
    createOperationService() {
      createOperation(this.opData).then(response => {
        console.log('createOperationServiceResponse', response)
      })
    },
    // POST user uploaded data to database
    userUploadStockLoans() {
      createStockLoans(this.usrData).then(response => {
        console.log('userUploadStockLoansResponse', response)
      })
    },
    // GET init_position data from database
    getInitPosData(date) {
      getInitPos(date).then(response => {
        this.initPosData = response
      })
      this.initPosData = [...this.initPosData]
    },
    getInitPosDataById(id) {
      var returnResult = ''
      getInitPosById(id).then(response => {
        returnResult = response
      })
      return returnResult
    },
    // GET op_data from database
    getOpData() {
      getOpRecords().then(response => {
        this.opRecords = response
      })
    },
    // GET stock_loan data from database
    getLoanData() {
      getStockLoans().then(response => {
        this.loanData = response
      })
    },
    // filter stock loan table with certain criteria
    handleLoanFilter() {
      // this.displayLoanTable = this.loanData
      if (this.portfolio_filter !== '') {
        this.displayLoanTable = _.filter(this.loanData, (o) => {
          return o.portfolio_id === this.portfolio_filter
        })
      }
      if (this.symbol_filter !== '') {
        this.displayLoanTable = _.filter(this.displayLoanTable, (o) => {
          return o.symbol === this.symbol_filter
        })
      }
      if (this.search_loan_start !== '') {
        console.log('This.search loan start !== ', moment(this.search_loan_start).format('YYYY-MM-DD'))
        this.displayLoanTable = _.filter(this.displayLoanTable, (o) => {
          return moment(o.begin).format('YYYY-MM-DD') === moment(this.search_loan_start).format('YYYY-MM-DD')
        })
      }
      if (this.search_loan_end !== '') {
        this.displayLoanTable = _.filter(this.displayLoanTable, (o) => {
          return moment(o.end).format('YYYY-MM-DD') === moment(this.search_loan_end).format('YYYY-MM-DD')
        })
      }
      this.displayLoanTable = [...this.displayLoanTable]
      this.portfolio_filter = ''
      this.symbol_filter = ''
      this.search_loan_start = ''
      this.search_loan_end = ''
      this.convertLoanTime(this.displayLoanTable)
    },
    handleLoanReturn() {
      this.boolShowReturn = !this.boolShowReturn
      this.boolAddManually = false
      this.boolAddLoan = false
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleReturnLoan() {
      this.boolReturnLoan = true
      this.boolIncorrectSum = false
      this.boolFrozen = false
      this.boolInitPos = false
      this.boolAddExcel = false
      this.boolStockLoan = false
      this.boolShowOperation = false
    },
    handleIncorrectSum() {
      this.boolReturnLoan = false
      this.boolIncorrectSum = true
      this.boolFrozen = false
      this.boolInitPos = false
      this.boolAddExcel = false
      this.boolStockLoan = false
      this.boolShowOperation = false
    },
    handleFrozen() {
      this.boolReturnLoan = false
      this.boolIncorrectSum = false
      this.boolFrozen = true
      this.boolInitPos = false
      this.boolAddExcel = false
      this.boolStockLoan = false
      this.boolShowOperation = false
    },
    handleInitPos() {
      this.boolReturnLoan = false
      this.boolIncorrectSum = false
      this.boolFrozen = false
      this.boolAddExcel = false
      this.boolInitPos = true
      this.boolStockLoan = false
      this.boolShowOperation = false
    },
    handleStockLoan() {
      this.boolReturnLoan = false
      this.boolIncorrectSum = false
      this.boolAddExcel = false
      this.boolFrozen = false
      this.boolInitPos = false
      this.boolStockLoan = true
      this.boolShowOperation = false
      this.resetView()
    },
    handleHistory() {
      this.boolReturnLoan = false
      this.boolIncorrectSum = false
      this.boolFrozen = false
      this.boolInitPos = false
      this.boolAddExcel = false
      this.boolStockLoan = false
      this.boolShowOperation = true
    },
    handleExcelUpload() {
      this.boolAddExcel = !this.boolAddExcel
    },
    handleExcelExport() {
      this.boolExportExcel = !this.boolExportExcel
    },
    handleExcelExportInit() {
      this.boolExportExcelInit = !this.boolExportExcelInit
    },
    // submit user submitted excel file after validation
    submitExcel() {
      var currentDate = moment()
      var tmpList = []
      var tmpOpStr = 'Added stock loan '
      _.forEach(this.excelUploadData, i => {
        console.log('i', i)
        if ((typeof i[' 借券数量 '] === 'number') && (typeof i.股票代码 === 'number') && (typeof i.portfolio === 'string')) {
          var tmpJson = {
            'symbol': Number(i.股票代码),
            'portfolio_id': i.portfolio,
            'quantity': Number(i[' 借券数量 ']),
            'comment': '',
            'interest_rate': 0,
            'price': 0,
            'begin': currentDate.format('YYYY-MM-DD'),
            'end': currentDate.add(1, 'months').format('YYYY-MM-DD'),
            'expected_end': moment().format('YYYY-MM-DD'),
            'create_time': moment().format('YYYY-MM-DD HH:mm:ss')
          }
          tmpOpStr += i.portfolio + ' ' + i.股票代码 + ', '
          tmpList.push(tmpJson)
        } else {
          alert('借券数量 ', i[' 借券数量 '], ' 股票代码 ', i.股票代码, ' portfolio ', i.portfolio, ' is not valid!')
        }
      })
      if (tmpList.length > 0) {
        tmpOpStr += 'on ' + moment().format('YYYY-MM-DD')
        createMultiStockLoans(tmpList).then(response => {
          alert(tmpOpStr)
          createOperation({ 'message': tmpOpStr }).then(response => {
            console.log('createOperationServiceResponse', response)
            this.getOpData()
          }).catch(function() {
            console.log('Error with create operation')
          })
        }).catch()
      }
      this.boolAddExcel = false
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.boolAddLoan = !this.boolAddLoan
      this.boolAddManually = false
    },
    handleCreate2() {
      this.boolAddManually = !this.boolAddManually
      this.boolAddLoan = false
    },
    handleUpload() {
      this.usrData = this.tableData
      this.createUserUploadData()
      this.usrData = []
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
