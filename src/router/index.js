import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/signin').default
    },
    {
      path: '/adminDashboard',
      component: require('@/components/adminDashboard').default,
      children:[

        {
          path: '/',
          component: require('@/components/adminHome').default,
        },
        {
          path: '/addAdmin',
          component: require('@/components/addAdmin').default,
        }
      ]
    },
    {
      path: '/qAdderDashboard',
      component: require('@/components/qAdderDashboard').default,
      children:[

        {
          path: '/',
          component: require('@/components/qAdderHome').default,
        }
      ]
    },
    {
      path: '/dashboard',
      component: require('@/components/signin').default
    }
  ]
})
