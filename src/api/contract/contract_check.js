import request from '@/utils/request'

// 合同审核颜色
export function queryContractCheckColor(data) {
  return request({
    url: '/contract_check_color/query',
    method: 'post',
    data
  })
}

export function addContractCheckColor(data) {
  return request({
    url: '/contract_check_color/add',
    method: 'post',
    data
  })
}

export function modifyContractCheckColor(data) {
  return request({
    url: '/contract_check_color/modify',
    method: 'post',
    data
  })
}

export function deleteContractCheckColor(data) {
  return request({
    url: '/contract_check_color/delete',
    method: 'post',
    data
  })
}

// 合同审核价格
export function queryContractCheckPrice(data) {
  return request({
    url: '/contract_check_price/query',
    method: 'post',
    data
  })
}

export function queryContractCheckPrice_product(data) {
  return request({
    url: '/contract_check_price/product',
    method: 'post',
    data
  })
}

export function addContractCheckPrice(data) {
  return request({
    url: '/contract_check_price/add',
    method: 'post',
    data
  })
}

export function modifyContractCheckPrice(data) {
  return request({
    url: '/contract_check_price/modify',
    method: 'post',
    data
  })
}

export function deleteContractCheckPrice(data) {
  return request({
    url: '/contract_check_price/delete',
    method: 'post',
    data
  })
}

export function queryMaterialName() {
  return request({
    url: '/material/query_name',
    method: 'get'
  })
}

export function queryProvider() {
  return request({
    url: '/provider/query_provider',
    method: 'get'
  })
}

export function checkState(data) {
  return request({
    url: '/new_contract/check_state',
    method: 'post',
    data
  })
}

export function unLock(data) {
  return request({
    url: '/new_contract/unlock',
    method: 'post',
    data
  })
}

export function queryContractProduct(data) {
  return request({
    url: '/contract_product/query',
    method: 'post',
    data
  })
}

export function modifyContractProduct(data) {
  return request({
    url: '/contract_product/modify',
    method: 'post',
    data
  })
}

export function addContractProduct(data) {
  return request({
    url: '/contract_product/add',
    method: 'post',
    data
  })
}

export function deleteContractProduct(data) {
  return request({
    url: '/contract_product/delete',
    method: 'post',
    data
  })
}

export function submit_production(data) {
  return request({
    url: '/contract_product/submit',
    method: 'post',
    data
  })
}

export function export_fabric_contract(data) {
  return request({
    url: '/excel/fabric_contract',
    method: 'post',
    data
  })
}

export function export_cloth_contract(data) {
  return request({
    url: '/excel/cloth_contract',
    method: 'post',
    data
  })
}
