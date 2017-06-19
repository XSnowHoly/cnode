import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'
import MyHome from '../components/MyHome/MyHome.vue'
import login from '../components/login/login.vue'
import myNews from '../components/myNews/myNews.vue'
import createTopic from '../components/createTopic/createTopic.vue'

Vue.use(Router)

const routes = [
  { path:'/',name:'goods',component: home},
  { path:'/my/home', name:'MyHome',component: MyHome },
  { path:'/login', name:'MyHome',component: login },
  { path:'/my/messages', name:'myNews',component: myNews },
  { path:'/topic/create', name:'createTopic',component: createTopic }
]


export default new Router({
  mode: 'history',
  routes
})
