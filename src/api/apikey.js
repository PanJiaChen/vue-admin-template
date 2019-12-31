import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios

export function generateApiKey() {
  const url = 'https://netapi.danderdee.com/api/apikey/generate'
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

export function viewCurrentApiKey() {
  const url = 'https://netapi.danderdee.com/api/apikey/view'
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

export function viewSystemDataFromExternalSystems(key, device, location) {
  const url = 'https://netapi.danderdee.com/api/webportal/data'
  if (key === null) {
    return null
  } else {
    if (device != null && location != null) {
      this.$http.get(url, {
        params: {
          device: device,
          location: location
        },
        headers: {
          key: key,
          Accept: 'application/json'
        }}).then(result => {
        return result.data
      }).catch(error => {
        return 'error: ' + error
      })
    } else if (device != null && location == null) {
      this.$http.get(url, {
        params: {
          device: device
        },
        headers: {
          key: key,
          Accept: 'application/json'
        }}).then(result => {
        return result.data
      }).catch(error => {
        return 'error: ' + error
      })
    } else if (device == null && location != null) {
      this.$http.get(url, {
        params: {
          location: location
        },
        headers: {
          key: key,
          Accept: 'application/json'
        }}).then(result => {
        return result.data
      }).catch(error => {
        return 'error: ' + error
      })
    } else {
      this.$http.get(url, {
        headers: {
          key: key,
          Accept: 'application/json'
        }}).then(result => {
        return result.data
      }).catch(error => {
        return 'error: ' + error
      })
    }
  }
}

export function getListOfCountries(apiKey) {
  const url = 'https://netapi.danderdee.com/api/webportal/countries'
  this.$http.get(url, {
    headers: {
      key: apiKey,
      Accept: 'application/json'
    }}).then(result => {
    return result.data
  }).catch(error => {
    return 'error: ' + error
  })
}

export function getListOfAllRegionsByCountries(apiKey, countries) {
  const url = 'https://netapi.danderdee.com/api/webportal/data'
  this.$http.get(url, {
    params: {
      countries: countries
    },
    headers: {
      key: apiKey,
      Accept: 'application/json'
    }}).then(result => {
    return result.data
  }).catch(error => {
    return 'error: ' + error
  })
}

export function getListOfAllCitiesByRegions(apiKey, cities) {
  const url = 'https://netapi.danderdee.com/api/webportal/cities'
  this.$http.get(url, {
    params: {
      regions: cities
    },
    headers: {
      key: apiKey,
      Accept: 'application/json'
    }}).then(result => {
    return result.data
  }).catch(error => {
    return 'error: ' + error
  })
}

export function getCountryData(apiKey) {
  const url = 'https://netapi.danderdee.com/api/webportal/country-data'
  this.$http.get(url, {
    headers: {
      key: apiKey,
      Accept: 'application/json'
    }}).then(result => {
    return result.data
  }).catch(error => {
    return 'error: ' + error
  })
}

export function getLocationData(apiKey, country) {
  const url = 'https://netapi.danderdee.com/api/webportal/location-data'
  if (country != null) {
    this.$http.get(url, {
      params: {
        country: country
      },
      headers: {
        key: apiKey,
        Accept: 'application/json'
      }}).then(result => {
      return result.data
    }).catch(error => {
      return 'error: ' + error
    })
  } else {
    this.$http.get(url, {
      headers: {
        key: apiKey,
        Accept: 'application/json'
      }}).then(result => {
      return result.data
    }).catch(error => {
      return 'error: ' + error
    })
  }
}
