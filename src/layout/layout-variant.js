const WIDTH = 992 // refer to Bootstrap's responsive design

export function onMounted() {
  const hasMethod = Reflect.has(this, 'checkIfMobile')
  const hasResizeHandler = Reflect.has(this, 'onResize')
  const hasEl = Reflect.has(this, '$el')
  // console.log('layout-variant onMounted', { hasMethod, hasResizeHandler, hasEl })
  if (hasMethod && hasResizeHandler && hasEl) {
    const isMobile = this.checkIfMobile()
    const { defaultView } = this.$el.ownerDocument
    const handler = this.onResize
    const layoutVariant = isMobile ? 'mobile' : 'desktop'
    this.layoutVariant = layoutVariant
    this.$emit('layout-variant', layoutVariant)
    defaultView.addEventListener('resize', handler)
    if (isMobile) {
      this.$emit('layout-sidebar', { opened: false, withoutAnimation: true })
    }
  } else {
    const message = `Please make sure you attach onMounted event handler to a Vue mounted lifecycle hook`
    throw new Error(message)
  }
}

export function checkIfMobile() {
  const hasEl = Reflect.has(this, '$el')
  const mobileBreakPoint = this.mobileBreakPoint ? this.mobileBreakPoint : WIDTH
  let isMobile = false
  // console.log('layout-variant checkIfMobile', { mobileBreakPoint, hasEl })
  if (hasEl) {
    const $el = this.$el
    let bodyRectWidth = mobileBreakPoint
    const hasOwnerDocument = 'ownerDocument' in $el
    let hasMethodName = false
    if (hasOwnerDocument) {
      const { body } = $el.ownerDocument
      hasMethodName = 'getBoundingClientRect' in body
      if (hasMethodName) {
        const bodyRect = body.getBoundingClientRect()
        bodyRectWidth = bodyRect.width
      }
    }
    isMobile = bodyRectWidth - 1 < mobileBreakPoint

    return isMobile
  } else {
    const message = `Please make sure you attach checkIfMobile to a Vue component as a method`
    throw new Error(message)
  }
}

/** @type {import('vue').VueConstructor} */
const mixin = {
  data() {
    const layoutVariant = 'desktop'
    const layoutIsHidden = false
    return {
      layoutVariant,
      layoutIsHidden
    }
  },
  props: {
    mobileBreakPoint: {
      type: Number,
      default: WIDTH
    },
    checkIfMobile: {
      type: Function,
      default() {
        return checkIfMobile.call(this)
      }
    }
  },
  computed: {
    isMobile() {
      const layoutVariant = this.layoutVariant
      return layoutVariant === 'mobile'
    }
  },
  async beforeDestroy() {
    const handler = this.onResize
    const $el = this.$el
    await this.$nextTick(async() => {
      const { defaultView } = $el.ownerDocument
      defaultView.removeEventListener('resize', handler)
    })
  },
  async mounted() {
    await this.$nextTick(onMounted.bind(this))
  },
  methods: {
    onResize() {
      const { hidden = false } = this.$el.ownerDocument
      const isMobile = this.checkIfMobile(this)
      const layoutVariant = isMobile ? 'mobile' : 'desktop'
      const layoutVariantChanged = layoutVariant !== this.layoutVariant
      console.log('layout-variant.methods.onResize', { hidden, isMobile, layoutVariant, layoutVariantChanged })
      this.layoutVariant = layoutVariant
      if (!hidden && layoutVariantChanged) {
        this.$emit('layout-variant', layoutVariant)
        this.$emit('layout-sidebar', {
          opened: !isMobile,
          withoutAnimation: true
        })
      }
    }
  }
}

export default mixin
