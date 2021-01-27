import request from '@/utils/request'
// import * as Config from '../utils/config'

// console.log(Config)

export function getBond(date) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL_BACK + '/api/tops/loans?date=' + date,
    // params: date,
    method: 'get'
  })
}

export function getInistPos(date) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL_BACK + '/api/tops/init_positions?date=' + date,
    method: 'get'
  })
}

export function getLoan(date) {
  return request({
    // VUE_APP_STOCK_API_URL = 'http://192.168.11.109:3000'
    // VUE_APP_STOCK_API_URL_backup = 'http://192.168.11.191:8097'
    // VUE_APP_STOCK_API_URL_BACK = 'http://192.168.11.109:3000'
    // VUE_APP_MARKET_API_URL = 'http://192.168.11.109:3000'

    url: process.env.VUE_APP_STOCK_API_URL_BACK + '/api/tops/loans?date=' + date,
    method: 'get'
  })
}

// GET init_positions API info by date
export function getInitPos(date) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL_backup + '/api/v1/init_positions?date=' + date,
    method: 'get'
  })
}
// GET init_positions API info by id
export function getInitPosById(id) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + '/api/v1/init_positions?id=' + id,
    method: 'get'
  })
}

// GET stock loan API info
export function getStockLoans() {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL_backup + '/api/v1/stock_loans',
    method: 'get'
  })
}
// GET operation records
export function getOpRecords() {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + '/api/v1/loan_opt/get_all',
    method: 'get'
  })
}
// POST operation records
export function createOperation(data) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + '/api/v1/loan_opt/post',
    method: 'post',
    data
  })
}
// POST user uploaded stock_loans data
export function createStockLoans(data) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + '/api/v1/stock_loans/post',
    method: 'post',
    data
  })
}
// POST user uploaded stock_loans data
export function createMultiStockLoans(data) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + '/api/v1/stock_loans/postAll',
    method: 'post',
    data
  })
}
// PUT user uploaded stock_loans data
export function updateStockLoans(id, data) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + `/api/v1/stock_loans/${id}`,
    method: 'put',
    data
  })
}

// PUT user uploaded initial position data
export function updateInitPos(id, data) {
  return request({
    url: process.env.VUE_APP_STOCK_API_URL + `api/v1/init_positions/${id}`,
    method: 'put',
    data
  })
}
