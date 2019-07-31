export class SidebarState {
  opened = true
  withoutAnimation = true

  constructor(opts = {}) {
    if ('opened' in opts) {
      this.opened = opts.opened
    }
    if ('withoutAnimation' in opts) {
      this.withoutAnimation = opts.withoutAnimation
    }
  }
}
