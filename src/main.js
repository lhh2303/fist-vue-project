// 入口文件
import Vue from 'vue'

// 导入app组件
import app from './App.vue'
// 导图mui样式
import './lib/mui/css/mui.css'
// 按需导入mint -ui 组件
import {Header} from 'mint-ui'
Vue.component(Header.name, Header)


var vm = new Vue({
    el:'#app',
    data:{

    },
    render : h=> h(app)
})