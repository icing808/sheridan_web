import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AddTask from '@/components/AddTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: "/AddTask",
      name: "AddTask",
      component: AddTask
    }
  ]
})
