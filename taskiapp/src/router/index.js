import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import AddTask from '@/components/AddTask'
import SignUp from '@/components/SignUp'
import UserList from '@/components/UserList'
import TaskList from '@/components/TaskList'
import AddTask2 from '@/components/AddTask2'
// import NavBar from '@/components/NavBar'
import Calendar from '@/components/Calendar'
import Account from '@/components/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },{
      path: '/Home',
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
    },{
      path: "/TaskList",
      name: "TaskList",
      component: TaskList
    },{
      path: "/AddTask2",
      name: "AddTask2",
      component: AddTask2
    },{
      path: "/Calendar",
      name: "Calendar",
      component: Calendar
    },{
      path: "/Account",
      name: "Account",
      component: Account
    }
  ]
})
