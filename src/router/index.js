import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Guard from './middlewares'

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/signin').default,
      beforeEnter: Guard.guest
    },
    {
      path: '/error',
      component: require('@/components/error').default
    },
    {
      path: '/adminDashboard',
      component: require('@/components/adminDashboard').default,
      beforeEnter: Guard.authAdmin,
      children:[

        {
          path: '/',
          component: require('@/components/adminHome').default,
        },
        {
          path: '/addStudent',
          component: require('@/components/addStudent').default,
        },
        {
          path: '/addQues',
          component: require('@/components/addQues').default,
        },
        {
          path: '/addExam',
          component: require('@/components/addExam').default,
        },
        {
          path: '/viewQuestions',
          component: require('@/components/viewQuestions').default,
        }
      ]
    },
    {
      path: '/studentDashboard',
      component: require('@/components/studentHome').default,
      beforeEnter: Guard.authStudent,
      children:[]
    }
  ]
})
