<template>
  <div ref="rightPanel" :class="classObj">
    <div class="right-panel-background" />
    <div v-if="opened" class="right-panel-body">
      <div class="handle-button" :style="{'top':buttonTop+'px'}" @click.once="layout.toggleOpenedRightPanel({opened})">
        <i :class="opened?'el-icon-close':null" />
      </div>
      <div class="right-panel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

/** @type {import('vue').VueConstructor} */
export default {
  name: 'RightPanel',

  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },

  data() {
    return {
      show: false
    }
  },

  inject: ['layout'],
  computed: {
    opened() {
      const { opened } = this.layout.rightPanel
      return opened
    },
    classObj() {
      const { opened } = this.layout.rightPanel
      return {
        'right-panel-opened': opened,
        'right-panel--component': true
      }
    }
  },

  watch: {
    opened: {
      handler(opened) {
        this.show = opened
      }
    },
    show: {
      handler(opened) {
        this.changeBodyClassList(opened)
        // if (opened && !this.clickNotClose) {
        //   this.addClickEventListener()
        // }
      }
    }
  },

  async mounted() {
    await this.$nextTick(this.insertToBody)
  },

  beforeDestroy() {
    const ref = this.$refs.rightPanel
    ref.remove()
  },

  methods: {
    // addClickEventListener() {
    //   console.log('RightPanel.addClickEventListener')
    //   const { ownerDocument } = this.$el
    //   const { defaultView } = ownerDocument
    //   defaultView.addEventListener('click', this.handleCloseEvent)
    // },
    // handleCloseEvent(evt) {
    //   const parent = evt.target.closest('.right-panel-body')
    //   console.log('RightPanel.handleCloseEvent', parent, evt)
    //   if (!parent) {
    //     this.show = false
    //     const { ownerDocument } = this.$el
    //     const { defaultView } = ownerDocument
    //     defaultView.removeEventListener('click', this.handleCloseEvent)
    //   }
    // },
    insertToBody() {
      const ref = this.$refs.rightPanel
      const { ownerDocument } = this.$el
      const { body } = ownerDocument
      body.insertBefore(ref, body.firstChild)
    },
    changeBodyClassList(opened) {
      const { ownerDocument } = this.$el
      const { body } = ownerDocument
      const className = 'app-layout-right-panel--opened'
      if (opened) {
        body.classList.add(className)
      } else {
        body.classList.remove(className)
      }
    }
  }
}
</script>

<style>
.app-layout-right-panel--opened {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.right-panel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
}
.right-panel-body {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}
.right-panel--component.right-panel-opened {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);
  .right-panel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  .right-panel-body {
    transform: translate(0);
  }
}
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
