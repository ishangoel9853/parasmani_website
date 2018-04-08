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
          path: '/viewQues',
          component: require('@/components/viewQues').default,
        }
      ]
    },
    {
      path: '/studentDashboard',
      component: require('@/components/studentDashboard').default,
      children:[

        {
          path: '/',
          component: require('@/components/studentHome').default,
        },
        {
          path: '/viewResult',
          component: require('@/components/viewResult').default,
        }
      ]
    },
    {
      path: '/dashboard',
      component: require('@/components/signin').default
    }
  ]
})
