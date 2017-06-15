import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: home,
      children:[
        {
          path:'*',
          meta: { auth: false },
          redirect:'?tab=all'
        }
      ]
    }
  ]
})
