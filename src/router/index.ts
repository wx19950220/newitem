import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Listedit  from '../views/Listedit.vue' 
import login from '../views/login.vue'
import Zhu from '../views/Zhu.vue'
import Listadd from '../views/Listadd.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/Zhu',
    name:'Zhu',
    component: Zhu,
    children:[
      {
        path:'about',component:About
      },
      {
        path:'home',component:Home
      },
      {
        path:'listedit',component:Listedit
      },
      {
        path:'listadd',component:Listadd
      },
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/about',
    name:'about',
    component:About
  },
  {
    path:'/listedit',
    name:'listedit',
    component:Listedit
  }
]

const router = new VueRouter({
  routes
})

export default router
