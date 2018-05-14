# vueAdmin-template

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vueAdmin-template

[中文文档](https://github.com/PanJiaChen/vueAdmin-template/blob/master/README-zh.md)

## Build Setup

``` bash

# Clone project
git clone https://github.com/PanJiaChen/vueAdmin-template.git

# Install dependencies
npm install

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Demo
![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra
If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vueAdmin-template/tree/permission-control)

## Related Project
 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

 [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

### Element-Ui using cdn tutorial
First find `index.html`([root directory](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/index.html))

Import css and js of `Element`, and then import vue. Because `Element` is vue-dependent, vue must be import before it.

Then find [webpack.base.conf.js](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/build/webpack.base.conf.js)
Add `externals` to make webpack not package vue and element.

```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

Finally there is a small detail to pay attention to that if you import vue in global, you don't need to manually `Vue.use(Vuex)`, it will be automatically mounted, see
 [issue](https://github.com/vuejs/vuex/issues/731)

And you can use `npm run build --report` to see the effect

Pictured:
![demo](https://panjiachen.github.io/images/element-cdn.png)

**[Detailed code](https://github.com/PanJiaChen/vueAdmin-template/commit/746aff560932704ae821f82f10b8b2a9681d5177)**

**[Branch](https://github.com/PanJiaChen/vueAdmin-template/tree/element-ui-cdn)**


## License
[MIT](https://github.com/PanJiaChen/vueAdmin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
