/**
 * LayoutDependent
 *
 * #UpdatingLocalSlot
 *
 * Refer to LayoutProvider mixin for top level component from which we can create repleacable contents.
 *
 * Helpers to handle slot swapping.
 *
 * This Mixin shows two Methods:
 * 1. slotMountAll - Use `<slot />`, and replace contents
 * 2. createComponentDefinition - Use dynamic `<component />`
 *
 * @type {import('vue').VueConstructor}
 */
const main = {

  /**
   * Ensure the top level "layout" component HAS the provide method.
   * Or make it use LayoutProvider mixin.
   */
  inject: ['layout'],

  methods: {
    /**
     * rel=#UpdatingLocalSlot
     * Method 1:
     * Call slotMountAll at a Vue lifecycle hook twice.
     * Read more in comments found at the top of LayoutProvider
     */
    slotMount(name, target = 'default') {
      const hasLayout = 'layout' in this
      const scopedSlotFn = hasLayout ? this.layout.$scopedSlots[name] : null
      if (scopedSlotFn) {
        const props = Object.assign({}, this.$attrs, this.$props)
        this.$slots[target] = scopedSlotFn(props)
      }
    },

    createFallbackComponentDefinition() {
      return {
        functional: true,
        render(h, context) {
          return context.children
        }
      }
    },

    /**
     * rel=#UpdatingLocalSlot
     * Method 2:
     * Use `<component :is="foo.is" :key="foo.key" />`
     * Read more in comments found at the top of LayoutProvider
     */
    createComponentDefinition(name) {
      const hasLayout = 'layout' in this
      const is = hasLayout ? this.layout.renderSlotHelper(name) : this.createFallbackComponentDefinition()
      const { _uid = +new Date() } = this
      const key = `${name}--uid:${_uid}`
      return {
        is,
        key
      }
    }
  },

  beforeMount() {
    if ('slotMountAll' in this) {
      this.slotMountAll()
    }
  },

  beforeUpdate() {
    if ('slotMountAll' in this) {
      this.slotMountAll()
    }
  }
}

export default main
