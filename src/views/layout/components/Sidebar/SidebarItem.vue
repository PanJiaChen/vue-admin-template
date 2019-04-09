<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  },
  render(h) {
    if (this.item.hidden === true) {
      return
    }

    const showingChildren = (this.item.children || []).filter(item => item.hidden !== true)
    let onlyOneChild = null
    if (showingChildren.length === 1) {
      // When there is only one child router, the child router is displayed by default
      onlyOneChild = showingChildren[0]
    } else if (showingChildren.length === 0) {
      // Show parent if there are no child router to display
      onlyOneChild = { ... this.item, path: '', noShowingChildren: true }
    }

    let sideBarItem
    if (onlyOneChild && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !this.item.alwaysShow) {
      sideBarItem =
        <div class='menu-wrapper'>
          <app-link to={this.resolvePath(onlyOneChild.path)}>
            <el-menu-item index={this.resolvePath(onlyOneChild.path)} class={{ 'submenu-title-noDropdown': !this.isNest }}>
              <item meta={Object.assign({}, this.item.meta, onlyOneChild.meta)} />
            </el-menu-item>
          </app-link>
        </div>
    } else {
      sideBarItem =
        <el-submenu ref='subMenu' index={this.resolvePath(this.item.path)} popper-append-to-body>
          <template slot='title'>
            <item meta={this.item.meta} />
          </template>
          {
            showingChildren.map(child =>
              <sidebar-item
                is-nest={true}
                item={child}
                key={child.path}
                base-path={this.resolvePath(child.path)}
                class='nest-menu' />
            )
          }
        </el-submenu>
    }

    return <div class='menu-wrapper'>{sideBarItem}</div>
  }
}
</script>
