import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import MyHome from '../components/MyHome/MyHome.vue'
import login from '../components/login/login.vue'


Vue.use(Router)

const routes = [
  { path:'/',name:'goods',component: home},
  { path:'/my/home', name:'MyHome',component: MyHome },
  { path:'/login', name:'MyHome',component: login }
]


export default new Router({
  mode: 'history',
  routes
})
