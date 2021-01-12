import request from '@/utils/request'

export function getAllContracts(data) {
  return request({
    url: '/new_contract/all',
    method: 'post',
    data
  })
}

export function queryContracts(data) {
  return request({
    url: '/new_contract/query',
    method: 'post',
    data
  })
}

export function getContractsDetail(data) {
  return request({
    url: '/new_contract/detail',
    method: 'post',
    data
  })
}

export function addContracts(data) {
  return request({
    url: '/new_contract/add',
    method: 'post',
    data
  })
}

export function modifyContracts(data) {
  return request({
    url: '/new_contract/modify',
    method: 'post',
    data
  })
}

export function deleteContracts(data) {
  return request({
    url: '/new_contract/delete',
    method: 'post',
    data
  })
}

export function add_contract_finish(data) {
  return request({
    url: '/new_contract/finish',
    method: 'post',
    data
  })
}

export function querySalesman() {
  return request({
    url: '/user/query_salesman',
    method: 'get'
  })
}

export function queryCustomer() {
  return request({
    url: '/customer/query_company',
    method: 'get'
  })
}

export function upload(data) {
  return request({
    url: '/new_contract/upload',
    method: 'post',
    data
  })
}

export function query_contract_id(data) {
  return request({
    url: '/contract_detail/contract_id',
    method: 'post',
    data
  })
}

export function query_style_id(data) {
  return request({
    url: '/contract_detail/style_id',
    method: 'post',
    data
  })
}

export function query_style_name(data) {
  return request({
    url: '/contract_detail/style_name',
    method: 'post',
    data
  })
}

export function query_color(data) {
  return request({
    url: '/contract_detail/color',
    method: 'post',
    data
  })
}

export function query_name(data) {
  return request({
    url: '/contract_detail/name',
    method: 'post',
    data
  })
}

export function query_contract_detail(data) {
  return request({
    url: '/contract_detail/query',
    method: 'post',
    data
  })
}

// 合同进度
export function add_contract_process(data) {
  return request({
    url: '/contract_process/add',
    method: 'post',
    data
  })
}

export function get_contract_process(data) {
  return request({
    url: '/contract_process/all',
    method: 'post',
    data
  })
}

export function delete_contract_process(data) {
  return request({
    url: '/contract_process/delete',
    method: 'post',
    data
  })
}

export function modify_contract_process(data) {
  return request({
    url: '/contract_process/modify',
    method: 'post',
    data
  })
}

// 翻单
export function repeat(data) {
  return request({
    url: '/new_contract/repeat',
    method: 'post',
    data
  })
}

export function audio_upload(data) {
  return request({
    url: '/contract_process/audio_upload',
    method: 'post',
    data
  })
}

