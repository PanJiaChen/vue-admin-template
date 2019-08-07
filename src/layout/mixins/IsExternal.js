/**
 * Is External Mixin.
 *
 * Basically just check if the link is a full URL or not.
 *
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
