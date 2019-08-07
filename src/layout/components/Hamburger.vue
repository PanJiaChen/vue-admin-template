<template>
  <div
    class="layout-navbar-hamburger--component"
    :class="classObj"
    @click="handleClick"
  >
    <div class="hamburger">
      <component :is="hamburgerSlot.is" :key="hamburgerSlot.key">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
        >
          <path
            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
          />
        </svg>
      </component>
    </div>
  </div>
</template>

<script>
import { LayoutDependent } from '../mixins'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutHamburger',

  mixins: [LayoutDependent],

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      openedInternalState: false
    }
  },

  computed: {
    hamburgerSlot() {
      // rel=#UpdatingLocalSlot Method 2
      const name = 'hamburger'
      const slot = this.createComponentDefinition(name)
      return slot
    },

    opened() {
      const sidebarOpened = 'layout' in this ? this.layout.sidebarOpened : this.openedInternalState
      return sidebarOpened
    },

    classObj() {
      const isActive = this.opened || false
      return {
        'navbar-hamburger': true,
        'is-navbar-hamburger-active': isActive
      }
    }
  },

  async created() {
    const sidebarOpened = 'layout' in this ? this.layout.sidebarOpened : this.isActive
    this.openedInternalState = sidebarOpened
  },

  methods: {
    handleClick() {
      const opened = this.opened
      if ('layout' in this) {
        this.layout.toggleOpenedSidebar({ opened })
      }
      this.openedInternalState = !opened
      this.$emit('layout-hamburger-click')
    }
  }
}
</script>

<style scoped>
.layout-navbar-hamburger--component {
  padding: 13px 5px 13px 10px;
  line-height: 0;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}

.navbar-hamburger {
  display: inline-block;
  vertical-align: middle;
}
.is-navbar-hamburger-active .hamburger {
  transform: rotate(180deg);
}
.is-navbar-hamburger-active .hamburger:hover {
  background: rgba(0, 0, 0, 0.025);
}
</style>
