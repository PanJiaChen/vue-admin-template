<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps">
    <slot />
  </component>
</template>

<script>
import { IsExternal } from '../../mixins'

function createClassObj(is = 'a') {
  const isAnchor = is === 'a'
  const additionalClassName = isAnchor
    ? 'layout-sidebar-external'
    : 'layout-sidebar-router-link'
  return {
    'layout-sidebar-link--component': true,
    [additionalClassName]: true
  }
}

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutSidebarLink',

  mixins: [IsExternal],

  props: {
    to: {
      type: String,
      required: true
    }
  },

  computed: {
    linkProps() {
      const to = this.to || ''
      const external = this.isExternal(to)
      const tagName = external ? 'a' : 'router-link'
      const classObj = createClassObj(tagName)
      if (external) {
        return {
          is: 'a',
          href: to,
          target: '_blank',
          rel: 'noopener',
          class: classObj
        }
      }
      return {
        is: 'router-link',
        to,
        class: classObj
      }
    }
  }
}
</script>
