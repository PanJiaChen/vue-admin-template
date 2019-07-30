/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const mixin = {
  methods: {
    isExternal
  }
}

export default mixin
