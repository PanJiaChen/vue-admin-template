<template>
  <div ref="rightPanel" :class="classObj" class="layout-right-panel--component">
    <div
      v-if="show"
      class="is-right-panel-focus-backdrop focus-backdrop"
      @click="onRightPanelBackgroundClick"
    />
    <div v-if="opened" class="right-panel-body">
      <div
        class="right-panel-focus-backdrop-dismisser"
        :style="{ top: buttonTop + 'px' }"
        @click.once="layout.toggleOpenedRightPanel({ opened })"
      >
        <i :class="opened ? 'el-icon-close' : null" />
      </div>
      <div class="right-panel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { LayoutDependent } from '../mixins'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutRightPanel',

  mixins: [LayoutDependent],

  props: {
    clickBackdropCloses: {
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

  computed: {
    opened() {
      const { opened } = this.layout.rightPanelState
      return opened
    },

    classObj() {
      return {
        'right-panel-opened': this.opened,
        'layout-right-panel': true
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
    onRightPanelBackgroundClick() {
      const opened = this.opened
      const clickBackdropCloses = this.clickBackdropCloses
      if (opened && clickBackdropCloses) {
        this.layout.setRightPanelState({ opened: false })
      }
    },

    insertToBody() {
      const ref = this.$refs.rightPanel
      const { ownerDocument } = this.$el
      const { body } = ownerDocument
      body.insertBefore(ref, body.firstChild)
    },

    changeBodyClassList(opened) {
      if (this.layout.$el) {
        const layout = this.layout.$el
        const className = 'is-layout-right-panel-opened'
        if (opened) {
          layout.classList.add(className)
        } else {
          layout.classList.remove(className)
        }
      }
    }
  }
}
</script>

<style>
.is-layout-right-panel-opened {
  overflow: hidden;
  position: relative;
  width: 100%;
}
</style>

<style lang="scss" scoped>
.is-right-panel-focus-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  z-index: -1;
}
.right-panel-body {
  width: 100%;
  max-width: calc(50%);
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 40000;
}
.right-panel-opened {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  .is-right-panel-focus-backdrop {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }
  .right-panel-body {
    transform: translate(0);
  }
}
.right-panel-focus-backdrop-dismisser {
  width: 48px;
  height: 48px;
  color: #fff;
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
