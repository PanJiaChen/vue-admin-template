<template>
  <div v-if="isExternalIcon" :style="styleExternalIcon" class="svg-external-icon svg-icon svg-icon--component" :class="{'svg-icon-default': requiredIconClassMissing}" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="xLinkHref" />
  </svg>
</template>

<script>
import defaultIcon from '../../icons/svg/example.svg'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'SvgIcon',

  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * rel=#SvgIconLayoutAndLocal
     *
     * Notice we're not importing IsExternal from @/layout/mixins.
     * Because this component will be used in BOTH as part of a bundle
     * AND also when using this project as a starting point
     */
    isExternalIcon() {
      if (this.requiredIconClassMissing) {
        return true
      }
      const path = this.iconClass
      return /^(https?:|mailto:|tel:)/.test(path)
    },

    onlyWhenNoIcon() {
      /**
       * INCOMPLETE @TODO
       * Figure out a way to embed a fallback SVG icon as part of this module.
       * That can be useful either when imported outside of vue-admin-template project
       * in development mode, that when we use this module when importing.
       */
      const imageData = this.requiredIconClassMissing ? this.defaultIconXml : void 0
      let out = null
      if (imageData) {
        out = 'data:image/svg+xml;utf8,'
        let inlineSvg = ''

        // This should work to start with.
        inlineSvg += String(imageData).replace(/symbol/g, 'svg')

        // inlineSvg += '<svg xmlns="http://www.w3.org/2000/svg">'
        // inlineSvg += imageData
        // inlineSvg += '</svg>'

        out += inlineSvg
      }
      return out
    },

    requiredIconClassMissing() {
      return this.iconClass === ''
    },

    xLinkHref() {
      let iconClass = this.iconClass
      if (this.requiredIconClassMissing) {
        iconClass = 'example'
      }
      return `#icon-${iconClass}`
    },

    svgClass() {
      let className = this.className
      if (this.requiredIconClassMissing) {
        className = 'example svg-icon-default'
      }

      if (className) {
        return 'svg-icon ' + className
      } else {
        return 'svg-icon'
      }
    },

    defaultIconXml() {
      return defaultIcon.default ? defaultIcon.default : defaultIcon
    },

    /**
     * Idea here is that if the iconClass IS an URL,
     * instead of rendering an `<svg/>` HTML Tag,
     * we'll piggy-back on Vue.js/WebPack and import
     * the SVG XML data using CSS.
     */
    styleExternalIcon() {
      let iconClass = this.iconClass
      if (this.requiredIconClassMissing) {
        iconClass = this.onlyWhenNoIcon
        // iconClass = 'example'
      }
      return {
        mask: `url('${iconClass}') no-repeat 50% 50%`,
        '-webkit-mask': `url('${iconClass}') no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
