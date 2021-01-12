三邦面料系统开发（前端）

fork项目 vue-admin-template

api文档：

1. 用户模块
1.1 登陆： （/user/login） POST
请求：{
  'username': 用户名,
  'password': 密码
}

返回：  
成功 {
  'code': 20000, 
  'data': {
    'token': 密钥
  }
}
失败 {
  'code': 60204, 
  ‘message’ : '密码错误'/'没有此用户'/'登录验证错误'+error
}


1.2 获取用户信息 （user/info） GET
请求：params {token}

返回：
成功 {
  'code': 20000, 
  'data': {
    'data': {
      'avatar': 头像,
      'name': 姓名,
      'position': 职位,
      'roles' 权限:
    }
  }
}
失败 {
  'code': 50000, 
  ‘message’ : '登录失败，无法获取用户资料'+error
}