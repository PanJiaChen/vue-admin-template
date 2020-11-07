import { getRouteList } from '@/api/menu'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {

  // 获取菜单列表并处理菜单
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      getRoutesInfo()
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

async function getRoutesInfo() {
  await getRouteList().then(res => {
    console.log(res.data)
  })
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}


// children: []                                children: []                       children: []
// component: null                             component: "tool/gen/index"        component: ""
// createBy: null                              createBy: null                     createBy: null
// createTime: "2018-03-16 11:33:00"           createTime: "2018-03-16 11:33:00"  createTime: "2018-03-16 11:33:00"
// icon: "tool"                                icon: "code"                       icon: "#"
// isCache: "0"                                isCache: "0"                       isCache: "0"
// isFrame: "1"                                isFrame: "1"                       isFrame: "1"
// menuId: 3                                   menuId: 114                        menuId: 1055
// menuName: "系统工具"                         menuName: "代码生成"                menuName: "生成查询"
// menuType: "M"                               menuType: "C"                      menuType: "F"
// orderNum: "3"                               orderNum: "2"                      orderNum: "1"
// params: {}                                  params: {}                         params: {}
// parentId: 0                                 parentId: 3                        parentId: 114
// parentName: null                            parentName: null                   parentName: null
// path: "tool"                                path: "gen"                        path: "#"
// perms: ""                                   perms: "tool:gen:list"             perms: "tool:gen:query"
// remark: null                                remark: null                       remark: null
// searchValue: null                           searchValue: null                  searchValue: null
// status: "0"                                 status: "0"                        status: "0"
// updateBy: null                              updateBy: null                     updateBy: null
// updateTime: null                            updateTime: null                   updateTime: null
// visible: "0"                                visible: "0"                       visible: "0"