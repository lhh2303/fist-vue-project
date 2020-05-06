// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root ='http://www.liulongbin.top:3005/api/'
// 设置请求数据是表单数据格式
Vue.http.options.emulateJson =true
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'


// 按需导入 Mint-UI 中的组件   
/* import { Header, Swipe, SwipeItem, Button  ,Lazyload} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)


Vue.use(Lazyload); */

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'


// 导入 App 根组件
import app from './App.vue'
// 导入格式化时间插件
import moment from 'moment'
// 全局时间过滤器
Vue.filter('dateFormat',function(dateStr, pattern= "YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern)
})

// 缩略图
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 1.4 挂载路由对象到 VM 实例上
})