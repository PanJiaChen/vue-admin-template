<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)" class="layout-sidebar-link--component">
    <slot />
  </component>
</template>

<script>
import { IsExternal } from '@/mixins'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'SidebarLink',
  mixins: [IsExternal],
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(href) {
      if (this.isExternal(href)) {
        return {
          is: 'a',
          href,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: href
      }
    }
  }
}
</script>
