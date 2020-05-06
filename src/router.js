import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import Newslist from './components/news/Newslist.vue'
import Newsinfo from './components/news/Newsinfo.vue'
import Photolist from './components/photos/Photolist.vue'
import Photoinfo from './components/photos/Photoinfo.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer ,},
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer },
    { path: '/home/newslist' ,component:Newslist} ,
    { path: '/home/newsinfo/:id' ,component:Newsinfo} ,
    { path: '/home/photolist', component: Photolist},
    { path: '/home/photoinfo/:id' ,component:Photoinfo} ,
  ],
  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router