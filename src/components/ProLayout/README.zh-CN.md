[English](./README.md) | 简体中文

<h1 align="center">Ant Design Pro Layout</h1>
## 使用

```bash
npm i @ant-design-vue/pro-layout --save
// 或者
yarn add @ant-design-vue/pro-layout
```

```jsx
import ProLayout from '@ant-design-vue/pro-layout'

export default {
  name: 'BasicLayout',
  render () {
    return (
      <ProLayout>
        <router-view />
      </ProLayout>
    )
  }
}
```

```vue
<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :theme="theme"
    :layout="layout"
    :contentWidth="contentWidth"
    :auto-hide-header="autoHideHeader"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <img src="../assets/logo.svg" />
        <h1>Pro Layout</h1>
      </div>
    </template>
    <template v-slot:rightContentRender>
      <div :class="['ant-pro-global-header-index-right', layout === 'topmenu' && `ant-pro-global-header-index-${theme}`]">
        rightContentRender
      </div>
    </template>
    <template v-slot:footerRender>
      <div>footerRender</div>
    </template>
    <setting-drawer navTheme="dark" />
    <router-view />
  </pro-layout>
</template>

<script>
import ProLayout, { SettingDrawer } from '@ant-design-vue/pro-layout'
import { asyncRouterMap } from '../config/router.config'

export default {
  name: 'BasicLayout',
  data () {
    return {
      menus: [],
      collapsed: false,
      autoHideHeader: false,
      query: {},
      layout: 'sidemenu',
      contentWidth: 'Fluid',
      theme: 'dark',
      isMobile: false
    }
  },
  created () {
    this.menus = asyncRouterMap.find(item => item.path === '/').children
  },
  methods: {
    handleMediaQuery (query) {
      this.query = query
      if (this.isMobile && !query['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && query['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
      }
    },
    handleCollapse (collapsed) {
      this.collapsed = collapsed
    }
  },
  components: {
  	SettingDrawer
  }
}
</script>
```



## API



### ProLayout

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | layout 的 左上角 的 title | VNode \| String | `'Ant Design Pro'` |
| logo | layout 的 左上角 logo 的 url | VNode \| render | - |
| showLogo | 显示logo | boolean | false |
| menus | Vue-router `routes` 属性 | Object | `[{}]` |
| collapsed | 控制菜单的收起和展开 | boolean | true |
| isMobile | 是否为手机模式 | boolean | false |
| handleCollapse | 菜单的折叠收起事件	 | (collapsed: boolean) => void | - |
| withoutAnimation | 不显示过渡动画	 | boolean | false |
| fixedHeader | 固定头部	 | boolean | false |
| handleMediaQuery | 媒体查询回调 | (isMobile: boolean) => void | - |
| headerRender | 自定义头的 render 方法 | (props: BasicLayoutProps) => VNode | - |
| rightContentRender | 自定义头右部的 render 方法 | (props: HeaderViewProps) => VNode | - |

| collapsedButtonRender | 自定义 侧栏收缩按钮 的方法 | (collapsed: boolean) => VNode | - |
| footerRender | 自定义 底部区域内容 | (props: BasicLayoutProps) => VNode | - |
| breadcrumbRender | 自定义面包屑渲染方法 | ({ route, params, routes, paths, h }) => VNode[] | - |
| i18nRender | 本地化渲染函数 (this.$t) | Function (key: string) => string  \| `false` | `false` |

| mediaQuery            | ProLayout 当前的媒体查询                        | Array                              | -                  |



### PageHeaderWrapper

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| content | 内容区          | VNode \| v-slot | - |
| extra | 扩展区域 | VNode \| v-slot | - |
| extraContent | 扩展内容区      | VNode \| v-slot | - |
| tabList | Tabs 导航 | `Array<{key: string, tab: sting}>` | - |
| tab-change | Tab 改变事件 | (key) => void | - |
| tab-active-key | 当前 Tab 选中项 | string | - |



### SettingDrawer

#### {settings}

| Property | Description | Type | Default Value |
| ---- | ---- | ---- | ---- |
| theme | 主题 | `dark` `light` `realDark` | `light` |
| layout | 布局模式 | `sidemenu` `topmenu` | `sidemenu` |
| primaryColor | 主色调 (*仅开发环境生效) | `#1890ff` |      |