export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  async mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    const handler = this.$fixBugIniOS
    await this.$nextTick(handler)
  },
  methods: {
    $fixBugIniOS() {
      const { subMenu } = this.$refs
      const hasHandleMouseleave = subMenu
        ? Reflect.has(subMenu, 'handleMouseleave')
        : false
      if (hasHandleMouseleave) {
        const isMobile = this.isMobile
        const handleMouseleave = subMenu.handleMouseleave
        subMenu.handleMouseleave = (e) => {
          if (isMobile) {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
