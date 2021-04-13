import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AddTask from '@/components/AddTask'
import SignUp from '@/components/SignUp'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },{
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
    },{
      path: "/SignUp",
      name: "SignUp",
      component: SignUp
    },{
      path: "/UserList",
      name: "UserList",
      component: UserList
    }
  ]
})
