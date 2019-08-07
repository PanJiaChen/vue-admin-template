import Vue from 'vue'

/**
 * #SvgIconLayoutAndLocal
 *
 * Since this project can either be used as a template,
 * OR as a workspace to work on an Application Layout theme
 * TO EXPORT it as an IMPORTABLE Vue.js component,
 * we're here importing SvgIcon component from @/layout/components namespace
 * so we don't need to copy the file around.
 *
 * This file here is useful in the context of a template staring point
 * That's why we're registering globally.
 *
 * A project importing @/layout namespace would ALSO have to import this
 * module.
 */
import SvgIcon from '@/layout/components/SvgIcon.vue'
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
