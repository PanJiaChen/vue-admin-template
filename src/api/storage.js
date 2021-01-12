import request from '@/utils/request'

export function upload_img(data) {
  return request({
    url: '/contract_storage/upload_img',
    method: 'post',
    data
  })
}

export function delete_img(data) {
  return request({
    url: '/contract_storage/delete_img',
    method: 'post',
    data
  })
}

export function query_contract_storage_record(data) {
  return request({
    url: '/contract_storage/query',
    method: 'post',
    data
  })
}

export function add_contract_storage_record(data) {
  return request({
    url: '/contract_storage/add',
    method: 'post',
    data
  })
}

export function modify_contract_storage_record(data) {
  return request({
    url: '/contract_storage/modify',
    method: 'post',
    data
  })
}

export function delete_contract_storage_record(data) {
  return request({
    url: '/contract_storage/delete',
    method: 'post',
    data
  })
}

// 成衣出库一览
export function query_storage_cloth(data) {
  return request({
    url: '/contract_storage/cloth',
    method: 'post',
    data
  })
}

export function get_storage_cloth() {
  return request({
    url: '/contract_storage/cloth_all',
    method: 'get'
  })
}

// 面辅料服饰入库一览
export function query_storage_fabric_sup(data) {
  return request({
    url: '/contract_storage/fabric_sup',
    method: 'post',
    data
  })
}

export function get_storage_fabric_sup() {
  return request({
    url: '/contract_storage/fabric_sup_all',
    method: 'get'
  })
}

// 成衣库存
export function get_contract_detail(data) {
  return request({
    url: '/cloth_stock/contract_detail',
    method: 'post',
    data
  })
}

export function get_fabric_sup_detail(data) {
  return request({
    url: '/fabric_sup_stock/contract_detail',
    method: 'post',
    data
  })
}

// 仓库
export function query_warehouse(data) {
  return request({
    url: '/warehouse/query',
    method: 'post',
    data
  })
}

export function add_warehouse(data) {
  return request({
    url: '/warehouse/add',
    method: 'post',
    data
  })
}

export function modify_warehouse(data) {
  return request({
    url: '/warehouse/modify',
    method: 'post',
    data
  })
}

export function delete_warehouse(data) {
  return request({
    url: '/warehouse/delete',
    method: 'post',
    data
  })
}

export function get_warehouse_label() {
  return request({
    url: '/warehouse/label',
    method: 'get'
  })
}

export function add_stock_record(data) {
  return request({
    url: '/stock_record/add',
    method: 'post',
    data
  })
}

export function modify_stock_record(data) {
  return request({
    url: '/stock_record/modify',
    method: 'post',
    data
  })
}

export function delete_stock_record(data) {
  return request({
    url: '/stock_record/delete',
    method: 'post',
    data
  })
}

export function delete_stock_record_overall(data) {
  return request({
    url: '/stock_record_overall/delete',
    method: 'post',
    data
  })
}

export function query_stock_record_overall(data) {
  return request({
    url: '/stock_record_overall/query',
    method: 'post',
    data
  })
}

export function query_stock_records(data) {
  return request({
    url: '/stock_record/query',
    method: 'post',
    data
  })
}
