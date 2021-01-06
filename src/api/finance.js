import request from '@/utils/request'
// 财务-应付款
export function get_all_finance_provider() {
  return request({
    url: '/finance_provider/all',
    method: 'get'
  })
}

export function query_finance_providers(data) {
  return request({
    url: '/finance_provider/query',
    method: 'post',
    data
  })
}

export function query_storage_details(data) {
  return request({
    url: '/finance_provider/storage',
    method: 'post',
    data
  })
}

export function query_provider_checking(data) {
  return request({
    url: '/finance_provider/checking',
    method: 'post',
    data
  })
}

// 财务-应收款
export function get_all_finance_customer() {
  return request({
    url: '/finance_customer/all',
    method: 'get'
  })
}

export function query_finance_customers(data) {
  return request({
    url: '/finance_customer/query',
    method: 'post',
    data
  })
}

export function unit_price_checked(data) {
  return request({
    url: '/finance_customer/unit_price_check',
    method: 'post',
    data
  })
}

export function query_storage_out_details(data) {
  return request({
    url: '/finance_customer/storage',
    method: 'post',
    data
  })
}

export function received_checked(data) {
  return request({
    url: '/finance_customer/received_check',
    method: 'post',
    data
  })
}

export function get_contract_customer_detail(data) {
  return request({
    url: '/finance_customer/detail',
    method: 'post',
    data
  })
}

export function query_customer_checking(data) {
  return request({
    url: '/finance_customer/checking',
    method: 'post',
    data
  })
}

export function get_contract_provider_detail(data) {
  return request({
    url: '/finance_provider/detail',
    method: 'post',
    data
  })
}

// 扣损/附加费
export function modify_loss_fee(data) {
  return request({
    url: '/finance_provider/loss_fee',
    method: 'post',
    data
  })
}

export function modify_loss_fee_customer(data) {
  return request({
    url: '/finance_customer/loss_fee',
    method: 'post',
    data
  })
}
// 付款审核
export function payment_check(data) {
  return request({
    url: '/finance_provider/check',
    method: 'post',
    data
  })
}

// 付款/收款/开票
export function query_payment_receipt(data) {
  return request({
    url: '/payment_receipt/query',
    method: 'post',
    data
  })
}

export function add_payment_receipt(data) {
  return request({
    url: '/payment_receipt/add',
    method: 'post',
    data
  })
}

export function modify_payment_receipt(data) {
  return request({
    url: '/payment_receipt/modify',
    method: 'post',
    data
  })
}

export function delete_payment_receipt(data) {
  return request({
    url: '/payment_receipt/delete',
    method: 'post',
    data
  })
}
export function query_payment_receipt_overall_provider(data) {
  return request({
    url: '/payment_receipt/overall',
    method: 'post',
    data
  })
}

// 付款/收款/开票
export function query_payment_receipt_customer(data) {
  return request({
    url: '/payment_receipt_customer/query',
    method: 'post',
    data
  })
}

export function add_payment_receipt_customer(data) {
  return request({
    url: '/payment_receipt_customer/add',
    method: 'post',
    data
  })
}

export function modify_payment_receipt_customer(data) {
  return request({
    url: '/payment_receipt_customer/modify',
    method: 'post',
    data
  })
}

export function delete_payment_receipt_customer(data) {
  return request({
    url: '/payment_receipt_customer/delete',
    method: 'post',
    data
  })
}

export function query_payment_receipt_overall_customer(data) {
  return request({
    url: '/payment_receipt_customer/overall',
    method: 'post',
    data
  })
}

// 其他费用
export function query_otherfee(data) {
  return request({
    url: '/other_fee/query',
    method: 'post',
    data
  })
}

export function add_otherfee(data) {
  return request({
    url: '/other_fee/add',
    method: 'post',
    data
  })
}

export function modify_otherfee(data) {
  return request({
    url: '/other_fee/modify',
    method: 'post',
    data
  })
}

export function delete_otherfee(data) {
  return request({
    url: '/other_fee/delete',
    method: 'post',
    data
  })
}

// 合同核算
export function query_accounting(data) {
  return request({
    url: '/contract_accounting/query',
    method: 'post',
    data
  })
}

export function other_info(data) {
  return request({
    url: '/contract_accounting/other_info',
    method: 'post',
    data
  })
}

export function modify_discription(data) {
  return request({
    url: '/contract_accounting/modify',
    method: 'post',
    data
  })
}
