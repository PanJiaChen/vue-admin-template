import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios

export function getAreasList() {
  const url = 'https://netapi.danderdee.com/api/areas'
  this.$http.get(url, {
    headers: {
      Accept: 'application/json'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error: ' + error
  })
}

export function createAnArea(postCode) {
  const url = 'https://netapi.danderdee.com/api/areas'
  const payload = {
    postCode: postCode
  }
  this.$http.post(url, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error' + error
  })
}

export function aproveAnArea(id) {
  const url = 'https://netapi.danderdee.com/api/areas/approve'
  const payload = {
    id: id
  }
  this.$http.post(url, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error' + error
  })
}

export function disaproveAnArea(id) {
  const url = 'https://netapi.danderdee.com/api/areas/disapprove'
  const payload = {
    id: id
  }
  this.$http.post(url, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error' + error
  })
}

export function addWikiContent(id) {
  const url = 'https://netapi.danderdee.com/api/areas/addwiki'
  const payload = {
    id: id
  }
  this.$http.post(url, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error' + error
  })
}

export function changeWikiContent(id, info) {
  const url = 'https://netapi.danderdee.com/api/areas/changewiki'
  const payload = {
    id: id,
    info: info
  }
  this.$http.post(url, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    return result.data
  }).catch(error => {
    return 'error' + error
  })
}
